module.exports = require('@sumup-oss/foundry/eslint')({
  overrides: [
    {
      files: ['src/components/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
});
