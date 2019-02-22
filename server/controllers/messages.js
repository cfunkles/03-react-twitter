const _ = require('lodash');
const knex = require('../knex');
const { handleError, INV_REQ } = require('./utilities');

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await knex('messages')
      .join('users', 'messages.user_id', 'users.id')
      .select(['messages.id as message_id','messages.created_at', 'messages.text', 'messages.stars', 'users.handle', 'users.id as user_id']);
    res.data = messages;
    return next();
  } catch (err) {
    return handleError(res, next);
  }
};

const getMessagesByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId || Number.isNaN(userId)) return handleError(res, next, INV_REQ);
    const messages = await knex('messages').where('user_id', userId).select(['id', 'text', 'stars']);
    res.data = messages;
    return next();
  } catch (err) {
    return handleError(res, next);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const { userId, text } = req.body;
    if (!userId || !text) return handleError(res, next, INV_REQ);
    const message = _.head(await knex('messages').insert({ user_id: userId, text }).returning(['id', 'user_id', 'text']));
    res.data = message;
    return next();
  } catch (err) {
    return handleError(res, next);
  }
};

const addStar = async (req, res, next) => {
  try {
    const {messageId} = req.body;
    if (!messageId) return handleError(res, next, INV_REQ);
    const updatedStarCount = await knex('messages').where('id', '=', messageId).increment('stars', 1).returning('stars');
    res.data = updatedStarCount;
    return next();
  } catch (err) {
    return handleError(res, next);
  }
};

module.exports = {
  getAllMessages,
  getMessagesByUser,
  createMessage,
  addStar
};
