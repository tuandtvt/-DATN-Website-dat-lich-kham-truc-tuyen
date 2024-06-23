import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfigR1 = [
  {
    title: "Quản lý người dùng",
    path: "/admin-dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Khôi phục tài khoản",
    path: "/admin-dashboard/restore-user",
    icon: getIcon("eva:people-fill"),
  },
];

export default sidebarConfigR1;
