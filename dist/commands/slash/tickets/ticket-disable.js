"use strict";
const tslib_1 = require("tslib");
const handler_1 = require("../../../handler");
const discord_js_1 = require("discord.js");
const functions_1 = tslib_1.__importDefault(
  require("../../../database/functions")
);
module.exports = {
  type: handler_1.CommandTypes.SlashCommand,
  register: handler_1.RegisterTypes.Guild,
  data: new discord_js_1.SlashCommandBuilder()
    .setName("ticket-disable")
    .setDescription(
      "use this command to disable the ticket system in your server!"
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(
      discord_js_1.PermissionFlagsBits.Administrator
    ),
  async execute(interaction) {
    const check = await functions_1.default.checkTicketSystem(
      interaction.guild?.id
    );
    if (check) {
      await functions_1.default
        .disableTicketSystem(interaction.guild?.id)
        .then(async () => {
          const embed = new discord_js_1.EmbedBuilder()
            .setColor("Green")
            .setDescription(
              `> ** ✅ Successfully disabled the ticket system. ✅**`
            )
            .setTimestamp();
          await interaction.reply({ embeds: [embed] });
        });
    } else {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `> ** ❌ the ticket system is already disabled in this server! ❌ **`
        )
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
