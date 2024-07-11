const Marks = require("../models/marks");
const Mentor = require("../models/mentor");
const Student = require("../models/student");
const emailTemplate = require("../utils/emailTempelate");
const mailSender = require("../utils/mailSender");

exports.fetchMentors = async(req,res)=>{
    try{
      const response = await Mentor.find({});
      if(!response){
        return res.status(400).json({
          success:false,
          message:"error while fetching mentors",
        })
  
      }
      return res.status(200).json({
        success:true,
        mentors : response
      })
    }catch(error){
      console.log(error.message);
      console.log("error while fetching mentors");
    }
  }

  
  exports.addStudents = async(req,res)=>{
    try{
        const {students,mentorId} = req.body;
        if(!students || !mentorId){
            return res.status(400).json({
                success:false,
                message:"student is not selected",
            })
        }
        const mentor = await Mentor.findById(mentorId);

        if(!mentor){
            return res.status(400).json({
                success:false,
                message:"mentor is not present",
            })
        }

        if(mentor.locked===true){
            return res.status(400).json({
                success:true,
                message:"You have already submited the evaluation. You can no longer do changes"
            })
        }

        const currentLenght = mentor.student.length;
        const newLength = students.length + currentLenght;
        
        if(newLength<3 || newLength>4){
            return res.status(400).json({
                success:false,
                message:"Mentor can only accommodate between 3 to 4 students"
            })
        }

        await Student.updateMany({_id:{$in:students}},{$set:{mentorId:mentorId,assigned:true}},{new:true});

        mentor.student.push(...students);
        await mentor.save();
        return res.status(200).json({
            success: true,
            message: "student added successfully",
            mentor,
          });
    }catch(error){
        console.log(error);
        console.log("error while adding student");
    }
  }

  exports.removeStudent = async(req,res)=>{
    try{
        const {studentId, mentorId} = req.body;
        if(!studentId || !mentorId){
            return res.status(400).json({
                success:false,
                message:"student is not Selected",
            })
        }
        const mentor = await Mentor.findById(mentorId);
        if(!mentor){
            return res.status(400).json({
                success:false,
                message:"mentor is not valid",
            })
        }
        if(mentor.locked===true){
            return res.status(400).json({
                success:true,
                message:"You have already submited the evaluation. You can no longer do changes"
            })
        }
        await Student.findByIdAndUpdate(studentId,{$unset:{mentorId:'',assigned:false}},{new:true});
        const response = await Mentor.findByIdAndUpdate(mentorId,{$pull:{student:studentId}},{new:true}).populate("student");
        await Marks.deleteMany({student:studentId});
        return res.status(200).json({
            success:true,
            message:"student removed successfully",
            response,
        })
    }catch(error){
        console.log("error while removing student");
        console.log(error);
    }
  }

  exports.submitAdmin = async(req,res)=>{
    try{
        const {mentorId} = req.body;
        if(!mentorId){
            return res.status(400).json({
                success:true,
                message:"all fields are required",
            })
        }
        const mentor = await Mentor.findById(mentorId).populate("student");
        if(mentor.locked===true){
            return res.status(400).json({
                success:false,
                message:"you have already submitted the evaluation"
            })
        }
        const students = mentor.student;
        if(students.length===0){
            return res.status(400).json({
                success:false,
                message:"Add students before submitting grading",
            })
        }

        const marksObtained = students.map(async(studentId)=>{
            const mark = await Marks.findOne({student:studentId}).populate("student");
            return {studentId,mark};
        })
        const studentMarks = await Promise.all(marksObtained);
        console.log(studentMarks);
        for(let i=0;i<studentMarks.length;i++){
            const response = await mailSender(studentMarks[i].studentId.email,"Uploaded Marks",emailTemplate(studentMarks[i].studentId.name,studentMarks[i].mark));
            if(!response){
              console.log("error while sending email");
            }
          }
        mentor.locked=true;
        await mentor.save();

        return res.status(200).json({
            success:true,
            message:"marks locked successfully",
            mentor: mentor,
            studentMarks:studentMarks
        })
    }catch(error){
        console.log("Error while submitting");
        console.log(error);
    }
  }