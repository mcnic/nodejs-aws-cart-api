const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const lazyImports = [
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
];

module.exports = (options, webpack) => {
  return {
    ...options,
    devtool: 'source-map',
    externals: [],
    entry: {
      'handlers/cart/cart': 'src/handlers/cart.ts',
      main: 'src/main.ts',
      seed: 'prisma/seed.ts',
    },
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
      filename: '[name].js',
    },
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
            to: 'handlers/cart',
          },
          {
            from: './node_modules/.prisma/client/schema.prisma',
            to: './handlers/cart',
          },
        ],
      }),
    ],
  };
};
