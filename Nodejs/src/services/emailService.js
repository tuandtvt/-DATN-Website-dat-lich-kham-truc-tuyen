require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bệnh viện Hữu Nghị Việt Đức" <tuandtvt2002@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
  }); 
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
<h3><b>Xin chào ${dataSend.patientName}!</b></h3>
<p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên mywebsite</p>
<p>Thông tin đặt lịch khám bệnh:</p>
<div><b>Thời gian: ${dataSend.time}</b></div>
<div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

<p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để hoàn tất thủ tục đặt lịch khám bệnh.</p>
<div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

<div>Xin chân thành cảm ơn!</div>
`;
  }
  if (dataSend.language === "en") {
    result = `
    <h3><b>Dear ${dataSend.patientName}!</b></h3>
    <p>You received this email because you booked an online medical appointment on website</p>
    <p>Information to schedule an appointment:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    
    <p>If the above information is true, please click on the link below to complete the procedure to book an appointment.</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
    
    <div>Sincerely thank!</div>
    `;
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
<h3><b>Xin chào ${dataSend.patientName}!</b></h3>
<p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website</p>
<p>Thông tin đơn thuốc được gửi trong file đính kèm.</p>
<div>Xin chân thành cảm ơn!</div>
`;
  }
  if (dataSend.language === "en") {
    result = `
    <h3><b>Dear ${dataSend.patientName}!</b></h3>
    <p>You received this email because you booked an online medical appointment on mywebsite</p>
    <p>bla bla</p>
    <div>Sincerely thank!</div>
    `;
  }
  return result;
};
let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Bệnh viện Hữu Nghị Việt Đức" <tuandtvt2002@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            // encoded string as an attachment
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });

      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

let sendForgotPasswordEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bệnh viện Hữu Nghị Việt Đức" <tuandtvt2002@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin lấy lại mật khẩu", // Subject line
    html: getBodyHTMLEmailForgotPassword(dataSend),
  });
};

let getBodyHTMLEmailForgotPassword = (dataSend) => {
  let result = "";
  result = `
<h3><b>Xin chào!</b></h3>
<p>Bạn nhận được email này vì đã yêu cầu lấy lại mật khẩu do quên mật khẩu</p>

<p>Nếu yêu cầu lấy lại mật khẩu là đúng sự thật, vui lòng click vào đường link bên dưới để hoàn tất thủ tục lấy lại mật khẩu.</p>
<div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

<div>Nếu bạn không yêu cầu lấy lại mật khẩu, hãy bỏ qua email này!</div>
<div>Xin chân thành cảm ơn!</div>
`;
  return result;
};

let sendCancellationEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // your email
      pass: process.env.EMAIL_APP_PASSWORD, // your password
    },
  });

  let info = await transporter.sendMail({
    from: '"Bệnh viện hữu nghị Việt Đức" <tuandtvt2002@example.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông báo hủy lịch khám bệnh", // Subject line
    html: getBodyHTMLEmailCancellation(dataSend), // html body
  });
};

let getBodyHTMLEmailCancellation = (dataSend) => {
  return `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì lịch khám bệnh của bạn đã được hủy.</p>
    <p>Chi tiết lịch hủy:</p>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <div><b>Lý do hủy: ${dataSend.reason}</b></div>
    <p>Nếu cần thêm thông tin, xin vui lòng liên hệ với chúng tôi.</p>
    <p>Xin lỗi vì bất kỳ sự bất tiện nào!</p>
  `;
};
// let getBodyHTMLEmailCancellation = (dataSend) => {
//   let result = "";
//   if (dataSend.language === "vi") {
//     result = `
// <h3><b>Xin chào ${dataSend.patientName}!</b></h3>
// <p>Bạn nhận được email này vì lịch khám bệnh của bạn đã được hủy.</p>
// <p>Thông tin lịch khám đã hủy:</p>
// <div><b>Thời gian: ${dataSend.time}</b></div>
// <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
// <div><b>Lý do hủy: ${dataSend.reason}</b></div>

// <p>Nếu bạn cần thông tin thêm, vui lòng liên hệ với chúng tôi.</p>
// <div>Xin chân thành cảm ơn và xin lỗi vì sự bất tiện này!</div>
// `;
//   } else { // Assuming you might need an English version as well
//     result = `
//     <h3><b>Dear ${dataSend.patientName}!</b></h3>
//     <p>You have received this email because your medical appointment has been canceled.</p>
//     <p>Canceled appointment details:</p>
//     <div><b>Time: ${dataSend.time}</b></div>
//     <div><b>Doctor: ${dataSend.doctorName}</b></div>
//     <div><b>Reason for cancellation: ${dataSend.reason}</b></div>
    
//     <p>If you need further information, please contact us.</p>
//     <div>We sincerely apologize for any inconvenience this may have caused!</div>
//     `;
//   }
//   return result;
// };

let sendVerificationEmail = async (dataSend) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_APP, // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
      },
    });

    let mailOptions = {
      from: `"Bệnh viện Hữu Nghị Việt Đức" <${process.env.EMAIL_APP}>`, // Địa chỉ người gửi
      to: dataSend.receiverEmail, // Danh sách người nhận
      subject: 'Email Verification', // Tiêu đề email
      html: `
        <p>Xin chào,</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản. Để hoàn tất quá trình đăng ký, vui lòng xác nhận địa chỉ email của bạn bằng cách nhấn vào liên kết bên dưới:</p>
        <p><a href="${dataSend.redirectLink}">Xác nhận địa chỉ email</a></p>
        <p>Nếu bạn không thực hiện yêu cầu này, bạn có thể bỏ qua email này.</p>
        <p>Xin cảm ơn!</p>
        <p>Trân trọng,</p>
        <p>Bệnh viện Hữu Nghị Việt Đức</p>
      ` // Nội dung HTML của email
    };

    let info = await transporter.sendMail(mailOptions);
    // console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
  sendForgotPasswordEmail: sendForgotPasswordEmail,
  sendCancellationEmail: sendCancellationEmail,
  sendVerificationEmail: sendVerificationEmail,
};



