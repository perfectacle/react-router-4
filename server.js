const express =  require('express');
const app = express();
const PORT = 3000;
const DIST = `${__dirname}/app/dist/`;

// server-open
app.use('/', express.static(DIST));
app.listen(PORT, () => {
  console.log('Express listening on port', PORT);
});

// client router
app.get('*', (req, res) => {
  res.sendFile(DIST);
});