const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
  },
  division: {
    type: String,
    enum: ["a", "b", "c"],
    default: "a",
  },
  id: {
    type: Number,
    unique: true,
  },
  year: {
    type: String,
    enum: ["FE", "SE", "TE", "BE"],
  },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
