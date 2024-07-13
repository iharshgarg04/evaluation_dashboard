const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
    },
    viva:{
        marks:{
            type:Number,
            default:0,
        },
        pdfFile:{
            type:String
        }
    },
    ideation:{
        marks:{
            type:Number,
            default:0,
        },
        pdfFile:{
            type:String
        }
    },
    execution:{
        marks:{
            type:Number,
            default:0,
        },
        pdfFile:{
            type:String
        }
    },
    projectManagement:{
        marks:{
            type:Number,
            default:0,
        },
        pdfFile:{
            type:String
        }
    },
    teamWork:{
        marks:{
            type:Number,
            default:0,
        },
        pdfFile:{
            type:String
        }
    },
    totalMarks:{
        marks:{
            type:Number,
            default:0,
        },
        pdfFile:{
            type:String
        }
    }
})


const Marks = mongoose.model("Marks",marksSchema);
module.exports = Marks;