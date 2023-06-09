const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class comment extends Model {}

comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'comment',
});

module.exports = comment;
