"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketHandling = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class TicketHandling extends sequelize_1.Model {}
exports.TicketHandling = TicketHandling;
TicketHandling.init(
  {
    userId: {
      type: sequelize_1.DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: sequelize_1.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db_1.db,
    freezeTableName: true,
    timestamps: false,
  }
);
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
