module.exports = function getBabelConfig () {
  return {
    presets: [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env')
    ],
    plugins: [],
  };
}