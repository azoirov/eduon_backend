module.exports = async (Sequelize, sequelize) => {
  return sequelize.define("lesson", {
    lesson_id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4(),
      primaryKey: true,
    },
    lesson_theme: {
      type: Sequelize.DataTypes.STRING(32),
      allowNull: false,
    },
    views: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
    },
  });
};
