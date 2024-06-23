import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ExaminationPackage.scss";
import { getAllExaminationPackages } from "../../../services/ExaminationService";
import { withRouter } from "react-router";

const ExaminationPackage = ({ language }) => {
  const [examinationPackages, setExaminationPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllExaminationPackages({ limit: 4 });
        if (response && response.errCode === 0) {
          setExaminationPackages(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleViewDetailPackage = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-package/${item.id}`);
    }
  };

  const handleClickSeeMorePackages = () => {
    this.props.history.push(`/list-packages`);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="section-share section-examination-package">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.examination-packages" />
              </span>
              <button
                className="btn-section"
                onClick={handleClickSeeMorePackages}
              >
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </div>
            <div className="row">
              {examinationPackages.map((item, index) => (
                <div className="col-lg-3 col-auto my-10" key={index}>
                  <div
                    className="card-bs-custom pointer"
                    onClick={() => handleViewDetailPackage(item)}
                  >
                    <figure
                      className="bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></figure>
                    <div className="card-body">
                      <h3 className="mb-5 font-weight-normal pointer package-name fs-15">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.app.language,
});

export default withRouter(connect(mapStateToProps)(ExaminationPackage));
