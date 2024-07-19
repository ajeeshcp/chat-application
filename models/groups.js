module.exports = (sequelize, Sequelize) => {
  const Groups = sequelize.define('groups', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {  
    tableName: 'groups',
    timestamps: false 
  });
  return Groups;
};
