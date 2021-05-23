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

    db.users.hasMany(db.sessions, {
      foreign_key: "user_id",
      allowNull: false,
    });

    db.sessions.belongsTo(db.users, {
      foreign_key: "user_id",
      allowNull: false,
    });

    db.users.hasMany(db.comments, {
      foreign_key: "user_id",
      allowNull: false,
    });

    db.comments.belongsTo(db.users, {
      foreign_key: "user_id",
      allowNull: false,
    });

    db.users.hasMany(db.courses, {
      foreign_key: "user_id",
      allowNull: false,
    });

    db.courses.belongsTo(db.users, {
      foreign_key: "user_id",
      allowNull: false,
    });

    db.categories.hasMany(db.courses, {
      foreign_key: "category_id",
      allowNull: false,
    });

    db.courses.belongsTo(db.categories, {
      foreign_key: "category_id",
      allowNull: false,
    });

    db.courses.hasMany(db.lessons, {
      foreign_key: "course_id",
      allowNull: false,
    });

    db.lessons.belongsTo(db.courses, {
      foreign_key: "course_id",
      allowNull: false,
    });

    // Sync

    sequelize.sync({ force: false });

    return db;
  } catch (e) {
    console.log(`SQL ERROR: `, e);
  }
}
