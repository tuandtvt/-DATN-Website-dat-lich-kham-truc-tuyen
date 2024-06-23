"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Package.hasMany(models.Doctor_Infor, {
        foreignKey: "doctorId",
        as: "doctorData",
      });
      Package.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "pricePackageTypeData",
      });
      Package.hasMany(models.Schedule,{ as: 'packageData', foreignKey: 'packagesId' });
      Package.hasMany(models.Invoice, {
        foreignKey: "doctorId",
        as: "doctorInvoiceData",
      });
    }
  }
  Package.init(
    {
      descriptionMarkdown: DataTypes.TEXT,
      descriptionHTML: DataTypes.TEXT,
      image: DataTypes.TEXT,
      name: DataTypes.STRING,
      doctorId: DataTypes.JSON,
      priceId: DataTypes.STRING,
      // addressClinic: DataTypes.STRING,
      //timeType: DataTypes.STRING,
      //token: DataTypes.STRING, 
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};
