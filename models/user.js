module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    password: {
      type: Sequelize.BLOB,
      allowNull: false
    }
  }, {  
    tableName: 'user',
    timestamps: false 
  });
  return User;
};
