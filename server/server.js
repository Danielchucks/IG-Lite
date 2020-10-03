// jwW7JSdg01D36pG5

const express = require('express');
const connectDB = require('./db');
// const mongoose = require('mongoose');
// const { MONGOURI } = require('./key');

const app = express();

/* Database Connection */
connectDB();

/* Alternative Event Driven */
// mongoose.connect(MONGOURI);
// mongoose.connection.on('connected', () => {
// 	console.log('MongoDB Connected...');
// });
// mongoose.connection.on('error', (err) => {
// 	console.log('Error connecting to Database ', err);
// });

// Init Middleware
app.use(express.json({ extended: false }));

// Defining Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send("Hello! Welcome, Let's build our own instgram");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
