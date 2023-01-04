'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments', [
      {
        "name":"SDTNI",
        "createdAt": new Date(),
        "updatedAt" : new Date()
      },
      {
        "name":"BMAQ",
        "createdAt": new Date(),
        "updatedAt" : new Date()
      },
      {
        "name":"SC",
        "createdAt": new Date(),
        "updatedAt" : new Date()
      },
      {
        "name":"SDIS",
        "createdAt": new Date(),
        "updatedAt" : new Date()
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
