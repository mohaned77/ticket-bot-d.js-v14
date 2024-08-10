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
    .setName("ticket-panel")
    .setDescription("use this command to send the ticket panel.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(
      discord_js_1.PermissionFlagsBits.Administrator
    ),
  async execute(interaction) {
    const check = await functions_1.default.checkTicketSystem(
      interaction.guild?.id
    );
    if (!check) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `> ** ❌ the ticket system is disabled in this server! ❌ **`
        )
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const data = await functions_1.default.getAllData(interaction.guild?.id);
    const channelId = data[0].channel;
    const channel = interaction.guild?.channels.cache.get(channelId);
    const embed = new discord_js_1.EmbedBuilder()
      .setTitle("Ticket Panel")
      .setDescription(" > ** Click the button below to create a ticket.**")
      .setColor("Blue")
      .setThumbnail(interaction.guild?.iconURL({ size: 1024 }))
      .setAuthor({
        name: `${interaction.guild?.name} ticket system 🎫`,
        iconURL: interaction.guild?.iconURL(),
      });
    const button = new discord_js_1.ActionRowBuilder().setComponents(
      new discord_js_1.ButtonBuilder()
        .setCustomId("ticket")
        .setLabel("Make a ticket")
        .setStyle(discord_js_1.ButtonStyle.Primary)
        .setEmoji("🎫")
    );
    await channel.send({ embeds: [embed], components: [button] });
    await interaction.reply({
      content: "✅ Ticket panel has been created",
      ephemeral: true,
    });
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
