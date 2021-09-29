const router = require("express").Router();
const express = require("express");
const cors = require("cors");

const controller = require("../controllers/Student");

const {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
  getStudentDetails,
} = controller;
const { userAuth } = require("../middleware/auth");

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

router.post("/addStudent", userAuth, addStudent);
router.post("/deleteStudent", userAuth, deleteStudent);
router.get("/getStudents", userAuth, getStudents);
router.post("/getStudentDetails", userAuth, getStudentDetails);
router.post("/updateStudent", userAuth, updateStudent);

module.exports = router;
