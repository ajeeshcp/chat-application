module.exports = (sequelize, Sequelize) => {
  const groupMembers = sequelize.define('group_members', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
  }, {  
    tableName: 'group_members',
    timestamps: false 
  });
  return groupMembers;
};
