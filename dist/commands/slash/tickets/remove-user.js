"use strict";
const handler_1 = require("../../../handler");
const discord_js_1 = require("discord.js");
module.exports = {
  type: handler_1.CommandTypes.SlashCommand,
  register: handler_1.RegisterTypes.Guild,
  data: new discord_js_1.SlashCommandBuilder()
    .setName("remove-user")
    .setDescription("remove a user to a ticket")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to remove from the ticket")
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(
      discord_js_1.PermissionFlagsBits.ManageChannels
    ),
  async execute(interaction) {
    const userId = interaction.options.get("user")?.user?.id;
    const user = interaction.guild?.members.cache.get(userId);
    if (!user) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `> ** ❌ please provide a vaild user to remove from the ticket channel ❌ **`
        )
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const channel = interaction.guild?.channels.cache.get(
      interaction.channelId
    );
    if (!channel?.name.endsWith("-ticket")) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `> ** ❌ this command can be used only in the tickets channels ❌ **`
        )
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const check = channel
      .permissionsFor(user.id)
      ?.has(discord_js_1.PermissionFlagsBits.ViewChannel);
    if (!check) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `> ** ❌ this user deosnt exist on this ticket channel ❌ **`
        )
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    await channel.permissionOverwrites.edit(user, {
      ViewChannel: false,
      SendMessages: false,
      ReadMessageHistory: false,
    });
    const embed = new discord_js_1.EmbedBuilder()
      .setColor("Green")
      .setDescription(`> ** ✅ Successfully removed ${user} to the ticket✅**`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
