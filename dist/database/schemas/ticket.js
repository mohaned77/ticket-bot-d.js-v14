"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class Ticket extends sequelize_1.Model {}
exports.Ticket = Ticket;
Ticket.init(
  {
    channelId: {
      type: sequelize_1.DataTypes.STRING,
      primaryKey: true,
    },
    createdBy: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    claimedBy: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: true,
    },
    closedBy: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db_1.db,
    tableName: "ticket",
    freezeTableName: true,
    timestamps: false,
  }
);
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
