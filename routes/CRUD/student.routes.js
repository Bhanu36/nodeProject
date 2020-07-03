const router = require("express").Router();
const {
  createStudentInfo,
  getStudentInfo,
  updateStudentInfo,
  deleteStudentInfo,
} = require("../../controllers/student.controller");

router.post("/create", createStudentInfo);
router.get("/list", getStudentInfo);
router.put("/studentInfo", updateStudentInfo);
router.delete("/delete/:id", deleteStudentInfo);


module.exports = router;
