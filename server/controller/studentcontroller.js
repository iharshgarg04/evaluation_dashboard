const Student = require('../models/student')
const Mentor = require('../models/mentor');
const Marks = require('../models/marks');
exports.fetchAllStudents = async(req,res)=>{
    try {
      const response = await Student.find({});
      if (!response) {
        res.status(400).json({
          success: "false",
          message: "error while fetching students",
        });
      }
      res.status(200).json({
        success: "true",
        response,
      });
    } catch (error) {
        console.log(error);
        console.log("error while fetching students");
    }
  }

  exports.addMarksOrUpdate = async (req, res) => {
    try {
      const {
        studentId,
        mentorId,
        viva,
        ideation,
        execution,
        projectManagement,
        teamWork,
      } = req.body;
      if (
        !studentId ||
        !viva ||
        !ideation ||
        !execution ||
        !projectManagement ||
        !teamWork
      ) {
        return res.status(400).send("All fields are requires");
      }
  
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(400).json({
          success: false,
          message: "mentor not found",
        });
      }
  
      if(mentor.locked===true){
          return res.status(400).json({
              success:false,
              message:"You have already submited the evaluation. You can no longer do changes"
          })
      }
  
      const totalMarks =
        viva + ideation + execution + projectManagement + teamWork;
  
        const existingMarks = await Marks.findOneAndUpdate(
          { student: studentId },
          {
            $set: {
              viva: viva,
              ideation: ideation,
              execution: execution,
              projectManagement: projectManagement,
              teamWork: teamWork,
              totalMarks: totalMarks,
            },
          },
          { new: true, upsert: true }
        ).populate("student");
  
        const stuMarks = await Student.findByIdAndUpdate(studentId,{totalMarks:totalMarks,graded:true});
  
      return res.status(200).json({
        success: true,
        message: "Marks are added successfully",
        marks: existingMarks,
      });
    } catch (error) {
      console.log(error.message);
      console.log("error while adding marks");
    }
  };

  exports.fetchMarks = async(req,res)=>{
    try{
      const studentId = req.headers.student
      if(!studentId){
        return res.status(400).json({
          success:false,
          message:"Student is not present in headers"
        })
      }
      console.log(studentId)
      const student = await Marks.findOne({student:studentId});
      console.log(student);
      if(!student){
        return res.status(400).json({
          success:false,
          message:"Marks are not assigned yet"
        })
      }
      console.log(student)
      res.status(200).json({
        success:true,
        message:"marks fetched successfully",
        student:student
      })
    }catch(error){
      console.log(error);
      console.log("error while fetching Marks");
    }
}

exports.fetchMyStudents = async(req,res)=>{
    try{
      const mentorId = req.headers.mentor
        if(!mentorId){
            return res.status(400).json({
                success:false,
                message:"Mentor id is not present."
            })
        }

        const mentor = await Mentor.findById(mentorId);
        if(!mentor){
            console.log("mentor is not found");
            return res.status(400).json({message:"mentor is not present in db"});
        }

        const populatedMentor = await mentor.populate("student");
        const students = mentor.student
        const markspr = students.map(async(studentId)=>{
          const mark = await Marks.findOne({student:studentId}).populate("student").lean();
          return { studentId, mark};
        })
        const studentMarks = await Promise.all(markspr);

        return res.status(200).json({
            student:populatedMentor.student,
            message:"students fetched successfully",
            studentMarks:studentMarks
        })

    }catch(error){
        console.log(error.message);
        console.log("error while fetching my Students");
    }
}


exports.CreateNewStudent = async(req,res)=>{
  try{
    const {name,email} = req.body;
    console.log(req.body);
    if(!name || !email) {
      return res.status(400).json({
        success:false,
        message:"Name or Email is not Entered"
      })
    }

    const student = Student.create({name:name,email:email,graded:false,assigned:false});
    if(!student){
      return res.status(400).json({
        success:false,
        message:"Error while creating the student",
      })
    }

    return res.status(200).json({
      success:true,
      message:"Student is created successfully",
    })

  }catch(error){
    console.log(error);
    console.log("Error while adding student");
  }
}