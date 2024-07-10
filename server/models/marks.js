const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
    },
    viva:{
        type:Number,
        default:0,
    },
    ideation:{
        type:Number,
        default:0,
    },
    execution:{
        type:Number,
        default:0,
    },
    projectManagement:{
        type:Number,
        default:0,
    },
    teamWork:{
        type:Number,
        default:0,
    },
    totalMarks:{
        type:Number,
        default:0,
    }
})


const Marks = mongoose.model("Marks",marksSchema);
module.exports = Marks;