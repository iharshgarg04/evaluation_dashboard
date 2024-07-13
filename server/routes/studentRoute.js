const express = require("express");
const router = express.Router();
const { fetchAllStudents, addMarksOrUpdate, fetchMyStudents, fetchMarks, CreateNewStudent } = require('../controller/studentcontroller');
const marksController = require('../controller/marksController');

router.get('/',fetchAllStudents);
router.post("/marks",addMarksOrUpdate);
router.get("/myStudents",fetchMyStudents);
router.get("/fetchMarks",fetchMarks);
router.post("/CreateNewStudent",CreateNewStudent);
router.post('/marksUpload', marksController.upload.fields([
    { name: 'viva', maxCount: 1 },
    { name: 'ideation', maxCount: 1 },
    { name: 'execution', maxCount: 1 },
    { name: 'projectManagement', maxCount: 1 },
    { name: 'teamWork', maxCount: 1 },
    { name: 'totalMarks', maxCount: 1 },
  ]), marksController.createMarks);

module.exports = router;