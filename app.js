const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

// Define a route for handling POST requests
app.post('/', (req, res) => {
  const requestBody = req.body;
  console.log('Received POST request with data:', requestBody);

  // Create a new user document with the data received
  const newUser = new User({
    username: requestBody.username,
    email: requestBody.email,
    password: requestBody.password,
  });

  // Save the user to the MongoDB database
  newUser.save()
    .then(() => {
      res.json({
        "success": true,
        "message": "User registration successful"
      });
    })
    .catch(error => {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'User registration failed' });
    });
});

// Define a route for handling GET requests
app.get('/', (req, res) => {
  res.send('Hello, World! This is a GET request.');
});

// Define a route for testing
app.post('/test', (req, res) => {
  const requestBody = req.body;
  console.log('Received POST request with data:', requestBody);
  res.json({ message: 'Received POST request successfully', data: requestBody });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to your MongoDB Atlas instance
mongoose.connect('mongodb+srv://gashlinmusic:4xtkw0ZE74eQ2ESl@userdatabasecluster.m76swio.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;