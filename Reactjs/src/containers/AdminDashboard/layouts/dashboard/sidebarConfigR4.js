import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfigR4 = [
  {
    title: "Thống kê",
    path: "/admin-dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Quản lý bác sĩ",
    path: "/admin-dashboard/manage-doctor",
    icon: getIcon("openmoji:male-doctor"),
  },
  // {
  //   title: "Quản lý gói khám khám bệnh",
  //   path: "/admin-dashboard/manage-schedule",
  //   icon: getIcon("icon-park:plan"),
  // },
  // {
  //   title: "Lịch gói khám",
  //   path: "/admin-dashboard/manage-schedulepackage",
  //   icon: getIcon("icon-park:plan"),
  // },
  // {
  //   title: "Quản lý phòng khám",
  //   path: "/admin-dashboard/manage-clinic",
  //   icon: getIcon("healthicons:ambulatory-clinic"),
  // },
  {
    title: "Quản lý chuyên khoa",
    path: "/admin-dashboard/manage-specialty",
    icon: getIcon("medical-icon:health-services"),
  },
  {
    title: "Quản lý gói khám",
    path: "/admin-dashboard/manage-package",
    icon: getIcon("fluent:calendar-settings-20-filled"),
  },
  // {
  //   title: "Quản lý thuốc",
  //   path: "/admin-dashboard/manage-drug",
  //   icon: getIcon("mdi:drugs"),
  // },
];

export default sidebarConfigR4;
