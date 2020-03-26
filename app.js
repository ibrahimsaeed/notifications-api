const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const notificationsRoutes = require('./app/routes/notification')
var amqp = require('amqplib/callback_api');

mongoose.connect("mongodb://mongo:27017/notifications-api", {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,})
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

amqp.connect('amqp://rabbit_user:rabbit_password@rabbitmq', function(error0, connection) {
  if (error0) {
    throw error0;
}
connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'notifications_queue';

    channel.assertQueue(queue, {
      durable: true
    });
    console.log(" [*] Waiting for messages in %s.", queue);
    channel.consume(queue, function(msg) {
    var queuedNotification = msg.content.toString()
        if(queuedNotification){
            console.log(queuedNotification)
        }
    console.log(" [x] Received %s", msg.content.toString());
    }, {
        noAck: true
    });
  });
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/notifications', notificationsRoutes)

module.exports  = app