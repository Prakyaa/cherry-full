const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// ✅ Serve frontend files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Log IP address when '/log' is accessed
app.get('/log', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const timestamp = new Date().toISOString();
  const logEntry = ${timestamp} - ${ip}\n;
  fs.appendFile('ip-log.txt', logEntry, err => {
    if (err) console.error(err);
  });
  res.sendStatus(200);
});

// ✅ Show collected IPs
app.get('/view-ips', (req, res) => {
  fs.readFile('ip-log.txt', 'utf8', (err, data) => {
    if (err) return res.send('No IPs logged yet.');
    res.send(<pre>${data}</pre>);
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(✅ Server running on port ${port});
});
