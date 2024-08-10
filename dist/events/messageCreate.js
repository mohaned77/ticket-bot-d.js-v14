"use strict";
const discord_js_1 = require("discord.js");
const handleChatCommands_1 = require("../handler/util/handleChatCommands");
module.exports = {
  name: discord_js_1.Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;
    await (0, handleChatCommands_1.handleMessageCommands)(message);
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
