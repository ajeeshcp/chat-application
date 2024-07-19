const { groups:Group, groupMembers:GroupMembership, user:User,  } = require('../config/database');

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    const group = await Group.create({ name, createdBy: userId });
    await GroupMembership.create({ userId: userId, groupId: group.id, isAdmin: true });
    res.status(201).json({data: group, message: 'Group created successfully'});
  } catch (err) {
    res.status(500).json({ error: 'Failed to create group' });
  }
};

exports.addMember = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const group = await Group.findByPk(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    const isAdmin = await GroupMembership.findOne({ where: { groupId: groupId, userId: req.user.id, isAdmin: true } });
    if (!isAdmin) return res.status(403).json({ error: 'Only admins can add members' });

    const userExistInGroup = await GroupMembership.findOne({ where: { groupId, userId } });
    if (userExistInGroup) {
        return res.status(403).json({ error: 'The user is already exits in the group' });
    }
    await GroupMembership.create({ userId, groupId, isAdmin: false });
    res.status(201).json({ message: 'Member added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add member' });
  }
};

exports.removeMember = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const group = await Group.findByPk(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    const userExistInGroup = await GroupMembership.findOne({ where: { groupId, userId } });
    if (!userExistInGroup) return res.status(403).json({ error: 'The user is not exits in the group' });

    const isAdmin = await GroupMembership.findOne({ where: { groupId, userId: req.user.id, isAdmin: true } });
    if (!isAdmin) return res.status(403).json({ error: 'Only admins can remove members' });

    await GroupMembership.destroy({ where: { userId, groupId } });
    res.status(200).json({ message: 'Member removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove member' });
  }
};
