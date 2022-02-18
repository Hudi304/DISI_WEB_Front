const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const path = require(`path`);

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          // remove CaseSensitivePathsPlugin (replace with tsconfig setting or eslint setting)
          webpackConfig.plugins = webpackConfig.plugins.filter(
            (plugin) => plugin.constructor.name !== "CaseSensitivePathsPlugin"
          );

          // remove IgnorePlugin
          webpackConfig.plugins = webpackConfig.plugins.filter(
            (plugin) => plugin.constructor.name !== "IgnorePlugin"
          );
          // add new ContextReplacementPlugin via moment-locales-webpack-plugin
          webpackConfig.plugins.push(new MomentLocalesPlugin()); // exclude all locales except en
          // add new SpeedMeasurePlugin
          webpackConfig.plugins.push(
            new SpeedMeasurePlugin({
              outputFormat: "human",
            })
          );
          return webpackConfig;
        },
      }
    }
  ]
}

