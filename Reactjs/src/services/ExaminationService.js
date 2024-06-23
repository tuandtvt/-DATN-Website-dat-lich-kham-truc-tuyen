import axios from "../axios";

const filterExaminationPackages = (data) => {
    return axios.post("/api/filter-examination-packages", data);
};

const updateExaminationPackageData = (data) => {
    return axios.post("/api/edit-examination-package", data);
};

const getDetailExaminationPackageById = (data) => {
    return axios.get(
      `/api/get-detail-examination-package-by-id?id=${data.id}&location=ALL`
    );
};

const deleteExaminationPackage = (data) => {
  return axios.get(
    `/api/delete-examination-package?id=${data.id}`
  );
};

export {
    filterExaminationPackages,
    updateExaminationPackageData,
    getDetailExaminationPackageById,
    deleteExaminationPackage
};
