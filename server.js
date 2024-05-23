const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files from the React app
app.use(express.static('client/build'));

// Middleware for parsing JSON bodies
app.use(express.json());

app.post('/data', (req, res) => {
  console.log(req.body);
  res.status(200).send('Data received');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back the React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});