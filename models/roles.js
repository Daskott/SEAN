module.exports = function(sequelize, DataTypes) {

  //sequelize.define('name', {attributes}, {options}).
  var Role = sequelize.define('Roles', {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      freezeTableName: true // Model tableName will be the same as the model name
  });

  return Role;
};
