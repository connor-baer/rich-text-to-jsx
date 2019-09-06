const { modules: baseConfig } = require('@sumup/foundry/semantic-release');

const customConfig = { tagFormat: '${version}' };

module.exports = Object.assign({}, baseConfig, customConfig);
