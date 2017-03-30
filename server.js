const express =  require('express');
const app = express();
const PORT = 4000;
const DEV_PORT = 4001;
const DIST = `${__dirname}/app/src`;

if(process.env.NODE_ENV === 'development') {
  // dev-server config
  const Webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('./webpack.dev.config');
  const compiler = Webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);

  // dev-server open
  devServer.listen(DEV_PORT, () => {
    console.log('webpack-dev-server is listening on port', DEV_PORT);
  });
}

// server-open
app.use('/', express.static(DIST));
app.listen(PORT, () => {
  console.log('Express listening on port', PORT);
});


// client router
app.get('*', (req, res) => {
  res.sendFile(DIST);
});