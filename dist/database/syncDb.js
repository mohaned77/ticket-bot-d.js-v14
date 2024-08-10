"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDb = void 0;
const db_1 = require("./db");
const blacklist_1 = require("./schemas/blacklist");
const ticket_1 = require("./schemas/ticket");
const ticket_handling_1 = require("./schemas/ticket-handling");
const ticket_setup_1 = require("./schemas/ticket-setup");
const syncDb = async () => {
  try {
    await db_1.db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  db_1.db.sync();
  ticket_setup_1.TicketSetup.sync();
  blacklist_1.Blacklist.sync();
  ticket_1.Ticket.sync();
  ticket_handling_1.TicketHandling.sync();
};
exports.syncDb = syncDb;
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
