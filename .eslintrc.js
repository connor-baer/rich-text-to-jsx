module.exports = require('@sumup/foundry/eslint')({
  overrides: [
    {
      files: ['src/components/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
});
