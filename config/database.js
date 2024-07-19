process.loadEnvFile();
require('dotenv').config();

const config = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.PASSWORD, {
  host: config.HOST,
  dialect: 'postgres'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.groupMembers = require("../models/groupMembers.js")(sequelize, Sequelize);
db.groups = require("../models/groups.js")(sequelize, Sequelize);
db.individualMessage = require("../models/individualMessage.js")(sequelize, Sequelize);
db.message = require("../models/message.js")(sequelize, Sequelize);
db.user = require("../models/user.js")(sequelize, Sequelize);

module.exports = db;
