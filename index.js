const express = require('express');
const https = require('https');

const app = express();
const port = process.env.PORT || 3000;

// RapidAPI credentials
const rapidapiKey = '1d43ad60fbmshafb409348c8c14cp1b88a3jsn9c5d81a49829';
const rapidapiHost = 'blackbox.p.rapidapi.com';

// Endpoint to ask the blackbox AI
app.get('/box/ask=', (req, res) => {
  const query = req.query.q;

  const options = {
    method: 'GET',
    hostname: rapidapiHost,
    port: null,
    path: `/v1/1.1.1.1?q=${encodeURIComponent(query)}`,
    headers: {
      'x-rapidapi-key': rapidapiKey,
      'x-rapidapi-host': rapidapiHost
    }
  };

  const apiReq = https.request(options, function (apiRes) {
    const chunks = [];

    apiRes.on('data', function (chunk) {
      chunks.push(chunk);
    });

    apiRes.on('end', function () {
      const body = Buffer.concat(chunks);
      res.send(body.toString());
    });
  });

  apiReq.on('error', function (e) {
    res.status(500).send(e.message);
  });

  apiReq.end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
           
