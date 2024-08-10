"use strict";
const tslib_1 = require("tslib");
const functions_1 = tslib_1.__importDefault(
  require("../../../database/functions")
);
const config_1 = require("../../../config");
const handler_1 = require("../../../handler");
const discord_js_1 = require("discord.js");
module.exports = {
  type: handler_1.CommandTypes.SlashCommand,
  register: handler_1.RegisterTypes.Guild,
  data: new discord_js_1.SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("use this command to blacklist any user you want!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("choose the user you want to blacklist")
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(
      discord_js_1.PermissionFlagsBits.Administrator
    ),
  async execute(interaction) {
    if (interaction.user.id !== config_1.developer) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription("> ** ❌ only the developer can use this command ❌ **")
        .setTimestamp();
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const userId = interaction.options.get("user")?.user;
    const user = interaction.guild?.members.cache.get(userId.id);
    if (!user) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          "> ** ❌ please provide a vaild user to blacklist. ❌ **"
        )
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    if (user.user.bot) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription("> ** ❌ you cant blacklist bots. ❌ **")
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    if (user.id === interaction.guild?.ownerId) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          "> ** ❌ you cant blacklist the ownership of the server. ❌ **"
        )
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    if (interaction.user.id === user.id) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription("> ** ❌ you cant blacklist yourself lol😂. ❌ **")
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const check = await functions_1.default.checkBlacklist(user?.id);
    if (check) {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(`> ** ❌ ${user} is already blacklisted. ❌ **`)
        .setTimestamp();
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    await functions_1.default.blacklist(user.id).then(async () => {
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Green")
        .setDescription(`> ** ✅ ${user} has been blacklisted. ✅ **`);
      await interaction.reply({ embeds: [embed] });
    });
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
