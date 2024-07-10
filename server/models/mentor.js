const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
	},
	student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
    }],
    locked:{
        type:Boolean,
        default:false,
    }
})

const Mentor = mongoose.model("Mentor",mentorSchema);
module.exports = Mentor;