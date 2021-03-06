const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notificationsQueue = require('./app/controllers/notificationQueue');
const notificationsRoutes = require('./app/routes/notification');


mongoose.connect("mongodb://mongo:27017/notifications-api", {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,})
.then(() => {
    console.log("Successfully connected to the database");    
    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// pull notifications from RabbitMQ Queues
//notificationsQueue.pullFromQueue("push");
//notificationsQueue.pullFromQueue("sms");
//notificationsQueue.pullFromQueue("email");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/notifications', notificationsRoutes);

module.exports  = app;