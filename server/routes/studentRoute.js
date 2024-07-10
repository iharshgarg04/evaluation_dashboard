const express = require("express");
const router = express.Router();
const { fetchAllStudents } = require('../controller/studentcontroller');

router.get('/',fetchAllStudents);

module.exports = router;