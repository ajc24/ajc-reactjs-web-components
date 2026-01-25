/**
 * Developed by Anthony Cox in 2025
 */
module.exports = function (api) {
  api.cache(true);

  const presets = [
    [ '@babel/preset-env', { targets: { node: 'current' } } ],
    [ '@babel/preset-react', { runtime: 'automatic' } ],
  ];

  const plugins = [];

  return {
    presets,
    plugins
  };
};
