const jwt = require("jsonwebtoken");

const Student = require("../models/Student");

// @desc    Add student
// @route   POST /api/student/addStudent
// @access  Only authenticated
exports.addStudent = async (req, res) => {
  try {
    const { name, division, id, year } = req.body;

    new Student({
      id,
      name,
      division,
      year,
    })
      .save()
      .then((newStudent) => {
        return res.status(200).send({ success: true, newStudent });
      });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

// @desc    Delete student
// @route   POST /api/student/deleteStudent
// @access  Only authenticated
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.body;
    Student.findOneAndDelete({ id }, (err, document) => {
      if (err) {
        res.status(401).send({ success: false, err });
      }
      res.status(200).send({ success: true, msg: "Book returned" });
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

// @desc    Get all students
// @route   GET /api/student/getStudents
// @access  Only authenticated
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    console.log(students);
    return res.status(200).send({ students, success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

// @desc    Get specific student details
// @route   POST /api/student/getStudentDetails
// @access  Only authenticated
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.body.studentId });
    console.log(student);
    return res.status(200).send({
      name: student.name,
      division: student.division,
      year: student.year,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

// @desc    Update student
// @route   POST /api/student/updateStudent
// @access  Only authenticated
exports.updateStudent = async (req, res) => {
  try {
    const { name, division, id, year } = req.body;
    Student.findOneAndUpdate(
      { id },
      {
        $set: { name, division, year },
      },
      (error, student) => {
        if (error) {
          res.status(401).send({ success: false, err: error });
        }
        res.status(200).send({ success: true, msg: "Student updated" });
      }
    );
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};
