'use strict';

const fs = require('fs');
const docs = process.argv[2] || './docs';
const out = process.argv[3] || './dist';
const marked = require('marked');

/**
 * Process all workflows into svg files
 */
async function compileDocs() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(out)) {
      fs.mkdirSync(out, { recursive: true });
    }

    fs.readdir(docs, (err, files) => {
      let count = 0;
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const htmlFile = file.replace('.md', '.html');
          const html = marked(fs.readFileSync(docs + '/' + file, { encoding: 'utf8' }));
          // eslint-disable-next-line no-console
          console.info(`Compiling ${file}`);
          fs.writeFileSync(out + '/' + htmlFile, html);
          count++;
        }
      });

      resolve(count);
    });
  });
}

module.exports = {
  compileDocs,
};

if (require.main === module) {
  compileDocs();
}
