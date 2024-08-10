"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blacklist = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class Blacklist extends sequelize_1.Model {}
exports.Blacklist = Blacklist;
Blacklist.init(
  {
    userId: {
      type: sequelize_1.DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: sequelize_1.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db_1.db,
    tableName: "blacklist",
    freezeTableName: true,
    timestamps: false,
  }
);
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
