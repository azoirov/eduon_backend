const Sequelize = require("sequelize");
const { CONNECTION_STRING } = require("../../config");
const UserModel = require("../models/UserModel");
const CategoryModel = require("../models/CategoryModel");
const CommentModel = require("../models/CommentModel");
const LessonModel = require("../models/LessonModel");
const CourseModel = require("../models/CourseModel");
const SessionsModel = require("../models/SessionsModel");

const sequelize = new Sequelize(CONNECTION_STRING, {
  logging: (msg) => console.log("SQL: ", msg),
});

module.exports = main;

async function main() {
  try {
    // Connect

    await sequelize.authenticate();
    console.log("Connected Successfully");

    // Models

    let db = {};

    db.users = await UserModel(Sequelize, sequelize);
    db.categories = await CategoryModel(Sequelize, sequelize);
    db.comments = await CommentModel(Sequelize, sequelize);
    db.courses = await CourseModel(Sequelize, sequelize);
    db.lessons = await LessonModel(Sequelize, sequelize);
    db.sessions = await SessionsModel(Sequelize, sequelize);
    // References

    await db.users.hasMany(db.sessions, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });

    await db.sessions.belongsTo(db.users, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });

    await db.users.hasMany(db.comments, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });

    await db.comments.belongsTo(db.users, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });

    await db.users.hasMany(db.courses, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });

    await db.courses.belongsTo(db.users, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });

    await db.categories.hasMany(db.courses, {
      foreignKey: {
        name: "category_id",
        allowNull: false,
      },
    });

    await db.courses.belongsTo(db.categories, {
      foreignKey: {
        name: "category_id",
        allowNull: false,
      },
    });

    await db.courses.hasMany(db.lessons, {
      foreignKey: {
        name: "course_id",
        allowNull: false,
      },
    });

    await db.lessons.belongsTo(db.courses, {
      foreignKey: {
        name: "course_id",
        allowNull: false,
      },
    });

    // Sync

    // sequelize.sync({ force: true });

    return db;
  } catch (e) {
    console.log(`SQL ERROR: `, e);
  }
}
