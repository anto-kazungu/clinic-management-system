const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const appointmentRoutes = require('./routes/appointments');
const db = require('./db'); // initializes database connection

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Access-Control Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send('Server started successfully!');
});

// Appointments Routes
app.use('/api/appointments', appointmentRoutes);

// Start Server
const PORT = process.env.PORT || 3303; // Fallback to 3303 if PORT not set in .env
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
