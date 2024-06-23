import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { emitter } from "../../utils/emitter";
import { useState, useEffect } from "react";
import { getAllDoctors } from "../../services/userService"; // Thay đổi service tương ứng nếu cần

var options = [];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  menuDoctor: {
    position: "absolute !important",
    top: "270px !important",
    left: "550px !important",
  },
  titleHeader: {
    fontWeight: "600 !important",
    backgroundColor: "#ebebeb !important",
    marginTop: "-7px !important",
  },
}));

const HomeMenuSearchDoctor = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataDoctors, setDataDoctors] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDataGetAllDoctors = async () => {
      if (dataDoctors.length !== 0) return;
      let res = await getAllDoctors({}); // Sử dụng hàm lấy dữ liệu bác sĩ tương ứng
      if (res && res.errCode === 0) {
        let data = res.data ? res.data : [];
        setDataDoctors(data);
      }
    };
    fetchDataGetAllDoctors();
  }, []);

  const makeArrayDoctorOptions = () => {
    options = [];
    dataDoctors.map((item) => options.push(item.name)); // Thay đổi key tương ứng trong dữ liệu nếu cần
  };

  useEffect(() => {
    setOpen(props.showMenuSearchDoctor);
  }, [props.showMenuSearchDoctor]);

  const findIdDoctorByName = (itemName) => {
    let item = dataDoctors.find((element) => element.name === itemName);
    return item.id;
  };

  const handleViewDetail = (itemName) => (event) => {
    let id = findIdDoctorByName(itemName);
    if (history) {
      history.push(`/detail-doctor/${id}`); // Thay đổi đường dẫn tương ứng nếu cần
    }
    setOpen(false);
  };

  makeArrayDoctorOptions();
  return (
    <Menu
      id="long-menu"
      keepMounted
      open={open}
      onClose={handleClose}
      anchorReference="none"
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 7,
          width: "58ch",
        },
      }}
      className={classes.menuDoctor}
    >
      <MenuItem key={"doctor"} className={classes.titleHeader}>
        Bác sĩ
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} onClick={handleViewDetail(option)}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default HomeMenuSearchDoctor;
