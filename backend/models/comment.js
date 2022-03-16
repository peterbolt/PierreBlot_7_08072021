"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: "postOwnerId",
        as: "post",
      });
      this.belongsTo(models.User, {
        foreignKey: "commenterId",
        as: "user",
      });
    }
  }
  Comment.init(
    {
      commenterId: { type: DataTypes.INTEGER, allowNull: false },
      commenterPseudo: { type: DataTypes.STRING, allowNull: false },
      postOwnerId: { type: DataTypes.INTEGER, allowNull: false },
      text: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comment",
    }
  );
  return Comment;
};
