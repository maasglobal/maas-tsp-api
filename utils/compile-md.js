'use strict';

const fs = require('fs');
const docs = process.argv[2] || './docs';
const out = process.argv[3] || './dist';
const marked = require('marked');
const renderer = new marked.Renderer();

renderer.heading = function(text, level, raw, slugger) {
  if (this.options.headerIds) {
    const id = this.options.headerPrefix + slugger.slug(raw);
    const link = `<a class="anchor" aria-hidden="true" href="#${id}"><span class="octicon octicon-link"></span></a>`;
    return '<h' + level + ' id="' + id + '">' + link + text + '</h' + level + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

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
 * Turns body fragment into HTML page
 *
 * @param {string} title - Title of the page
 * @param {string} body - Body fragment of the page
 */
function htmlDocument(title, body) {
  return `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="github-markdown.css"/>
    <style type="text/css">
      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
      }

      .markdown-body h1:hover .anchor .octicon-link:before,
      .markdown-body h2:hover .anchor .octicon-link:before,
      .markdown-body h3:hover .anchor .octicon-link:before,
      .markdown-body h4:hover .anchor .octicon-link:before,
      .markdown-body h5:hover .anchor .octicon-link:before,
      .markdown-body h6:hover .anchor .octicon-link:before {
        width: 16px;
        height: 16px;
        content: " ";
        display: inline-block;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'><path fill-rule='evenodd' d='M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'></path></svg>");
      }

      @media (max-width: 767px) {
        .markdown-body {
          padding: 15px;
        }
      }
    </style>
  </head>
  <body class="markdown-body">
    ${body}
  </body>
  </html>
  `;
}

/**
 * Convert .md file to .html
 *
 * @param {string} file - Markdown file
 */
function compileMarkdown(file) {
  const htmlFile = file.replace('.md', '.html');
  const md = fs.readFileSync(docs + '/' + file, { encoding: 'utf8' });
  const htmlFragment = marked(localize(md), { renderer });
  const html = htmlDocument(capitalize(file.replace('.md', '')), htmlFragment);
  fs.writeFileSync(out + '/' + htmlFile, html);
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
          compileMarkdown(file);
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
