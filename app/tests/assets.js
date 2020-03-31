const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notificationsQueue = require('../controllers/notificationQueue');
const notificationsRoutes = require('../routes/notification');


mongoose.connect("mongodb://mongo:27017/notifications-api", {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,})
.then(() => {
    console.log("Successfully connected to the database");    
    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/notifications', notificationsRoutes);

module.exports  = app;