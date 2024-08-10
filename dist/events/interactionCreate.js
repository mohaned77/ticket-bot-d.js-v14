"use strict";
const discord_js_1 = require("discord.js");
const handleComponents_1 = require("../handler/util/handleComponents");
const handleInteractionCommands_1 = require("../handler/util/handleInteractionCommands");
module.exports = {
  name: discord_js_1.Events.InteractionCreate,
  async execute(interaction) {
    if (
      interaction.isCommand() ||
      interaction.isContextMenuCommand() ||
      interaction.isAutocomplete()
    )
      await (0, handleInteractionCommands_1.handleInteractionCommands)(
        interaction
      );
    else if (
      interaction.isButton() ||
      interaction.isAnySelectMenu() ||
      interaction.isModalSubmit()
    )
      await (0, handleComponents_1.handleComponents)(interaction);
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
