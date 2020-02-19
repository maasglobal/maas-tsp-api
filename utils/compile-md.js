'use strict';

const fs = require('fs');
const docs = process.argv[2] || './docs';
const out = process.argv[3] || './dist';
const marked = require('marked');
const renderer = new marked.Renderer();

/**
 * Make first letter uppercase leaving other intact
 *
 * @param {string} s - String to capitalize
 */
function capitalize(s) {
  if (typeof s !== 'string') return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * When running locally, localize markdown links to local files
 *
 * @param {string} md - markdown content
 */
function localize(md) {
  return md.split('https://maasglobal.github.io/maas-tsp-api/').join('');
}

/**
 * Process all markdown files into html files
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
          const md = fs.readFileSync(docs + '/' + file, { encoding: 'utf8' });
          const htmlFragment = marked(localize(md), { renderer });
          const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${capitalize(file.replace('.md', ''))}</title>
  <link rel="stylesheet" type="text/css" href="github-markdown.css"/>
  <style type="text/css">
    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }

    @media (max-width: 767px) {
      .markdown-body {
        padding: 15px;
      }
    }
  </style>
</head>
<body class="markdown-body">
  ${htmlFragment}
</body>
</html>
`;

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
