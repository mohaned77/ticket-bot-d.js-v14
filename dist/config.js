"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.developer =
  exports.ownerId =
  exports.componentsFolderName =
  exports.commandsFolderName =
  exports.eventsFolderName =
  exports.defaultIntents =
  exports.prefix =
    void 0;
exports.getLoggerLogMessage = getLoggerLogMessage;
exports.getLoggerWarnMessage = getLoggerWarnMessage;
exports.getLoggerErrorMessage = getLoggerErrorMessage;
exports.getCommandNotAllowedEmbed = getCommandNotAllowedEmbed;
exports.getCommandOnCooldownEmbed = getCommandOnCooldownEmbed;
const handler_1 = require("./handler");
const discord_js_1 = require("discord.js");
exports.prefix = "!";
exports.defaultIntents = [
  handler_1.Intent.Guilds,
  handler_1.Intent.MessageContent,
];
exports.eventsFolderName = "events";
exports.commandsFolderName = "commands";
exports.componentsFolderName = "components";
exports.ownerId = "712205125158174751";
exports.developer = "1074728985218519140";
function getLoggerLogMessage(message) {
  return `${handler_1.ConsoleColor.Green}[INFO] ${message}${handler_1.ConsoleColor.Reset}`;
}
function getLoggerWarnMessage(message) {
  return `${handler_1.ConsoleColor.Yellow}[WARNING] ${message}${handler_1.ConsoleColor.Reset}`;
}
function getLoggerErrorMessage(message) {
  return `${handler_1.ConsoleColor.Red}[ERROR] ${message}${handler_1.ConsoleColor.Reset}`;
}
function getCommandNotAllowedEmbed(interaction) {
  return new discord_js_1.EmbedBuilder()
    .setTitle("You are not allowed to use this command!")
    .setColor("#DA373C");
}
function getCommandOnCooldownEmbed(timeLeft, commandName) {
  return new discord_js_1.EmbedBuilder()
    .setTitle("Command on cooldown")
    .setColor("#DA373C")
    .setDescription(
      `Please wait ${timeLeft} more second(s) before reusing the \`${commandName}\` command.`
    );
}
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
