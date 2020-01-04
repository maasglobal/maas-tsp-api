'use strict';

const fs = require('fs');
const { spawn } = require('child_process');
const workflows = process.argv[2] || './specs/workflow';
const out = process.argv[3] || './dist/specs/workflow';

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
        const svg = file.replace('.mmd', '.svg');
        const child = spawn('mmdc', ['-i', workflows + '/' + file, '-o', out + '/' + svg]);
        child.stderr.on('data', data => {
          // eslint-disable-next-line no-console
          console.warn(`${file}: ${data}`);
        });

        child.on('close', code => {
          if (code !== 0) {
            // eslint-disable-next-line no-console
            console.warn(`${file}: child process exited with code ${code}`);
          }
        });
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
