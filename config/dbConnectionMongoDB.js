const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BlogDesbravador');
mongoose.connection
        .once('open', () => console.log('Connectou MongoDB'))
        .on('error', (error) => {
            console.log('Warning', error)
        })