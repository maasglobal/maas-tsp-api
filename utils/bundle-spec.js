'use strict';

const fs = require('fs');
const path = require('path');
const { loadAndBundleSpec } = require('redoc');

const spec = process.argv[2] || './specs/booking.yml';
const out = process.argv[3] || './dist/specs/booking.json';

/**
 * Load and bundle specification using redoc library method.
 */
async function bundleSpec() {
  const dir = path.dirname(out);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const json = await loadAndBundleSpec(spec);
  fs.writeFileSync(out, JSON.stringify(json, null, 2));
}

bundleSpec();
