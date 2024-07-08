import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfigR2 = [
  {
    title: "Tạo lịch làm việc",
    path: "/admin-dashboard/doctor/manage-schedule-doctor",
    icon: getIcon("healthicons:i-schedule-school-date-time"),
  },
  {
    title: "Quản lý đặt hẹn bác sĩ",
    path: "/admin-dashboard/doctor/manage-patient",
    icon: getIcon("medical-icon:i-inpatient"),
  },
];

export default sidebarConfigR2;
