const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { formatSlotData } = require('./server-utility/formatSlotData');
const app = express();
const PORT = 3001;
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
dotenv.config();

console.log(process.env.VITE_DISCORD_CLIENT_ID, 'consoling');
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

app.post('/save-player-data', (req, res) => {
  const { data } = req.body; // Assume data is the object to save
  const fileName = `${data.userId}.json`; // Generate a file name
  const filePath = path.join(__dirname, 'playerData', fileName);

  fs.readFile(filePath, { encoding: 'utf8' }, (err, fileContents) => {
    let currentData = {};

    if (!err && fileContents) {
      try {
        currentData = JSON.parse(fileContents);
      } catch (parseErr) {
        console.error('Failed to parse player data:', parseErr);
        res.status(500).send('Error reading player data.');
        return;
      }
    }

    // Format or update the data
    const updatedSlotData = formatSlotData(data);
    currentData = { ...currentData, ...updatedSlotData };
    console.log('Current Data before merge:', currentData);
    console.log('Updated Slot Data:', updatedSlotData);
    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(currentData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Failed to save player data:', writeErr);
        res.status(500).send('Error saving player data.');
        return;
      }
      res.send('Player data saved successfully.');
    });
  });
});

app.delete('/remove-player-data', (req, res) => {
  const { slotIndex, userId } = req.body; // Assume data is the object to save
  const fileName = `${userId}.json`; // Generate a file name
  const filePath = path.join(__dirname, 'playerData', fileName);

  fs.readFile(filePath, { encoding: 'utf8' }, (err, fileContents) => {
    let currentData = {};

    if (!err && fileContents) {
      try {
        currentData = JSON.parse(fileContents);
      } catch (parseErr) {
        console.error('Failed to parse player data:', parseErr);
        res.status(500).send('Error reading player data.');
        return;
      }
    }

    // Format or update the data
    console.log('Current Data before delete:', currentData);
    delete currentData[`slot-${slotIndex}`];
    delete currentData[`playerData-${slotIndex}`];
    console.log('Updated Data:', currentData);
    // Write the updated data back to the file
    fs.writeFile(filePath, JSON.stringify(currentData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Failed to remove player data:', writeErr);
        res.status(500).send('Error removing player data.');
        return;
      }
      res.send('Player data removed successfully.');
    });
  });
});

app.get('/check-slot-count/:userId', (req, res) => {
  const userId = req.params.userId;
  const filePath = path.join(__dirname, 'playerData', `${userId}.json`);

  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If the file does not exist, assume no slots
        console.log(`No data file for user ${userId}, assuming 0 slots.`);
        return res.json({ count: 0 });
      }
      // Handle other kinds of errors
      console.error('Error reading file:', err);
      return res.status(500).send('Error retrieving user data.');
    }

    try {
      const jsonData = JSON.parse(data);
      const slotKeys = Object.keys(jsonData).filter((key) =>
        key.startsWith('slot-')
      );
      const slotCount = slotKeys.length;
      res.json({ count: slotCount });
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      res.status(500).send('Error parsing user data.');
    }
  });
});

app.get('/get-slot-data/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId, 'this is user id');
  const filePath = path.join(__dirname, 'playerData', `${userId}.json`);

  fs.readFile(filePath, { encoding: 'utf8' }, (err, fileContents) => {
    if (err) {
      console.error('Failed to read player data file:', err);
      //res.status(500).send('Error retrieving player data.');
      res.json({});
      return;
    }

    try {
      const data = JSON.parse(fileContents);
      // Create a filtered object that includes only the slot data
      const slots = Object.keys(data).reduce((acc, key) => {
        if (key.startsWith('slot-')) {
          acc[key] = data[key];
        }
        return acc;
      }, {});
      res.json(slots);
    } catch (parseErr) {
      console.error('Failed to parse player data:', parseErr);
      res.status(500).send('Error parsing player data.');
    }
  });
});

app.get('/get-player-data/:userId/:slotIndex', (req, res) => {
  const { userId, slotIndex } = req.params;
  const filePath = path.join(__dirname, 'playerData', `${userId}.json`);

  fs.readFile(filePath, { encoding: 'utf8' }, (err, fileContents) => {
    if (err) {
      console.error('Failed to read player data file:', err);
      res.status(500).send('Error retrieving player data.');
      return;
    }

    try {
      const data = JSON.parse(fileContents);
      const playerDataKey = `playerData-${slotIndex}`;

      if (data[playerDataKey]) {
        res.json(data[playerDataKey]);
      } else {
        res.status(404).send('Player data not found for specified slot');
      }
    } catch (parseErr) {
      console.error('Failed to parse player data:', parseErr);
      res.status(500).send('Error parsing player data.');
    }
  });
});

app.post('/get-token', async (req, res) => {
  const fetch = (await import('node-fetch')).default;

  const { code } = req.body;

  if (!code) {
    return res.status(400).send('No authorization code provided.');
  }
  const params = new URLSearchParams({
    client_id: process.env.VITE_DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
    scope: 'embedsdk',
  });
  console.log(params, 'this is params');
  try {
    console.log('attempting to fetch');
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    if (response.ok) {
      res.json({ accessToken: data.access_token });
    } else {
      throw new Error(data.error_description || 'Failed to fetch access token');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  console.log('end of try catch');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
