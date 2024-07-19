module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define('message', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {  
    tableName: 'message',
    timestamps: false 
  });
  return Message;
};
