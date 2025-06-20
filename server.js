const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ Route to log IPs
app.get('/log', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${ip}\n`;
  fs.appendFile('ip-log.txt', logEntry, err => {
    if (err) {
      console.error('Failed to log IP:', err);
      return res.status(500).send('Error logging IP');
    }
    console.log('Logged:', logEntry.trim());
    res.send('IP Logged');
  });
});

// ✅ Route to view all logged IPs
app.get('/view-ips', (req, res) => {
  fs.readFile('ip-log.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read IP log:', err);
      return res.status(500).send('Error reading IPs');
    }
    res.send(`<pre>${data}</pre>`);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});