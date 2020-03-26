const mongoose = require('mongoose')
const Notification = require('../models/notification')
const amqp = require('amqplib/callback_api')

exports.getAllNotification = (req, res) => {
    Notification.find()
    .exec()
    .then(notifications=>{
        res.status(200).json(notifications)
    })
    .catch(err =>{
        res.status(500).json({
            message:err.message
        })
    })    
}

exports.createNotification = (req, res) => {
    const newNotification = new Notification({       
        type:req.body.type,
        message:req.body.message,
        users: req.body.users
    })
    Notification.create(newNotification)
    .then(notification => {
        res.status(201).json({notification});
        // Send Notifications To Queue
        amqp.connect('amqp://rabbit_user:rabbit_password@rabbitmq', function(error, connection) {
        connection.createChannel(function(error1, channel) {
            let queue = 'notifications_queue';
            channel.assertQueue(queue, {
            durable: true
            });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)), {
                persistent: true
            });
            console.log(" [x] Sent %s", notification);
        });
        });
         
    })
    .catch(err => {
        res.status(500).json({
            message:err.message
        })
    })
}
