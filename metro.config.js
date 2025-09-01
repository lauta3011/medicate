const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
  
const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'svg', 'gif', 'webp');

// Optimize for React Native 0.79+ and Gradle 9.0
config.transformer.minifierConfig = {
  mangle: {
    keep_fnames: true,
  },
};
  
module.exports = withNativeWind(config, { input: './global.css' });