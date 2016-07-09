'use strict';
var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      //Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */

    var user = {
          roleId: 1,
          name: "User",
          description:  "can veiw",
          createdAt: date,
          updatedAt: date
    };

    var admin = {
          roleId: 0,
          name: "Admin",
          description:  "can veiw, can delete",
          createdAt: date,
          updatedAt: date
    };

    //clear any record if any, and add it again
    queryInterface.bulkDelete('Roles', null, {});
    return queryInterface.bulkInsert('Roles', [admin, user], {});

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
