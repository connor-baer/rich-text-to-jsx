module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['React', 'Jest', 'Testing Library'],
    openSource: false,
  },
  {
    overrides: [
      {
        files: ['src/components/**'],
        rules: {
          'import/no-extraneous-dependencies': 'off',
        },
      },
    ],
  },
);
