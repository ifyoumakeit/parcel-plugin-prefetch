module.exports = bundler => {
  bundler.addAssetType("jsonf", require.resolve("./lib/asset_type"));
};
