module.exports = async (Sequelize, sequelize) => {
  return sequelize.define("course", {
    user_id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4(),
      primaryKey: true,
    },
    course_title: {
      type: Sequelize.DataTypes.STRING(512),
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
  });
};
