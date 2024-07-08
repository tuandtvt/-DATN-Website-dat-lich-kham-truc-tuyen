// import { createPackage } from "../services/packageService";
import packageService from "../services/packageService";

let createPackage = async (req, res) => {
  try {
    let infor = await packageService.createPackage(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllPackage = async (req, res) => {
  try {
    let infor = await packageService.getAllPackage();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status.json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProfilePackageById = async (req, res) => {
  try {
    let infor = await packageService.getProfilePackageById(req.query.packagesId);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailPackageById = async (req, res) => {
  try {
    // console.log(req.query)
    let infor = await packageService.getDetailPackageById(
      req.query.id
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await packageService.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};


let filterPackage = async (req, res) => {
  try {
    let infor = await packageService.filterPackage(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let deletePackage = async (req, res) => {
  try {
    let infor = await packageService.deletePackage(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let udatePackageData = async (req, res) => {
  try {
    let infor = await packageService.udatePackageData(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let infor = await packageService.getScheduleByDate(
      req.query.packagesId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getExtraInforPackageById = async (req, res) => {
  try {
    let infor = await packageService.getExtraInforPackageById(req.query.packagesId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let postBookAppointment = async (req, res) => {
  try {
    let infor = await packageService.postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let confirmPackage = async (req, res) => {
  try {
      let infor = await packageService.confirmPackage(req.body.id);
      return res.status(200).json(infor);
  } catch (e) {
      console.log(e);
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from server',
      });
  }
};

let cancelPackage = async (req, res) => {
  try {
      let infor = await packageService.cancelPackage(req.body.id);
      return res.status(200).json(infor);
  } catch (e) {
      console.log(e);
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from server',
      });
  }
};

let getBookingPackageById = async (req, res) => {
  try {
    let infor = await packageService.getBookingPackageById(
      req.query.bookingId,
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let cancelBookingPackage = async (req, res) => {
  try {
    let infor = await packageService.cancelBookingPackage(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let confirmBookingPackage = async (req, res) => {
  try {
    let infor = await packageService.confirmBookingPackage(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getListPatientForPackage = async (req, res) => {
  try {
    // console.log("Doctor ID:", req.query.doctorId);
    // console.log("Date:", req.query.date);

    let infor = await packageService.getListPatientForPackage(
      req.query
    );
    // console.log("infor",infor);
    
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  createPackage: createPackage,
  getAllPackage: getAllPackage,
  getAllDoctors: getAllDoctors,
  getScheduleByDate: getScheduleByDate,
  getExtraInforPackageById: getExtraInforPackageById,
  getDetailPackageById: getDetailPackageById,
  bulkCreateSchedule: bulkCreateSchedule,
  filterPackage:filterPackage,
  deletePackage:deletePackage,
  udatePackageData:udatePackageData,
  postBookAppointment:postBookAppointment,
  confirmPackage: confirmPackage,
  cancelPackage: cancelPackage,
  getBookingPackageById:getBookingPackageById,
  cancelBookingPackage: cancelBookingPackage,
  getListPatientForPackage: getListPatientForPackage,
  confirmBookingPackage: confirmBookingPackage,
  getProfilePackageById: getProfilePackageById
};
