module.exports = async (Sequelize, sequelize) => {
  return sequelize.define("comment", {
    comment_id: {
      type: Sequelize.DataTypes.UUID,
      primarykey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4(),
    },
    star: {
      type: Sequelize.DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
