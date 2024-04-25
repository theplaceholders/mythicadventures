const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

app.post('/save-player-data', (req, res) => {
  const { data } = req.body; // Assume data is the object to save
  const fileName = `${data.userId}_slot${data.slotNum}.json`; // Generate a file name
  const filePath = path.join(__dirname, 'playerData', fileName);

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Failed to save player data:', err);
      res.status(500).send('Error saving player data.');
      return;
    }
    res.send('Player data saved successfully.');
  });
});

app.get('/check-slot-count/:userId', (req, res) => {
    const userId = req.params.userId;
    const playerDataDir = path.join(__dirname, 'playerData');
  
    fs.readdir(playerDataDir, (err, files) => {
      if (err) {
        console.error('Failed to list player data files:', err);
        res.status(500).send('Error retrieving player data.');
        return;
      }
      
      // Count files that start with the userId
      const count = files.filter(file => file.startsWith(userId)).length;
      res.json({ count });
    });
  });
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
