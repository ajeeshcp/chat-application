module.exports = (sequelize, Sequelize) => {
  const individualMessage = sequelize.define('individual_message', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    senderId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    recieverId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {  
    tableName: 'individual_message',
    timestamps: false 
  });
  return individualMessage;
};
