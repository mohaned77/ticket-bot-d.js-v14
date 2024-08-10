"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSetup = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class TicketSetup extends sequelize_1.Model {}
exports.TicketSetup = TicketSetup;
TicketSetup.init(
  {
    serverId: {
      type: sequelize_1.DataTypes.STRING,
      primaryKey: true,
    },
    channel: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    staffRole: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    logChannel: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: sequelize_1.DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db_1.db,
    tableName: "ticketSetup",
    freezeTableName: true,
    timestamps: false,
  }
);
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
