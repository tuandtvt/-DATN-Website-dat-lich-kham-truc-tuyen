import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfigR5 = [
      {
        title: "Quản lý đặt hẹn gói khám",
        path: "/admin-dashboard/manage-schedulepackage",
        icon: getIcon("healthicons:i-schedule-school-date-time"),
      },
      {
        title: "Tạo lịch gói khám",
        path: "/admin-dashboard/manage-schedule",
        icon: getIcon("medical-icon:i-inpatient"),
      },
];

export default sidebarConfigR5;
