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
    .setName("ticket-setup")
    .setDescription(
      "use this command to setup the ticket system in your server!"
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "Select the channel where the tickets should be created."
        )
        .setRequired(true)
        .addChannelTypes(discord_js_1.ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription(
          "Select the parent of where the tickets should be created."
        )
        .setRequired(true)
        .addChannelTypes(discord_js_1.ChannelType.GuildCategory)
    )
    .addChannelOption((option) =>
      option
        .setName("log-channel")
        .setDescription("Select the channel where the logs will be sent.")
        .setRequired(true)
        .addChannelTypes(discord_js_1.ChannelType.GuildText)
    )
    .addRoleOption((option) =>
      option
        .setName("staff-role")
        .setDescription("Select the staff role.")
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(
      discord_js_1.PermissionFlagsBits.Administrator
    ),
  async execute(interaction) {
    const channelId = interaction.options.get("channel")?.channel?.id;
    const channel = interaction.guild?.channels.cache.get(channelId);
    const categoryId = interaction.options.get("category")?.channel?.id;
    const category = interaction.guild?.channels.cache.get(categoryId);
    const logChannelId = interaction.options.get("log-channel")?.channel?.id;
    const logChannel = interaction.guild?.channels.cache.get(logChannelId);
    const staffRoleId = interaction.options.get("staff-role")?.role?.id;
    const staffRole = interaction.guild?.roles.cache.get(staffRoleId);
    if (!channel) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(`> ** ❌ please provide a vaild channel ❌**`)
        .setTimestamp();
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    if (!category) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(`> ** ❌ please provide a vaild category ❌**`)
        .setTimestamp();
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    if (!logChannel) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(`> ** ❌ please provide a vaild log channel ❌**`)
        .setTimestamp();
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    if (!staffRole) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(`> ** ❌ please provide a vaild staff role ❌**`)
        .setTimestamp();
      return await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    const check = await functions_1.default.checkTicketSystem(
      interaction.guild?.id
    );
    if (!check) {
      await functions_1.default
        .setupTicketSystem(
          interaction.guild?.id,
          channel.id,
          staffRole.id,
          category.id,
          logChannel.id
        )
        .then(async () => {
          const embed = new discord_js_1.EmbedBuilder()
            .setColor("Green")
            .setDescription(
              `> ** ✅ Successfully set up the ticket system. ✅**`
            )
            .setTimestamp();
          await interaction.reply({ embeds: [embed] });
        });
    } else {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `> ** ❌ the ticket system is already enabled in this server! ❌ **`
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
