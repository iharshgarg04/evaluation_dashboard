const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
	},
    email:{
        type:String,
        required:true,
    },
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Mentor",
    },
    assigned:{
        type:Boolean,
        default:false,
    },
    totalMarks:{
        type:Number,
        default:0
    }
})

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;