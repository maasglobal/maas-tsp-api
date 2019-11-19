'use strict';

const express = require('express');
const app = express();
const path = require('path');
const { loadAndBundleSpec } = require('redoc');

app.use('/', express.static('docs'));
app.use('/assets', express.static('assets'));
app.use('/specs', express.static('specs'));
app.get('/specs/booking.json', async (req, res) =>
  loadAndBundleSpec('./specs/booking.yml').then(json => res.json(json))
);
app.use('/examples', express.static('examples'));
app.use('/schemas', express.static('schemas'));
app.use('/swagger-ui', express.static(path.resolve(__dirname, '../node_modules/swagger-ui-dist')));
app.use('/redoc.standalone.js', async (req, res) =>
  res.sendFile(path.resolve(__dirname, '../node_modules/redoc/bundles/redoc.standalone.js'))
);
app.listen(process.env.PORT || 3000);
