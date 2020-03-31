const amqp = require('amqplib/callback_api');
const smsService = require('../services/smsService');
const emailService = require('../services/emailService');
const pushService = require('../services/pushService');

exports.addToQueue = (notification,type)=>{
    amqp.connect('amqp://rabbit_user:rabbit_password@rabbitmq', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            // available queue types ["sms", "email" ,"push"]
            var queue = type;
            
            channel.assertQueue(queue, {
                durable: true
            });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)));
        });
    });
}

exports.pullFromQueue = (type)=>{
    amqp.connect('amqp://rabbit_user:rabbit_password@rabbitmq', function(error0, connection) {
        connection.createChannel(function(error1, channel) {
            var queue = type;           
            channel.assertQueue(queue, {
                durable: true
            }); 
        channel.consume(queue, function(msg) {
            notification = msg.content.toString()
            notificationObj = JSON.parse(notification);
            
            notificationType = notificationObj.type
            usersCount = notificationObj.users.length
            message = notificationObj.message
            users = notificationObj.users
            
            if(notificationType == "sms"){
                if(usersCount == 1){
                    smsService.sms(message,users)
                }
                else{
                    smsService.bulkSms(message,users)
                }
            }
            if(notificationType == "push"){
                if(usersCount == 1){
                    pushService.push(message,users)
                }
                else{
                    pushService.bulkPush(message,users)
                }
            }
            if(notificationType == "email"){
                if(usersCount == 1){
                    emailService.email(message,users)
                }
                else{
                    emailService.bulkEmail(message,users)
                }
            }
        });
        });
    });
}