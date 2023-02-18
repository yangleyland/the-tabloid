const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mainRoute = require('./routes/mainRoute.js');
const multer = require('multer');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3200;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());
app.use(express.json());


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