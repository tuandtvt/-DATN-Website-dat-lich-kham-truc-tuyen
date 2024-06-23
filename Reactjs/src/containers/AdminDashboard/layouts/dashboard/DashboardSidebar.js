import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// mocks_
import account from "../../_mocks_/account";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import NavSection from "../../components/NavSection";

import sidebarConfigR1 from "./sidebarConfigR1";
import sidebarConfigR4 from "./sidebarConfigR4";
import sidebarConfigR2 from "./sidebarConfigR2";
import sidebarConfigR5 from "./sidebarConfigR5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  const [userInfoState, setUserInfoState] = useState({});
  const [imageBase64State, setImageBase64State] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setUserInfoState(userInfo);
    let imageBase64 = "";
    if (userInfo && userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, "base64").toString("binary");
      setImageBase64State(imageBase64);
    }

    //name
    let nameCopy = "";
    if (userInfo && userInfo.lastName && userInfo.firstName) {
      nameCopy = `${userInfo.lastName} ${userInfo.firstName}`;
      setName(nameCopy);
    }
    if (userInfo && userInfo.lastName && userInfo.firstName === null) {
      nameCopy = `${userInfo.lastName}`;
      setName(nameCopy);
    }
    if (userInfo && userInfo.lastName === null && userInfo.firstName) {
      nameCopy = `${userInfo.firstName}`;
      setName(nameCopy);
    }

    //role
    if (userInfo && userInfo.roleId === "R1") {
      setRole("ADMIN");
    } else if (userInfo && userInfo.roleId === "R4") {
      setRole("MANAGER");
    } else if (userInfo && userInfo.roleId === "R2") {
      setRole("DOCTOR");
    } else if (userInfo && userInfo.roleId === "R5") {
      setRole("CSKH");  
    } else {
      setRole("");
    }
  }, [userInfo]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname, isOpenSidebar, onCloseSidebar]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar
              src={imageBase64State ? imageBase64State : account.photoURL}
              alt="photoURL"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {role === "ADMIN" && language === "vi" ? "QUẢN TRỊ VIÊN" : ""}
                {role === "MANAGER" && language === "vi" ? "QUẢN LÝ" : ""}
                {role === "DOCTOR" && language === "vi" ? "BÁC SĨ" : ""}
                {role === "CSKS" && language === "vi" ? "CHĂM SÓC KHÁCH HÀNG" : ""}
                {role === "ADMIN" && language === "en" ? "ADMIN" : ""}
                {role === "MANAGER" && language === "en" ? "MANAGER" : ""}
                {role === "DOCTOR" && language === "en" ? "DOCTOR" : ""}
                {role === "CSKS" && language === "en" ? "CSKH" : ""}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      {/* sidebar based on role */}
      {role === "ADMIN" && <NavSection navConfig={sidebarConfigR1} />}
      {role === "MANAGER" && <NavSection navConfig={sidebarConfigR4} />}
      {role === "DOCTOR" && <NavSection navConfig={sidebarConfigR2} />}
      {role === "CSKH" && <NavSection navConfig={sidebarConfigR5} />}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
