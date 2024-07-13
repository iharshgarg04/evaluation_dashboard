const Marks = require('../models/marks'); // Adjust the path as needed
const multer = require('multer');
const path = require('path');
const Student = require('../models/student');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  const upload = multer({ storage: storage });
  
  const createMarks = async (req, res) => {
      console.log(req.files);
      console.log(req.body);
    try {
      const { studentId, viva, ideation, execution, projectManagement, teamWork, totalMarks } = req.body;
      console.log(studentId)
      const newMarks = new Marks({
        student:studentId,
        viva: {
          marks: viva,
          pdfFile: req.files['viva'] ? req.files['viva'][0].path : ''
        },
        ideation: {
          marks: ideation,
          pdfFile: req.files['ideation'] ? req.files['ideation'][0].path : ''
        },
        execution: {
          marks: execution,
          pdfFile: req.files['execution'] ? req.files['execution'][0].path : ''
        },
        projectManagement: {
          marks: projectManagement,
          pdfFile: req.files['projectManagement'] ? req.files['projectManagement'][0].path : ''
        },
        teamWork: {
          marks: teamWork,
          pdfFile: req.files['teamWork'] ? req.files['teamWork'][0].path : ''
        },
        totalMarks: {
          marks: totalMarks,
          pdfFile: req.files['totalMarks'] ? req.files['totalMarks'][0].path : ''
        }
      });
  
      // Save the new Marks instance to the database
      await newMarks.save();

      await Student.findByIdAndUpdate(studentId,{graded:true});
  
      res.status(201).json({ message: 'Marks created successfully', marks: newMarks });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Error creating marks', error });
    }
  };
  
  module.exports = {
    upload,
    createMarks
  };