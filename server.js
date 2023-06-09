const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT ||1000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:admin@cluster0.0z5o0lc.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/books', bookRoutes);
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
