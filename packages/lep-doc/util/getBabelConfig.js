module.exports = function getBabelConfig() {
  return {
    presets: [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-typescript'),
      [require.resolve('@babel/preset-env')]
    ],
    plugins: [
      [require.resolve('@babel/plugin-transform-runtime')],
      require.resolve('@babel/plugin-transform-object-assign'),
      require.resolve('@babel/plugin-proposal-class-properties'),
      [
        require.resolve('@babel/plugin-proposal-private-methods'),
        { loose: false }
      ]
    ]
  };
};
