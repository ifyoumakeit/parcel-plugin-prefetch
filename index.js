module.exports = bundler => {
  bundler.addAssetType("jsonpf", require.resolve("./lib/asset_type"));
};
