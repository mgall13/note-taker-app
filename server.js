// Server routes
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initializing express
const app = express();

// Creating Port
const PORT = process.env.PORT || 3001;

// Initialing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creating Server Routes
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Telling express which Port to listen on
app.listen(PORT, () => {
    console.log('Connected using PORT 3001');
});