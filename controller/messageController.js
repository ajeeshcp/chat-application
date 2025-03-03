const { Op } = require('sequelize');
const { message:Message, individualMessage:IndividualMessage, groupMembers:GroupMembership, groups:Group } = require('../config/database');

exports.getMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const user = await GroupMembership.findOne({ where: { groupId, userId: req.user.id } });
    const group = await Group.findOne({ where: { id: groupId } })
    if (!user || !group) {
      return res.status(403).json({ error: 'You are not allowed to see this group message' });
    }
    const messages = await Message.findAll({ where: { groupId }, order: [['createdAt', 'ASC']] });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

exports.getIndividualMessages = async (req, res) => {
  const { userId } = req.params;
  const loggedInUserId = req.user?.id;
  try {
    if (!loggedInUserId) {
      return res.status(403);
    }
    const messages = await IndividualMessage.findAll({
      where: {
        [Op.or]: [
          { senderId: loggedInUserId, recieverId: userId },
          { senderId: userId, recieverId: loggedInUserId }
        ]
      },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to retrieve individual messages' });
  }
};
