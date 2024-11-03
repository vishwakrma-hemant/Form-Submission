// next.config.mjs
export default {
    webpack(config, { dev, isServer }) {
      // Disable source maps for production build
      if (!dev && !isServer) {
        config.devtool = false;
        config.module.rules.push({
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: false },
            },
          ],
        });
      }
      return config;
    },
  };