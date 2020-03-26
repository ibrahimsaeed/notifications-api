const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: { type: String, index: true, required: true },
    name:String,
    email:String,
    phoneNumber: String,
    langauge:{ type: String, enum: ["ar", "en"] }
})

const notificationSchema = mongoose.Schema({
    type:{ 
    	type: String,
    	enum: ["sms", "email" ,"push"] 
    },
    message:String,
    users:[userSchema]
	},
	{ timestamps: true}
);
module.exports = mongoose.model('Notification',notificationSchema)