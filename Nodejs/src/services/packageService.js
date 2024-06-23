const db = require("../models");
import _ from "lodash";
const { Op } = require("sequelize");
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let buildUrlEmail = (packagesId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&packagesId=${packagesId}`;

  return result;
};

let createPackage = (data) => {
 
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        //!data.packages ||
        !data.descriptionMarkdown ||
        !data.priceId
        // !data.addressClinic
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
    
      } else {
        await db.Package.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          doctorId:data.doctorId,
          priceId:data.priceId,
          // addressClinic:data.addressClinic
          descriptionMarkdown: data.descriptionMarkdown
        });
       
        resolve({
          errCode: 0,
          errMessage: "Ok!",
        });
      }
    } catch (e) {
      
      reject(e);
    }
  });
};

let getAllPackage = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Package.findAll();

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Ok!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailPackageById = (inputId) => {
  
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let packageData = await db.Package.findOne({
          where: { id: inputId },
          attributes: ["id","name","descriptionHTML", "descriptionMarkdown", "image", "doctorId", "priceId"],
        });
        if (!packageData) {
          return {
            errCode: 1,
            errMessage: "Package not found"
          };
        }
    
        // Chuyển đổi doctorId từ JSON thành mảng
        const doctorIds = JSON.parse(packageData.doctorId);
    
        // Truy vấn các bản ghi Doctor_Infor tương ứng với doctorIds
        const doctorData = await db.Doctor_Infor.findAll({
          where: {
            doctorId: {
              [Op.in]: doctorIds
            }
          },
          attributes: ["doctorId"],
          // include: [
          //   {
          //     model: db.User,
          //     attributes: ["id", "firstName","lastName"],
          //   },
          // ],
        });

        if (packageData && packageData.image) {
          packageData.image = new Buffer(packageData.image, "base64").toString("binary");
         
        }
        //  const doctorData = await db.Doctor_Infor.findOne({
        //   where: {
        //     doctorId: "18",
          
        //   },
        //   attributes: ["doctorId"],
        //   include: [
        //     {
        //       model: db.User,
        //       as: "userData",
        //       attributes: ["id", "firstName","lastName"],
        //     },
        //   ],
        // });
        const data=[packageData,doctorData]

        // if (!data) {
        //   data = {}; }
        //   // //do something
        //   // let doctorPackage = [];
        //   // if (location === "ALL") {
        //   //   doctorPackage = await db.Doctor_Infor.findAll({
        //   //     where: { packagesId: inputId },
        //   //     attributes: ["doctorId", "provinceId"],
        //   //   });
        //   // } else {
        //   //   //find by location
        //   //   doctorPackage = await db.Doctor_Infor.findAll({
        //   //     where: { packagesId: inputId, provinceId: location },
        //   //     attributes: ["doctorId", "provinceId"],
        //   //   });
        //   // }
        resolve({
          errCode: 0,
          errMessage: "Ok!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.packagesId || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param",
        });
      } else {
        let schedule = data.arrSchedule;
        // console.log(schedule)
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        } 
        // console.log("x",schedule)

        //get all existing data
        let existing = await db.Schedule.findAll({
          where: { packagesId: data.packagesId, date: data.date },
          attributes: ["timeType", "date", "packagesId", "maxNumber"],
          raw: true,
        });
        // console.log("111")

        //convert date
        // if (existing && existing.length > 0) {
        //   existing = existing.map((item) => {
        //     item.date = new Date(item.date).getTime();
        //     return item;
        //   });
        // }

        //compare difference
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let filterPackage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let options = { 
        where: {},
        raw: true,
        nest: true, 
      };
      let name=data.name;

      if(name){
        options.where.name={
          [Op.like]: '%'+name+'%'
        }
      } 

      let dataPackage=[]
      dataPackage = await db.Package.findAll(options);

      if (dataPackage && dataPackage.length > 0) {
        dataPackage.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Ok!",
        data:dataPackage,
      });
    } catch (e) {
      console.log(e)
      reject(e);
    }
  });
};

let deletePackage = (packagesId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let packages = await db.Package.findOne({
        where: { id: packagesId },
      });
      if (!packages) {
        resolve({
          errCode: 2,
          errMessage: `The package isn't exist`,
        });
      }
      if (packages) {
        await db.Package.destroy({
          where: { id: packagesId },
        });
      }
      resolve({
        errCode: 0,
        errMessage: `The specialty is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// let getAllDoctors = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let doctors = await db.User.findAll({
//         where: { roleId: "R2" },
//         order: [["createdAt", "DESC"]],
//         attributes: {
//           exclude: ["password"],
//         },
//         include: [
//           {
//             model: db.Allcode,
//             as: "positionData",
//             attributes: ["valueEn", "valueVi"],
//           },
//           {
//             model: db.Allcode,
//             as: "genderData",
//             attributes: ["valueEn", "valueVi"],
//           },
//           {
//             model: db.Doctor_Infor,
//             attributes: ["specialtyId", "provinceId"],
//             include: [
//               {
//                 model: db.Specialty,
//                 as: "specialtyData",
//                 attributes: ["name"],
//               },
//               {
//                 model: db.Allcode,
//                 as: "provinceTypeData",
//                 attributes: ["valueEn", "valueVi"],
//               },
//               {
//                 model: db.Clinic,
//                 as: "clinicData",
//                 attributes: ["name", "address"],
//               },
//               {
//                 model: db.Package,
//                 as: "packagesData",
//                 attributes: ["name", "image"],
//               },
//             ],
//           },
//         ],
//         raw: true,
//         nest: true,
//       });

//       resolve({
//         errCode: 0,
//         data: doctors,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let udatePackageData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let packages = await db.Package.findOne({
        where: { id: data.id },
        raw: false, //chu y cho nay do ben file config cau hinh cho query
      });
      if (packages) {
        packages.descriptionHTML = data.descriptionHTML;
        packages.descriptionMarkdown = data.descriptionMarkdown;
        packages.name = data.name;
        packages.priceId = data.priceId;
        if (data.image) packages.image = data.image;
        await packages.save();

        resolve({
          errCode: 0,
          message: "Update the package succeed!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Package's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleByDate = (packagesId, date) => {
  
  return new Promise(async (resolve, reject) => {
    try {
      if (!packagesId || !date) {
        
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter111",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: { packagesId: packagesId ,date:date},
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi", "value"],
            },
          ],
          raw: false,
          nest: true,
        });
      
        if (!dataSchedule) {
          dataSchedule = [];
        }
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getExtraInforPackageById = (packagesId) => {
 
  return new Promise(async (resolve, reject) => {
    try {
      if (!packagesId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter1",
        });
      } else { 
        let data = await db.Package.findOne({
          where: { id: packagesId },
          attributes: {
            exclude: ["id", "name"],
          },
          include: [
            {
              model: db.Allcode,
              as: "pricePackageTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!data) {
          data = [];
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.packagesId ||
        !data.timeType ||
        !data.date ||
        !data.patientName 
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
      
              let schedule = await db.Schedule.findOne({
                where: { 
                  date: data.date,
                  timeType: data.timeType,
                  packagesId: data.packagesId,  
                },
                raw: false, //chu y cho nay do ben file config cau hinh cho query
              });
             
              if(schedule){
                  if(schedule.currentNumber<schedule.maxNumber){
                    schedule.currentNumber = parseInt(schedule.currentNumber) + 1;
                    await schedule.save();
                  }else{
                    resolve({
                      errCode: 3,
                      errMessage: "Limit max number booking!",
                    });
                  }
              }else{
                  resolve({
                    errCode: 3,
                    errMessage: "Limit max number booking!",
                  });
              }
              

        //   console.log(1)
        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
       
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.patientName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.packagesId, token),
        });

        let user = await db.User.findOne({
          where: { email: data.email },
        });
        
        if (user) {
          await db.Booking.create({
            statusId: "S1",
            packagesId: data.packagesId,
            patientId: user.id,
            date: data.date,
            timeType: data.timeType,
            token: token,
            patientName:data.patientName,
            patientPhoneNumber:data.phoneNumber,
            patientAddress:data.address,
            patientReason: data.reason,
            patientGender: data.selectedGender,
            patientBirthday: data.date
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save infor patient succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let confirmPackage = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          let schedule = await db.Schedule.findOne({ where: { id: id } });
          if (schedule) {
              schedule.status = 'confirmed'; // Assuming there is a status field
              await schedule.save();
              resolve({
                  errCode: 0,
                  errMessage: 'Package confirmed successfully!',
              });
          } else {
              resolve({
                  errCode: 1,
                  errMessage: 'Package not found!',
              });
          }
      } catch (e) {
          reject(e);
      }
  });
};

let cancelPackage = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          let schedule = await db.Schedule.findOne({ where: { id: id } });
          if (schedule) {
              schedule.status = 'canceled'; // Assuming there is a status field
              await schedule.save();
              resolve({
                  errCode: 0,
                  errMessage: 'Package canceled successfully!',
              });
          } else {
              resolve({
                  errCode: 1,
                  errMessage: 'Package not found!',
              });
          }
      } catch (e) {
          reject(e);
      }
  });
};

let getBookingPackageById = (bookingId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!bookingId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Booking.findOne({
          where: { id: bookingId },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "email",
                "firstName",
                "address",
                "gender",
                "phonenumber",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!data) {
          data = {};
        }

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let cancelBookingPackage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.date || !data.patientId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        //update booking status
        let appoinment = await db.Booking.findOne({
          where: {
            // doctorId: data.doctorId,
            patientId: data.patientId,
            timeType: data.timeType,
            date: data.date,
            statusId: "S2",
          },
          raw: false,
        });

        if (appoinment) {
          appoinment.statusId = "S4";
          await appoinment.save();
        }

        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let getListPatientForPackage = (packagesId, date) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!packagesId || !date) {
//         resolve({
//           errCode: 1,
//           errMessage: "Missing required parameter",
//         });
//       } else {
//         let data = await db.Booking.findAll({
//           where: { statusId: "S2", packagesId: packagesId, date: date},
//           include: [
//             {
//               model: db.User,
//               as: "patientData",
//               attributes: [
//                 "email",
//                 "firstName",
//                 "address",
//                 "gender",
//                 "phonenumber",
//               ],
//               include: [
//                 {
//                   model: db.Allcode,
//                   as: "genderData",
//                   attributes: ["valueEn", "valueVi"],
//                 },
//               ],
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeDataPatient",
//               attributes: ["valueEn", "valueVi"],
//             },
//           ],
//           raw: false,
//           nest: true,
//         });

//         if (!data) {
//           data = {};
//         }
//           console.log("data",data)  
//         resolve({
//           errCode: 0,
//           data: data,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getListPatientForPackage = (packagesId, date) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!packagesId || !date) {
//         resolve({
//           errCode: 1,
//           errMessage: "Missing required parameter",
//         });
//       } else {
//         let data = await db.Booking.findAll({
//           where: { statusId: "S2", packagesId: packagesId, date: date },
//           include: [
//             {
//               model: db.User,
//               as: "patientData",
//               attributes: ["email", "firstName", "address", "gender", "phonenumber"],
//               include: [
//                 {
//                   model: db.Allcode,
//                   as: "genderData",
//                   attributes: ["valueEn", "valueVi"],
//                 },
//               ],
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeDataPatient",
//               attributes: ["valueEn", "valueVi"],
//             },
//           ],
//           raw: false,
//           nest: true,
//         });

//         if (!data) {
//           data = {};
//         }
//         resolve({
//           errCode: 0,
//           data: data,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getListPatientForPackage = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
      
//       if ( !data.date) {
//         resolve({
//           errCode: 1,
//           errMessage: "Missing required parameter",
//         });
//       } else {
//         let bookings = await db.Booking.findAll({
//           where: {
//             packagesId: {
//               [db.Sequelize.Op.ne]: null, // Điều kiện packagesId không null
//             },
//             date: data.date,
//             statusId: "S2"
//           },
//           include: [
//             {
//               model: db.User,
//               as: "patientData",
//               attributes: ["email", "firstName", "address", "gender", "phonenumber"],
//               include: [
//                 {
//                   model: db.Allcode,
//                   as: "genderData",
//                   attributes: ["valueEn", "valueVi"],
//                 },
//               ],
//             },
//             {
//               model: db.Allcode,
//               as: "timeTypeDataPatient",
//               attributes: ["valueEn", "valueVi"],
//             },
//           ],
//           raw: false,
//           nest: true,
//         });

//         resolve({
//           errCode: 0,
//           data: bookings,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getListPatientForPackage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let bookings = await db.Booking.findAll({
          where: {
            packagesId: {
              [db.Sequelize.Op.ne]: null, // Điều kiện packagesId không null
            },
            date: data.date,
            statusId: {
              [db.Sequelize.Op.in]: ["S2", "S3", "S4"] // Lấy dữ liệu cho các trạng thái S2, S3, S4
            }
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: ["email", "firstName", "address", "gender", "phonenumber"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: bookings,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


let confirmBookingPackage = (data) => {
  // console.log("hhaa",data)
  return new Promise(async (resolve, reject) => {
    try {
      if ( !data.packagesId || !data.patientId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        //update patient status
        let appoinment = await db.Booking.findOne({
          where: {
            packagesId: data.packagesId,
            patientId: data.patientId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });

        if (appoinment) {
          appoinment.statusId = "S3";
          await appoinment.save();
        }
        //create invoice table
        await db.Invoice.create({
          // doctorId: data.doctorId,về thêm packagesId
          patientId: data.patientId,
          specialtyId: data.specialtyId,
          totalCost: data.totalCost ? data.totalCost : 0,
        });

        //update to Revenue User table
        // let userTotalRevenue = await db.User.findOne({
        //   where: { id: data.doctorId },
        //   raw: false,
        // });

        // if (userTotalRevenue) {
        //   userTotalRevenue.totalRevenue =
        //     userTotalRevenue.totalRevenue + parseInt(data.totalCost);
        //   await userTotalRevenue.save();
        // }

        //update to totalCost User table
        let userTotalCost = await db.User.findOne({
          where: { id: data.patientId },
          raw: false,
        });
        if (userTotalCost) {
          userTotalCost.totalCost =
            userTotalCost.totalCost + parseInt(data.totalCost);
          await userTotalCost.save();
        }

        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createPackage: createPackage,
  getAllPackage: getAllPackage,
  // getAllDoctors: getAllDoctors,
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
  getBookingPackageById: getBookingPackageById,
  cancelBookingPackage: cancelBookingPackage,
  getListPatientForPackage: getListPatientForPackage,
  confirmBookingPackage: confirmBookingPackage
  // getAllPatientForPackage: getAllPatientForPackage
};
