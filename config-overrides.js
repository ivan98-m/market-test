const webpack = require('webpack');

module.exports = function override(config) {
    //config.ignoreWarnings = [/Failed to parse source map/];
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })

    const rules = config.module.rules || {};
    Object.assign(rules, {
    //   test: /\.(mjs|js)?$/,
    //   resolve: {
    //     fullySpecified: false
    //   }
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    })

    config.resolve.fallback = fallback;
    //config.module.rules = rules;
    //config.resolve.extensions = ['*', '.mjs', '.js', '.json', '.gql', '.graphql'];
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])

    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    })
    return config;
}