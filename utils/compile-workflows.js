'use strict';

const fs = require('fs');
const { spawn } = require('child_process');
const workflows = process.argv[2] || './specs/workflow';
const out = process.argv[3] || './dist/specs/workflow';

/**
 * Process workflow into specified format file
 *
 * @param {string} file - Relative path to file
 * @param {string} format - Format, i.e. svg or png
 */
async function compileDiagram(file, format) {
  return new Promise(async (resolve, reject) => {
    const result = file.replace('.mmd', '.' + format);
    // eslint-disable-next-line no-console
    console.warn(`Compiling ${file} into ${result}`);
    const child = spawn(
      'mmdc',
      ['-i', workflows + '/' + file, '-o', out + '/' + result, '-c', workflows + '/config.json', '--scale', '4'],
      {
        timeout: 5000,
      }
    );

    child.stderr.on('data', data => {
      // eslint-disable-next-line no-console
      console.warn(`${file}: ${data}`);
    });

    child.on('close', code => {
      if (code !== 0) {
        // eslint-disable-next-line no-console
        console.warn(`${file}: child process exited with code ${code}`);
        reject(code);
      } else {
        resolve(code);
      }
    });
  });
}

/**
 * Process all workflows into svg files
 */
async function compileWorkflows() {
  if (!fs.existsSync(out)) {
    fs.mkdirSync(out, { recursive: true });
  }
  fs.readdir(workflows, (err, files) => {
    files.forEach(file => {
      if (file.endsWith('.mmd')) {
        compileDiagram(file, 'svg').then(_ => compileDiagram(file, 'png'));
      }
    });
  });
}

module.exports = {
  compileWorkflows,
};

if (require.main === module) {
  compileWorkflows();
}
