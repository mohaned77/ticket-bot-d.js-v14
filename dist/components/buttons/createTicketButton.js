"use strict";
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const handler_1 = require("../../handler");
const functions_1 = tslib_1.__importDefault(
  require("../../database/functions")
);
module.exports = {
  id: "ticket",
  type: handler_1.ComponentTypes.Button,
  async execute(interaction) {
    const checkTicketSystem = await functions_1.default.checkTicketSystem(
      interaction.guild?.id
    );
    if (!checkTicketSystem) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(`> ** ❌ the ticket system is disabled ❌ **`)
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const checkBlacklist = await functions_1.default.checkBlacklist(
      interaction.user?.id
    );
    if (checkBlacklist) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(`> ** ❌ you are banned from using the bot ❌ **`)
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const checkHasTicket = await functions_1.default.checkTicket(
      interaction.user.id
    );
    if (checkHasTicket) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(`> ** ❌ you already have a ticket ❌ **`)
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const data = await functions_1.default.getAllData(interaction.guild?.id);
    const categoryId = data[0].category;
    const category = interaction.guild?.channels.cache.get(categoryId);
    const logChannelId = data[0].category;
    const logChannel = interaction.guild?.channels.cache.get(logChannelId);
    const staffRoleId = data[0].staffRole;
    const staffRole = interaction.guild?.roles.cache.get(staffRoleId);
    if (!category) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(`> ** ❌ couldnot find the category ❌**`)
        .setTimestamp();
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    if (!logChannel) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(`> ** ❌ couldnot find the log channel ❌**`)
        .setTimestamp();
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    if (!staffRole) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(`> ** ❌ couldnot find the staff role ❌**`)
        .setTimestamp();
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    const channel = await interaction.guild?.channels.create({
      name: `${interaction.user.tag} Ticket`,
      type: discord_js_1.ChannelType.GuildText,
      parent: category.id,
      permissionOverwrites: [
        {
          id: interaction.user.id,
          allow: [
            discord_js_1.PermissionsBitField.Flags.SendMessages,
            discord_js_1.PermissionsBitField.Flags.ViewChannel,
          ],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: [discord_js_1.PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: staffRole.id,
          allow: [
            discord_js_1.PermissionsBitField.Flags.SendMessages,
            discord_js_1.PermissionsBitField.Flags.ViewChannel,
          ],
        },
      ],
    });
    await functions_1.default.setTicketData(
      channel?.id,
      interaction.user?.id,
      null,
      null
    );
    await functions_1.default.setTicket(interaction.user.id);
    const embed = new discord_js_1.EmbedBuilder()
      .setColor(0x00ff00)
      .setTimestamp()
      .setTitle(`** Successfully created the ticket **`)
      .setDescription(` > ** your ticket has been made in ${channel} **`)
      .setFooter({
        text: `${interaction.guild?.name}`,
        iconURL: interaction.guild?.iconURL(),
      });
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
    const btn = new discord_js_1.ActionRowBuilder().setComponents(
      new discord_js_1.ButtonBuilder()
        .setCustomId("close")
        .setStyle(discord_js_1.ButtonStyle.Primary)
        .setEmoji("🎁")
        .setLabel("close"),
      new discord_js_1.ButtonBuilder()
        .setCustomId("claim")
        .setEmoji("🎫")
        .setLabel("claim")
        .setStyle(discord_js_1.ButtonStyle.Primary)
    );
    const embed2 = new discord_js_1.EmbedBuilder()
      .setColor("Green")
      .setDescription(
        `> **  welcome to your ticket , our staff will be here soon please be patient ** `
      )
      .setAuthor({
        name: ` ${interaction.guild?.name} tickets 🎫`,
        iconURL: interaction.guild?.iconURL(),
      });
    await channel?.send({
      content: `${interaction.user} ${staffRole}`,
      embeds: [embed2],
      components: [btn],
    });
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
