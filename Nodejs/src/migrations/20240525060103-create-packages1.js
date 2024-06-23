'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('packages1', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descriptionHTML: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      name: {
        type: Sequelize.STRING(255)
      },
      addressClinic: {  // Thêm cột address
        type: Sequelize.STRING(255)
      },
      doctorId: {  // Thêm cột price
        type: Sequelize.JSON
      },
      priceId: {  // Thêm cột price
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('packages1');
  }
};