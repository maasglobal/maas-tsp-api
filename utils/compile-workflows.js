'use strict';

const fs = require('fs');
const { spawn } = require('child_process');
const workflows = process.argv[2] || './specs/workflow';
const out = process.argv[3] || './dist/specs/workflow';
const { convertAll: bpmnConvert } = require('@huksley/bpmn-to-image');

/**
 * Invokes mmdc MermaidJS compiler to create svg file
 */
async function compileFile(input, output, path, file) {
  if (file.endsWith('.mmd')) {
    const svg = file.replace('.mmd', '.svg');
    const child = spawn('mmdc', ['-i', input + path + '/' + file, '-o', output + path + '/' + svg]);
    child.stderr.on('data', data => {
      // eslint-disable-next-line no-console
      console.warn(`${path + file}: ${data}`);
    });

    child.on('close', code => {
      if (code !== 0) {
        // eslint-disable-next-line no-console
        console.warn(`${path + file}: child process exited with code ${code}`);
      }
    });
  } else if (file.endsWith('.bpmn')) {
    const svg = file.replace('.bpmn', '.svg');
    const png = file.replace('.bpmn', '.png');
    await bpmnConvert(
      [
        {
          input: input + path + '/' + file,
          outputs: [output + path + '/' + svg, output + path + '/' + png],
        },
      ],
      { deviceScaleFactor: 4 }
    );
  }
}

/**
 * Recursively walk the tree
 */
async function compileDir(input, output, path) {
  if (!fs.existsSync(output + path)) {
    fs.mkdirSync(output + path, { recursive: true });
  }

  fs.readdir(input + path, (err, files) => {
    files.forEach(file => {
      const stat = fs.lstatSync(input + path + '/' + file);
      if (stat.isDirectory()) {
        compileDir(input, output, path + '/' + file);
      } else {
        compileFile(input, output, path, file);
      }
    });
  });
}

/**
 * Process all workflow files in various files
 */
async function compileWorkflows(path) {
  compileDir(workflows, out, '');
}

module.exports = {
  compileWorkflows,
};

if (require.main === module) {
  compileWorkflows();
}
