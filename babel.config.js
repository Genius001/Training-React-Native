module.exports = function (api) {
  api.cache(true);
  presets: ['module:metro-react-native-babel-preset'];
  plugins: ['react-native-reanimated/plugin'];
  return {
    presets: ['babel-preset-expo'],
  };
};
