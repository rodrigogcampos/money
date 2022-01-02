{
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          'css-loader',
          {
            loader: 'fast-sass-loader',
            options: {
              includePaths: [... ]
            }
          }
        ]
      },
      // other loaders ...
    ]
  }
}
