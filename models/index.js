const users = require('./users');
const comment = require('./comment');
const post = require('./post');

users.hasMany(post, {
  onDelete: 'CASCADE'
});

users.hasMany(comment, {
  onDelete: 'CASCADE'
});

comment.belongsTo(users);

comment.belongsTo(post);

post.belongsTo(users, {
  onDelete: 'CASCADE'
});

post.hasMany(comment, {
  onDelete: 'CASCADE'
});

module.exports = { users, comment, post };
