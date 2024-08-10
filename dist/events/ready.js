"use strict";
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("../handler/util/Logger"));
const discord_js_1 = require("discord.js");
const handler_1 = require("../handler");
module.exports = {
  name: discord_js_1.Events.ClientReady,
  once: true,
  async execute(client) {
    if (!client.user) return;
    client.user.setStatus(handler_1.UserStatus.Dnd);
    client.user.setActivity("Ticket System", {
      type: discord_js_1.ActivityType.Watching,
    });
    Logger_1.default.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
