import axios from "../axios";

const filterPackage = (data) => {
    return axios.post("/api/filter-package", data);
};

const udatePackageData = (data) => {
    return axios.post("/api/edit-package", data);
};

const getDetailPackageById = (data) => {
    return axios.get(
      `/api/get-detail-package-by-id?id=${data.id}&location=ALL`
    );
};

const getAllDoctors = (data) => {
  return axios.post("/api/get-all-doctors", data);
};

const deletePackage = (data) => {
  return axios.get(
    `/api/delete-package?id=${data.id}`
  );
};


export {
    filterPackage,
    udatePackageData,
    getDetailPackageById,
    getAllDoctors,
    deletePackage
};
