import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfigR5 = [
    {
        title: "Quản lý gói khám khám bệnh",
        path: "/admin-dashboard/manage-schedule",
        icon: getIcon("icon-park:plan"),
      },
      {
        title: "Lịch gói khám",
        path: "/admin-dashboard/manage-schedulepackage",
        icon: getIcon("icon-park:plan"),
      },
];

export default sidebarConfigR5;
