const mongoose = require("mongoose");
const StudentModel = require("../model/StudentInfo").Model;

async function createStudentInfo(req, res) {
  try {
    const { userName, phone, email, isWeekend } = req.body;
    const studentInfo = new StudentModel({
      userName,
      phone,
      email,
      isWeekend,
    });
    const insert = await studentInfo.save();
    return res.status(200).send({
      code: 200,
      status: "success",
      data: insert,
    });
  } catch (err) {
    return res.status(400).send({
      code: 200,
      message: err,
    });
  }
}

async function getStudentInfo(req,res) {
    try {
        const data = await StudentModel.find()
        return res.status(200).json({
          code: 200,
          message: "Success",
          data:data
        });
    } catch (err) {
      return res.status(200).send({
        code: 400,
        message: err,
      });
    }
}

async function updateStudentInfo(req,res) {
    try{
        const {_id,userName,phone,email,isWeekEnd} = req.body
        const updateRes = await StudentModel.findByIdAndUpdate({_id},{userName,phone,email,isWeekEnd})
        return res.status(200).json({
            code:200,
            message:"successFully updated"
        })
    }catch(err){
        return res.status(200).json({
            code:404,
            message:"error Occured in updateStudentInfo"
        })
    }
}

async function deleteStudentInfo(req, res) {
  try {
    const { id } = req.params;
    const deleteRes = await StudentModel.deleteOne({ _id: id });
    const data = await StudentModel.find();
    return res.status(200).json({
      code: 200,
      message: "deleted SuccessFully",
      data: data,
    });
  } catch (err) {
    return res.status(200).json({
      code: 400,
      message: "error occured in deleteStudentInfo",
    });
  }
}

module.exports = {
  createStudentInfo,
  getStudentInfo,
  updateStudentInfo,
  deleteStudentInfo,
};
