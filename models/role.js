module.exports = function(sequelize, DataTypes) {

  //sequelize.define('name', {attributes}, {options}).
  var Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      unique: true,
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
