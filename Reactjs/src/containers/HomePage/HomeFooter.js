// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
// import './HomeFooter.scss'; // Import the CSS file for styling

// class HomeFooter extends Component {
//   render() {
//     return (
//       <div className="home-footer">
//         <div className="footer-content">
//           <div className="hospital-info">
//             <img
//               src="https://benhvienvietduc.org/wp-content/uploads/2016/12/logo-footer.jpg" // Use the URL of your logo image here
//               alt="Bệnh viện Hữu Nghị Việt Đức"
//               className="hospital-logo"
//             />
//             <div>
//               <h4>CỔNG THÔNG TIN ĐIỆN TỬ BỆNH VIỆN HỮU NGHỊ VIỆT ĐỨC</h4>
//               <p>
//                 Chịu trách nhiệm chính: Ts. Bs Dương Đức Hùng - Giám đốc bệnh viện<br />
//                 Địa chỉ: 40 Tràng Thi, Hoàn Kiếm, Hà Nội<br />
//                 Tel: (84-24) 38.253.531 (84-24) 38.248.308
//                 <p>
//                    &copy; 2016 by VIETDUC HOSPITAL. All rights reserved
//                 </p>
//               </p>
//               {/* <p>
//                 Thiết kế và hỗ trợ kỹ thuật bởi Công ty TNHH Giải Pháp Công Nghệ và Truyền Thông W.G
//               </p> */}
//             </div>
//           </div>
//           {/* <div className="social-media">
//             <a
//               target="_blank"
//               rel="noopener noreferrer"
//               href="https://www.facebook.com/profile.php?id=100064661177411&ref=embed_page"
//             >
//               <img 
//                 src="https://benhvienvietduc.org/wp-content/uploads/2020/06/fb-footer.jpg" // Use the URL of the Facebook badge image here
//                 alt="Bệnh viện Hữu Nghị Việt Đức Facebook Page"
//                 className="facebook-badge"
//               />
//             </a>
//           </div> */}
//         </div>
//         {/* <p>
//           &copy; 2016 by VIETDUC HOSPITAL. All rights reserved
//         </p>
//         <p>
//           <FormattedMessage id="homepage.footer-infor" />
//           <a
//             target="_blank"
//             rel="noopener noreferrer"
//             href="https://www.facebook.com/profile.php?id=100064661177411&ref=embed_page"
//           >
//             &#8594;<FormattedMessage id="homepage.footer-infor-click-here" /> &#8592;
//           </a>
//         </p> */}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.user.isLoggedIn,
//     language: state.app.language,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);


import React, { Component } from "react";
import { connect } from "react-redux";
import './HomeFooter.scss'; // Import the CSS file for styling

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="footer-content">
          <div className="hospital-info">
            <img
              src="https://benhvienvietduc.org/wp-content/uploads/2016/12/logo-footer.jpg" // Use the URL of your logo image here
              alt="Bệnh viện Hữu Nghị Việt Đức"
              className="hospital-logo"
            />
            <div>
              <h4>CỔNG THÔNG TIN ĐIỆN TỬ BỆNH VIỆN HỮU NGHỊ VIỆT ĐỨC</h4>
              <p>
                Chịu trách nhiệm chính: Ts. Bs Dương Đức Hùng - Giám đốc bệnh viện<br />
                Địa chỉ: 40 Tràng Thi, Hoàn Kiếm, Hà Nội<br />
                Tel: (84-24) 38.253.531 (84-24) 38.248.308
              </p>
              <p>
                &copy; 2016 by VIETDUC HOSPITAL. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(HomeFooter);
