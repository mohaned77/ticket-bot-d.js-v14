"use strict";
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const handler_1 = require("../../handler");
const functions_1 = tslib_1.__importDefault(
  require("../../database/functions")
);
module.exports = {
  id: "claim",
  type: handler_1.ComponentTypes.Button,
  async execute(interaction) {
    const data = await functions_1.default.getAllData(interaction.guild?.id);
    const staffRoleId = data[0].staffRole;
    const staffRole = interaction.guild?.roles.cache.get(staffRoleId);
    const interactionUserId = interaction.user.id;
    const interactionUser =
      interaction.guild?.members.cache.get(interactionUserId);
    if (!interactionUser?.roles.cache.has(staffRoleId)) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(
          `> ** ❌ only users who have ${staffRole} role can claim the tickets ! ❌ **`
        )
        .setTimestamp();
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    await functions_1.default.setClaimedBy(
      interaction.channel?.id,
      interaction.user.id
    );
    const embed = new discord_js_1.EmbedBuilder()
      .setColor(0x00ff00)
      .setDescription(`> ** ✅ ${interaction.user} claimed the ticket ✅ **`)
      .setTimestamp();
    const btn = new discord_js_1.ActionRowBuilder().setComponents(
      new discord_js_1.ButtonBuilder()
        .setCustomId("close")
        .setStyle(discord_js_1.ButtonStyle.Danger)
        .setLabel("Close Ticket"),
      new discord_js_1.ButtonBuilder()
        .setCustomId("claim")
        .setEmoji("🎫")
        .setLabel("already claimed")
        .setStyle(discord_js_1.ButtonStyle.Primary)
        .setDisabled(true)
    );
    await interaction.update({
      embeds: [embed],
      components: [btn],
    });
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
