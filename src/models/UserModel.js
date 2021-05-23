module.exports = async (Sequelize, sequelize) => {
  return sequelize.define("users", {
    user_id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4(),
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(32),
      allowNull: false,
    },
    age: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING(64),
      allowNull: false,
    },
  });
};
