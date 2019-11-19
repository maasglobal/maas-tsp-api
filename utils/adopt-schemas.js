'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Copy folder recursively.
 *
 * @param {string} source - Source path-like
 * @param {string} target - Target path-like
 * @param {Function} reader - Optional file reader, for transformation
 */
function copyFolderRecursiveSync(source, target, reader) {
  if (!fs.existsSync(source)) {
    throw new Error('Not found: ' + source);
  }

  const stat = fs.lstatSync(source);
  if (stat.isDirectory()) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }

    const files = fs.readdirSync(source);
    files.forEach(file => {
      const currentSource = path.join(source, file);
      const currentTarget = path.join(target, file);
      if (fs.lstatSync(currentSource).isDirectory()) {
        copyFolderRecursiveSync(currentSource, currentTarget, reader);
      } else {
        fs.writeFileSync(currentTarget, reader ? reader(currentSource, currentTarget) : fs.readFileSync(currentSource));
      }
    });
  }
}

/**
 * Replace references with relative path against parent (repo root)
 *
 * @param {string} schemaContent - String content of schema
 * @param {string} relativePath - Relative path for this schema
 */
function convertSchemaToRelativeReferences(schemaContent, relativePath) {
  const dots = relativePath
    .split('/')
    .map(p => '..')
    .join('/');
  // Fix schema $id
  let str = schemaContent.replace(
    '"$id": "http://maasglobal.com/core/booking.json#",',
    '"$id": "http://maasglobal.com/core/booking.json",'
  );
  // Reference locally, relative
  str = str.replace(/"\$ref": "http:\/\/maasglobal.com/g, '"$ref": "' + dots + '/schemas');
  return str;
}

const rootSource = process.argv[2] || './node_modules/maas-schemas/schemas';
const rootDest = process.argv[3] || './schemas';

/**
 * Copy schemas locally and make them referencable in Open API specification
 * by replacing remote paths with relative paths.
 */
copyFolderRecursiveSync(rootSource, rootDest, f => {
  if (f.endsWith('.json')) {
    const relativePath = path.resolve(f).substring(path.resolve(rootSource).length + 1);
    return convertSchemaToRelativeReferences(fs.readFileSync(f, { encoding: 'utf-8' }), relativePath);
  }

  return fs.readFileSync(f);
});
