'use strict';

module.exports = {
  extends: 'maasglobal',
  rules: {
    'class-methods-use-this': 0,
  },
  overrides: [
    {
      files: ['test/**/*'],
      rules: {
        'jsdoc/require-jsdoc': 'off',
      },
    },
    {
      files: ['src/**/*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'warning',
          {
            devDependencies: true,
            optionalDependencies: true,
            peerDependencies: true,
            bundledDependencies: true,
            dependencies: true,
          },
        ],
      },
    },
    {
      files: ['utils/**/*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'warning',
          {
            devDependencies: true,
            optionalDependencies: true,
            peerDependencies: true,
            bundledDependencies: true,
            dependencies: true,
          },
        ],
      },
    },
  ],
};
