const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.getContacts = async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `select distinct  ur.username, ur.id, 0 as isGroup 
                    from "user" u 
                    join individual_message im on im."senderId" = u.id
                    join "user" ur on ur.id = im."recieverId" 
                    where u.id =${userId}
                    union
                    select distinct g."name" , g.id , 1 as isGroup 
                    from "user" u 
                    join group_members gm on gm."userId" = u.id 
                    join "groups" g on g.id = gm."groupId" 
                    where u.id =${userId} ;`;
    const contacts = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });             
    res.status(201).json({data: contacts, message: 'Contacts fetched successfully'});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};
