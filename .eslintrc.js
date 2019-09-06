const {
  react: baseConfig,
  overwritePresets
} = require('@sumup/foundry/eslint');

const customConfig = {
  rules: {
    'notice/notice': 'off'
  }
};

module.exports = overwritePresets(baseConfig, customConfig);
