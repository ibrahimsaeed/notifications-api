const mongoose = require('mongoose');
const Notification = require('../models/notification');
const notificationQueue = require('./notificationQueue');

//Get All Notifications
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

//Send Noticiations
exports.createNotification = (req, res) => {
    const newNotification = new Notification({       
        type:req.body.type,
        message:req.body.message,
        users: req.body.users
    })
    Notification.create(newNotification)
    .then(newNotification => {
        res.status(201).json({newNotification});
        // save Notifications in Queue based on Notification type
        notificationQueue.addToQueue(newNotification,newNotification.type);
    })
    .catch(err => {
        res.status(500).json({
            message:err.message
        })
    })
}
