const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mainRoute = require('./routes/mainRoute.js');
const multer = require('multer');
const axios = require('axios');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3200;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());
app.use(express.json());


app.get('/chat', async (req, res) => {
  try {
    const message = req.body.message;

    // Make an API request to ChatGPT
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: message,
      max_tokens: 150,
      temperature: 0.5,
      n: 1,
      stop: "\n"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    // Return the response from ChatGPT to the client
    res.json({ messageRes: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const upload = multer({ dest: '../frontend/public' });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;
  }

  const fileName = req.file.filename;
  const fileUrl = `/${fileName}`;

  res.json({ fileUrl });
});



mongoose.set('strictQuery', false);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('MongoDB connected...');
      
      app.listen(port, () => {
        console.log('Server listening on port 3200...');
      });
    })
    .catch(error => console.error(error));

app.use('/', mainRoute);