const express = require('express');
const { fetchMentors, addStudents, removeStudent, submitAdmin } = require('../controller/mentorController');
const router = express.Router();

router.get("/fetchMentors",fetchMentors);
router.post("/addstudents",addStudents);
router.put("/removestudent",removeStudent);
router.post("/submit",submitAdmin);
module.exports=router;