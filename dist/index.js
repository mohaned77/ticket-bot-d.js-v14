"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const tslib_1 = require("tslib");
require("dotenv/config");
const handler_1 = require("./handler");
const DiscordClient_1 = require("./handler/util/DiscordClient");
const syncDb_1 = require("./database/syncDb");
const discord_js_1 = require("discord.js");
(0, syncDb_1.syncDb)();
exports.client = new DiscordClient_1.DiscordClient({
  intents: handler_1.AutomaticIntents,
});
(async () => {
  await exports.client.registerEvents();
  await exports.client.registerComponents();
  await exports.client.registerCommands({
    deploy: true,
  });
  await exports.client.connect(process.env.CLIENT_TOKEN);
})();
const functions_1 = tslib_1.__importDefault(require("./database/functions"));
exports.client.on("messageCreate", async (msg) => {
  const checkTicketSystem = await functions_1.default.checkTicketSystem(
    msg.guild?.id
  );
  if (!checkTicketSystem) return;
  const data = await functions_1.default.getAllData(msg.guild?.id);
  const staffRoleId = data[0].staffRole;
  const staffRole = msg.guild?.roles.cache.get(staffRoleId);
  if (msg.author.bot) return;
  const channeldId = msg.channel.id;
  const channel = msg.guild?.channels.cache.get(channeldId);
  if (channel.name.endsWith("-ticket")) {
    if (msg.content === `${staffRole}`) {
      if (
        msg.member?.permissions.has(
          discord_js_1.PermissionFlagsBits.Administrator
        )
      )
        return;
      await msg.member?.timeout(300000, "Pinging staff");
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `> ** ❌ ${msg.author} dont ping staff again or you will get another timeout ❌ **`
        )
        .setTimestamp();
      const answer = await msg.reply({ embeds: [embed] });
      setTimeout(() => {
        msg.delete();
        answer.delete();
      }, 300000);
    }
  }
});
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
