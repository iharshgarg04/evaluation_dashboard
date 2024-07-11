const express = require("express");
const router = express.Router();
const { fetchAllStudents, addMarksOrUpdate, fetchMyStudents, fetchMarks, CreateNewStudent } = require('../controller/studentcontroller');

router.get('/',fetchAllStudents);
router.post("/marks",addMarksOrUpdate);
router.get("/myStudents",fetchMyStudents);
router.get("/fetchMarks",fetchMarks);
router.post("/CreateNewStudent",CreateNewStudent);
module.exports = router;