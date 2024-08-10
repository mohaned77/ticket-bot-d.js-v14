"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessageCommands = handleMessageCommands;
const index_1 = require("../../index");
const handleCommands_1 = require("./handleCommands");
const config_1 = require("../../config");
const Command_1 = require("../types/Command");
async function handleMessageCommands(message) {
  if (!index_1.client.user) return;
  if (message.content.startsWith(config_1.prefix))
    await handleCommand(Command_1.CommandTypes.PrefixCommand, message);
  else if (message.content.startsWith(`<@${index_1.client.user.id}>`))
    await handleCommand(Command_1.CommandTypes.PingCommand, message);
  else await handleCommand(Command_1.CommandTypes.MessageCommand, message);
}
async function handleCommand(type, message) {
  if (!index_1.client.user) return;
  let commandName = "";
  if (type === Command_1.CommandTypes.PrefixCommand) {
    const matches = config_1.prefix.match(/\s/g);
    const whitespaceAmount = matches ? matches.length : 0;
    commandName = message.content
      .split(" ")
      [whitespaceAmount].replace(config_1.prefix, "");
    message.content = message.content.replace(
      `${config_1.prefix}${commandName} `,
      ""
    );
  } else if (type === Command_1.CommandTypes.PingCommand) {
    commandName = message.content.split(" ")[1].replace(/ /g, "");
    message.content = message.content.replace(
      `<@${index_1.client.user.id}> ${commandName} `,
      ""
    );
  } else if (type === Command_1.CommandTypes.MessageCommand) {
    commandName = message.content.split(" ")[0];
  }
  let commandModule =
    index_1.client.commands[type].get(commandName) ||
    index_1.client.commands.aliases[type].get(commandName);
  if (typeof commandModule === "string")
    commandModule = index_1.client.commands[type].get(commandModule);
  if (commandModule) {
    if (
      commandModule.permissions &&
      !hasPermissions(message.member, commandModule.permissions)
    ) {
      return;
    }
    const cooldown = (0, handleCommands_1.hasCooldown)(
      message.author.id,
      commandModule.name,
      commandModule.cooldown
    );
    if (typeof cooldown === "number") {
      await message.reply({
        embeds: [
          (0, config_1.getCommandOnCooldownEmbed)(cooldown, commandModule.name),
        ],
      });
      return;
    }
    if (
      (0, handleCommands_1.isAllowedCommand)(
        commandModule,
        message.member?.user,
        message.guild,
        message.channel,
        message.member
      )
    ) {
      await commandModule.execute(message);
    }
  }
}
function hasPermissions(member, permissions) {
  return permissions.every((permission) => member.permissions.has(permission));
}
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
