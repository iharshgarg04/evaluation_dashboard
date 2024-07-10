const express = require("express");
const router = express.Router();
const { fetchAllStudents, addMarksOrUpdate, fetchMyStudents, fetchMarks } = require('../controller/studentcontroller');

router.get('/',fetchAllStudents);
router.post("/marks",addMarksOrUpdate);
router.get("/myStudents",fetchMyStudents);
router.get("/fetchMarks",fetchMarks);
module.exports = router;