import { Navigate, useRoutes } from "react-router-domv6";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import UserRedux from "../../containers/System/Admin/UserRedux";
import CreateUser from "../../containers/System/Admin/User/resources/CreateUser";
import EditUser from "../../containers/System/Admin/User/resources/EditUser";
import Drug from "../../containers/System/Admin/Drug/Drug";
import EditDrug from "../../containers/System/Admin/Drug/resources/EditDrug";
import CreateDrug from "../../containers/System/Admin/Drug/resources/CreateDrug";

import ManageDoctor from "../../containers/System/Admin/ManageDoctor";
import EditDoctor from "../../containers/System/Admin/Doctor/resources/EditDoctor";

import ManageSchedule from "../../containers/System/Doctor/ManageSchedule";
import ManageScheduleOneDoctor from "../../containers/System/Doctor/ManageScheduleOneDoctor";

import ManageClinic from "../../containers/System/Clinic/ManageClinic";
import CreateClinic from "../../containers/System/Clinic/resources/CreateClinic";
import EditClinic from "../../containers/System/Clinic/resources/EditClinic";

import ManageSpecialty from "../../containers/System/Specialty/ManageSpecialty";
import CreateSpecialty from "../../containers/System/Specialty/resources/CreateSpecialty";
import EditSpecialty from "../../containers/System/Specialty/resources/EditSpecialty";

import ManagePackage from "../../containers/System/Package/ManagePackage";
import CreatePackage from "../../containers/System/Package/resources/CreatePackage";
import EditPackage from "../../containers/System/Package/resources/EditPackage";
import ManageSchedulePackage from "../../containers/System/Package/resources/ManageSchedulePackage";

import ManagePatient from "../../containers/System/Doctor/ManagePatient";
import CreateRemedy from "../../containers/System/Doctor/CreateRemedy";

import RestoreUser from "../../containers/System/Admin/RestoreUser/RestoreUser";

import { useDispatch, useSelector } from "react-redux";

// // ----------------------------------------------------------------------

// export default function Router() {
//   const { isLoggedIn, userInfo, language } = useSelector((state) => ({
//     isLoggedIn: state.user.isLoggedIn,
//     userInfo: state.user.userInfo,
//     language: state.app.language,
//   }));

//   return useRoutes([
//     {
//       path: "/admin-dashboard",
//       element: <DashboardLayout />,
//       children: [
//         { path: "app", element: <DashboardApp /> },
//         { path: "user", element: <UserRedux /> }, //quan ly user
//         { path: "user/create", element: <CreateUser /> }, //create user
//         { path: "user/edit/:userId", element: <EditUser /> }, //edit user

//         { path: "restore-user", element: <RestoreUser /> }, //quan ly user

//         { path: "manage-doctor", element: <ManageDoctor /> }, //quan ly bac si
//         { path: "manage-doctor/edit/:doctorId", element: <EditDoctor /> }, //quan ly bac si

//         { path: "manage-schedule", element: <ManageSchedule /> }, //quan ly ke hoach kham benh bac si

//         { path: "manage-clinic", element: <ManageClinic /> }, //quan ly phong kham
//         { path: "manage-clinic/create", element: <CreateClinic /> }, //quan ly phong kham
//         { path: "manage-clinic/edit/:clinicId", element: <EditClinic /> }, //quan ly phong kham


//         { path: "manage-specialty", element: <ManageSpecialty /> }, //quan ly chuyen khoa
//         { path: "manage-specialty/create", element: <CreateSpecialty /> }, //quan ly phong kham
//         { path: "manage-specialty/edit/:specialtyId", element: <EditSpecialty /> }, //quan ly phong kham

//         { path: "manage-package", element: <ManagePackage /> }, // Quản lý gói khám
//         { path: "manage-package/create", element: <CreatePackage /> }, // Tạo mới gói khám
//         { path: "manage-package/edit/:packagesId", element: <EditPackage /> }, // Chỉnh sửa thông tin gói khám
        

//         { path: "manage-drug", element: <Drug /> }, //quan ly thuoc
//         { path: "manage-drug/create", element: <CreateDrug /> }, //create thuoc
//         { path: "manage-drug/edit/:drugId", element: <EditDrug /> }, //edit thuoc
//         { path: "", element: <Navigate to={userInfo.roleId=="R1" ? "/admin-dashboard/app" : "/admin-dashboard/doctor"} replace={true}/> }
//         // { path: "products", element: <Products /> },
//         // { path: "blog", element: <Blog /> },
//       ],
//     },
//     {
//       path: "/admin-dashboard/doctor",
//       element: <DashboardLayout />,
//       children: [
//         { path: "manage-patient", element: <ManagePatient /> }, //quan ly benh nhan
//         { path: "manage-patient/:bookingId", element: <CreateRemedy /> }, //tao don thuoc
//         {
//           path: "manage-schedule-doctor",
//           element: <ManageScheduleOneDoctor />,
//         }, //quan ly ke hoach kham benh chi rieng mot bac si do
//         { path: "", element: <Navigate to="/admin-dashboard/doctor/manage-patient" replace={true}/> }
//       ],
//     },
//     // {
//     //   path: "/",
//     //   element: <LogoOnlyLayout />,
//     //   children: [
//     //     { path: "/", element: <Navigate to="/admin-dashboard/app" /> },
//     //     { path: "admin-dashboard/login", element: <Login /> },
//     //     { path: "admin-dashboard/register", element: <Register /> },
//     //     { path: "admin-dashboard/404", element: <NotFound /> },
//     //     { path: "*", element: <Navigate to="/404" /> },
//     //   ],
//     // },
//     // { path: "*", element: <Navigate to="admin-dashboard/404" replace /> },
//   ]);
// }


// import { Navigate, useRoutes } from "react-router-dom";
// // layouts
// import DashboardLayout from "./layouts/dashboard";
// import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
// //
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import DashboardApp from "./pages/DashboardApp";
// import Products from "./pages/Products";
// import Blog from "./pages/Blog";
// import User from "./pages/User";
// import NotFound from "./pages/Page404";
// import UserRedux from "../../containers/System/Admin/UserRedux";
// import CreateUser from "../../containers/System/Admin/User/resources/CreateUser";
// import EditUser from "../../containers/System/Admin/User/resources/EditUser";
// import Drug from "../../containers/System/Admin/Drug/Drug";
// import EditDrug from "../../containers/System/Admin/Drug/resources/EditDrug";
// import CreateDrug from "../../containers/System/Admin/Drug/resources/CreateDrug";

// import ManageDoctor from "../../containers/System/Admin/ManageDoctor";
// import EditDoctor from "../../containers/System/Admin/Doctor/resources/EditDoctor";

// import ManageSchedule from "../../containers/System/Doctor/ManageSchedule";
// import ManageScheduleOneDoctor from "../../containers/System/Doctor/ManageScheduleOneDoctor";

// import ManageClinic from "../../containers/System/Clinic/ManageClinic";
// import CreateClinic from "../../containers/System/Clinic/resources/CreateClinic";
// import EditClinic from "../../containers/System/Clinic/resources/EditClinic";

// import ManageSpecialty from "../../containers/System/Specialty/ManageSpecialty";
// import CreateSpecialty from "../../containers/System/Specialty/resources/CreateSpecialty";
// import EditSpecialty from "../../containers/System/Specialty/resources/EditSpecialty";

// import ManagePackage from "../../containers/System/Package/ManagePackage";
// import CreatePackage from "../../containers/System/Package/resources/CreatePackage";
// import EditPackage from "../../containers/System/Package/resources/EditPackage";

// import ManagePatient from "../../containers/System/Doctor/ManagePatient";
// import CreateRemedy from "../../containers/System/Doctor/CreateRemedy";

// import RestoreUser from "../../containers/System/Admin/RestoreUser/RestoreUser";

// import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function Router() {
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  return useRoutes([
    {
      path: "/admin-dashboard",
      element: <DashboardLayout />,
      children: [
        // R1: Admin
        userInfo.roleId === "R1" && { path: "user", element: <UserRedux /> }, // Quản lý người dùng
        userInfo.roleId === "R1" && { path: "user/create", element: <CreateUser /> }, // Tạo người dùng
        userInfo.roleId === "R1" && { path: "user/edit/:userId", element: <EditUser /> }, // Chỉnh sửa người dùng
        userInfo.roleId === "R1" && { path: "restore-user", element: <RestoreUser /> }, // Khôi phục người dùng

        // R4: Manager
        userInfo.roleId === "R4" && { path: "app", element: <DashboardApp /> },
        userInfo.roleId === "R4" && { path: "manage-doctor", element: <ManageDoctor /> }, // Quản lý bác sĩ
        userInfo.roleId === "R4" && { path: "manage-doctor/edit/:doctorId", element: <EditDoctor /> }, // Chỉnh sửa bác sĩ
        // userInfo.roleId === "R4" && { path: "manage-schedule", element: <ManageSchedule /> }, // Quản lý kế hoạch khám bệnh bác sĩ
        // userInfo.roleId === "R4" && { path: "manage-schedulepackage", element: <ManageSchedulePackage/>},
        userInfo.roleId === "R4" && { path: "manage-clinic", element: <ManageClinic /> }, // Quản lý phòng khám
        userInfo.roleId === "R4" && { path: "manage-clinic/create", element: <CreateClinic /> }, // Tạo phòng khám
        userInfo.roleId === "R4" && { path: "manage-clinic/edit/:clinicId", element: <EditClinic /> }, // Chỉnh sửa phòng khám
        userInfo.roleId === "R4" && { path: "manage-specialty", element: <ManageSpecialty /> }, // Quản lý chuyên khoa
        userInfo.roleId === "R4" && { path: "manage-specialty/create", element: <CreateSpecialty /> }, // Tạo chuyên khoa
        userInfo.roleId === "R4" && { path: "manage-specialty/edit/:specialtyId", element: <EditSpecialty /> }, // Chỉnh sửa chuyên khoa
        userInfo.roleId === "R4" && { path: "manage-package", element: <ManagePackage /> }, // Quản lý gói khám
        userInfo.roleId === "R4" && { path: "manage-package/create", element: <CreatePackage /> }, // Tạo gói khám
        userInfo.roleId === "R4" && { path: "manage-package/edit/:packagesId", element: <EditPackage /> }, // Chỉnh sửa gói khám
        userInfo.roleId === "R4" && { path: "manage-drug", element: <Drug /> }, // Quản lý thuốc
        userInfo.roleId === "R4" && { path: "manage-drug/create", element: <CreateDrug /> }, // Tạo thuốc
        userInfo.roleId === "R4" && { path: "manage-drug/edit/:drugId", element: <EditDrug /> }, // Chỉnh sửa thuốc


        userInfo.roleId === "R5" && { path: "manage-schedule", element: <ManageSchedule /> }, // Quản lý kế hoạch khám bệnh bác sĩ
        userInfo.roleId === "R5" && { path: "manage-schedulepackage", element: <ManageSchedulePackage/>},
        // Điều hướng mặc định
        {
          path: "",
          element: (
            <Navigate
              to={
                userInfo.roleId === "R1"
                  ? "/admin-dashboard/user"
                  : userInfo.roleId === "R2"
                  ? "/admin-dashboard/doctor/manage-patient"
                  : userInfo.roleId === "R4"
                  ? "/admin-dashboard/app"
                  : "/"
              }
              replace={true}
            />
          ),
        },
      ].filter(Boolean), // Lọc bỏ các giá trị null hoặc undefined
    },
    {
      path: "/admin-dashboard/doctor",
      element: <DashboardLayout />,
      children: [
        userInfo.roleId === "R2" && { path: "manage-patient", element: <ManagePatient /> }, // Quản lý bệnh nhân
        userInfo.roleId === "R2" && { path: "manage-patient/:bookingId", element: <CreateRemedy /> }, // Tạo đơn thuốc
        userInfo.roleId === "R2" && { path: "manage-schedule-doctor", element: <ManageScheduleOneDoctor /> }, // Quản lý kế hoạch khám bệnh riêng của bác sĩ
        { path: "", element: <Navigate to="/admin-dashboard/doctor/manage-patient" replace={true}/> }
      ].filter(Boolean),
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/admin-dashboard/app" /> },
        { path: "admin-dashboard/login", element: <Login /> },
        { path: "admin-dashboard/register", element: <Register /> },
        { path: "admin-dashboard/404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/admin-dashboard/404" replace /> },
  ]);
}
