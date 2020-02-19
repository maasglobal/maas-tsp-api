'use strict';

const express = require('express');
const app = express();
const path = require('path');
const { loadAndBundleSpec } = require('redoc');
const { compileWorkflows } = require('../utils/compile-workflows');
const { compileDocs } = require('../utils/compile-md');

/**
 * Makes sender function to be used as middleware on app
 *
 * @param {string} file - Path to send
 */
function sender(file) {
  return async (req, res) => res.sendFile(path.resolve(__dirname, '..', file));
}

app.use('/', express.static('docs'));
app.use('/overview.html', sender('dist/overview.html'));
app.use('/github-markdown.css', sender('node_modules/github-markdown-css/github-markdown.css'));
app.use('/assets', express.static('assets'));
app.use('/specs', express.static('specs'));
app.get('/specs/booking.json', async (req, res) =>
  loadAndBundleSpec('./specs/booking.yml').then(json => res.json(json))
);
app.use('/specs/workflow/', express.static('dist/specs/workflow'));
app.use('/examples', express.static('examples'));
app.use('/schemas', express.static('schemas'));
app.use('/swagger-ui', express.static(path.resolve(__dirname, '../node_modules/swagger-ui-dist')));
app.use('/redoc.standalone.js', sender('node_modules/redoc/bundles/redoc.standalone.js'));

compileWorkflows()
  .then(compileDocs)
  .then(_ => {
    const port = process.env.PORT || 3000;
    // eslint-disable-next-line no-console
    console.info(`Listening on ${port}`);
    app.listen(port);
  });
