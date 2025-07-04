const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'src', 'balmy-elf-464704-g8-784a2c5fad11.json');

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

app.post('/api/insert', async (req, res) => {
  const { spreadsheetId, range, values } = req.body;
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const resource = { values };

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource,
    });
    res.json({ updates: response.data.updates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Phục vụ file tĩnh React build
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 