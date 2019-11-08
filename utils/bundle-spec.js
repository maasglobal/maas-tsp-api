'use strict';

const fs = require('fs');
const { loadAndBundleSpec } = require('redoc');

const spec = process.argv[2] || './specs/booking.yml';
const out = process.argv[3] || './dist/specs/booking.json';

/**
 * Load and bundle specification using redoc library method.
 */
async function main() {
  const json = await loadAndBundleSpec(spec);
  fs.writeFileSync(out, JSON.stringify(json, null, 2));
}

main();
