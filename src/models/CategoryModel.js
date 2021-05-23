module.exports = async (Sequelize, sequelize) => {
  return sequelize.define("category", {
    category_id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4(),
      primaryKey: true,
    },
    category_name: {
      type: Sequelize.DataTypes.STRING(32),
      allowNull: false,
    },
  });
};
