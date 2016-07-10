module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

  return User;
};
