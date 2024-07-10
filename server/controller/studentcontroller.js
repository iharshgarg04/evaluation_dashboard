const Student = require('../models/student')

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
  
        const stuMarks = await Student.findByIdAndUpdate(studentId,{totalMarks:totalMarks});
  
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