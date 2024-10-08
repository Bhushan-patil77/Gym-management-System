// 1. Load required modules
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
require('dotenv').config();



// 2. Initialize environment variables
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;



// 3. Create app object
const app = express();



// 4. Middleware setup
app.use(cors());
app.use(express.json());



// 5. Define routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);



// 6. Connect to the database
mongoose.connect(DB_URL).then(() => {
    console.log('Database connected...');
    const server = http.createServer(app);
    server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Something went wrong', err);
  });
  