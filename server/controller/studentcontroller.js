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