"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
exports.deleteCommands = deleteCommands;
exports.deleteAllCommands = deleteAllCommands;
exports.isAllowedCommand = isAllowedCommand;
exports.hasCooldown = hasCooldown;
const tslib_1 = require("tslib");
const glob_1 = require("glob");
const Logger_1 = tslib_1.__importDefault(require("./Logger"));
const index_1 = require("../../index");
const config_1 = require("../../config");
const Command_1 = require("../types/Command");
const discord_js_1 = require("discord.js");
async function registerCommands(client, options) {
  await getCommandModules(client);
  if (options.deploy) await deploySlashCommands(client);
}
async function getCommandModules(client) {
  const commandPaths = glob_1.glob.sync(
    `**/${config_1.commandsFolderName}/**/*.js`,
    { ignore: "**/node_modules/**" }
  );
  for (const commandPath of commandPaths) {
    const importPath = `../..${commandPath.replace(/^dist[\\\/]|\\/g, "/")}`;
    try {
      const module = (
        await Promise.resolve(`${importPath}`).then((s) =>
          tslib_1.__importStar(require(s))
        )
      ).default;
      if (
        module.type === Command_1.CommandTypes.SlashCommand &&
        (!module.data.name || !module.data.description)
      ) {
        return Logger_1.default.error(
          `No name or description for command at ${importPath} set.`
        );
      }
      if (module.disabled) {
        continue;
      }
      if (module.type === Command_1.CommandTypes.SlashCommand)
        client.commands[module.type].set(module.data.name, module);
      else if (module.type === Command_1.CommandTypes.ContextMenu)
        client.commands[module.type].set(module.data.name, module);
      else if (module.type === Command_1.CommandTypes.PrefixCommand)
        client.commands[module.type].set(module.name, module);
      else if (module.type === Command_1.CommandTypes.MessageCommand)
        client.commands[module.type].set(module.name, module);
      else if (module.type === Command_1.CommandTypes.PingCommand)
        client.commands[module.type].set(module.name, module);
      if (
        (module.type === Command_1.CommandTypes.PrefixCommand ||
          module.type === Command_1.CommandTypes.MessageCommand ||
          module.type === Command_1.CommandTypes.PingCommand) &&
        module.aliases
      ) {
        for (const alias of module.aliases) {
          client.commands.aliases[module.type].set(alias, module.name);
        }
      }
    } catch (err) {
      Logger_1.default.error(`Failed to load command at ${importPath}`, err);
    }
    if (client.commands.slash.size > 100) {
      Logger_1.default.error("You can only register 100 Slash Commands.");
      process.exit();
    }
    if (
      client.commands.context.filter(
        (command) =>
          command.data.type === discord_js_1.ApplicationCommandType.Message
      ).size > 5
    ) {
      Logger_1.default.error("You can only register 5 Message Context Menus.");
      process.exit();
    }
    if (
      client.commands.context.filter(
        (command) =>
          command.data.type === discord_js_1.ApplicationCommandType.User
      ).size > 5
    ) {
      Logger_1.default.error("You can only register 5 Message User Menus.");
      process.exit();
    }
  }
}
async function deploySlashCommands(client) {
  let guildCommands = [];
  let globalCommands = [];
  for (const module of client.commands.slash) {
    if (module[1].register === Command_1.RegisterTypes.Guild)
      guildCommands.push(module[1].data);
    if (module[1].register === Command_1.RegisterTypes.Global)
      globalCommands.push(module[1].data);
  }
  for (const module of client.commands.context) {
    if (module[1].register === Command_1.RegisterTypes.Guild)
      guildCommands.push(module[1].data);
    if (module[1].register === Command_1.RegisterTypes.Global)
      globalCommands.push(module[1].data);
  }
  if (guildCommands.length > 0)
    await uploadSlashCommands(Command_1.RegisterTypes.Guild, guildCommands);
  if (globalCommands.length > 0)
    await uploadSlashCommands(Command_1.RegisterTypes.Global, globalCommands);
}
async function uploadSlashCommands(type, commands) {
  if (!process.env.CLIENT_TOKEN) {
    return Logger_1.default.error("No process.env.TOKEN set.");
  }
  if (!process.env.CLIENT_ID) {
    return Logger_1.default.error("No process.env.CLIENT_ID set.");
  }
  if (Command_1.RegisterTypes.Guild && !process.env.GUILD_ID) {
    return Logger_1.default.error("No process.env.GUILD_ID set.");
  }
  const rest = new discord_js_1.REST({ version: "10" }).setToken(
    process.env.CLIENT_TOKEN
  );
  try {
    Logger_1.default.log(
      `Started refreshing ${commands.length} application commands.`
    );
    await rest.put(
      discord_js_1.Routes[type](process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    Logger_1.default.log(
      `Successfully reloaded ${commands.length} application commands.`
    );
  } catch (err) {
    Logger_1.default.error("Error while uploading slash commands.", err);
  }
}
async function deleteCommands(commandIds, type) {
  if (!process.env.CLIENT_ID) {
    return Logger_1.default.error("No process.env.CLIENT_ID set!");
  }
  if (Command_1.RegisterTypes.Guild && !process.env.GUILD_ID) {
    return Logger_1.default.error("No process.env.GUILD_ID set!");
  }
  const rest = new discord_js_1.REST({ version: "10" }).setToken(
    process.env.CLIENT_TOKEN
  );
  const route =
    type === Command_1.RegisterTypes.Guild
      ? discord_js_1.Routes.applicationGuildCommand(
          process.env.CLIENT_ID,
          process.env.GUILD_ID || "",
          ""
        )
      : discord_js_1.Routes.applicationCommand(process.env.CLIENT_ID, "");
  for (const commandId of commandIds) {
    await rest
      .delete(`${route}${commandId}`)
      .then(() =>
        Logger_1.default.log(
          `Successfully deleted ${
            type === Command_1.RegisterTypes.Guild ? "guild" : "global"
          } command: ${commandId}`
        )
      )
      .catch(console.error);
  }
}
async function deleteAllCommands(type) {
  if (!process.env.CLIENT_ID) {
    Logger_1.default.error("No process.env.CLIENT_ID set!");
    return;
  }
  if (type === Command_1.RegisterTypes.Guild && !process.env.GUILD_ID) {
    Logger_1.default.error("No process.env.GUILD_ID set!");
    return;
  }
  const rest = new discord_js_1.REST({ version: "10" }).setToken(
    process.env.CLIENT_TOKEN
  );
  const route =
    type === Command_1.RegisterTypes.Guild
      ? discord_js_1.Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID || ""
        )
      : discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID);
  try {
    await rest.put(route, { body: [] });
    Logger_1.default.log(
      `Successfully deleted all ${
        type === Command_1.RegisterTypes.Guild ? "guild" : "global"
      } commands`
    );
  } catch (err) {
    Logger_1.default.error(
      `Error deleting ${
        type === Command_1.RegisterTypes.Guild ? "guild" : "global"
      } commands`,
      err
    );
  }
}
function isAllowedCommand(command, user, guild, channel, member) {
  if (!user || !member) return false;
  const memberRoles = member.roles;
  const notAllowedConditions = [
    command.ownerOnly && user.id !== config_1.ownerId,
    command.userWhitelist && !command.userWhitelist.includes(user.id),
    command.userBlacklist && command.userBlacklist.includes(user.id),
    command.channelWhitelist &&
      channel &&
      !command.channelWhitelist.includes(channel.id),
    command.channelBlacklist &&
      channel &&
      command.channelBlacklist.includes(channel.id),
    command.categoryWhitelist &&
      channel &&
      !channel.isDMBased() &&
      !command.categoryWhitelist.includes(channel.parentId),
    command.categoryBlacklist &&
      channel &&
      !channel.isDMBased() &&
      command.categoryBlacklist.includes(channel.parentId),
    command.guildWhitelist &&
      guild &&
      !command.guildWhitelist.includes(guild.id),
    command.guildBlacklist &&
      guild &&
      command.guildBlacklist.includes(guild.id),
    command.roleWhitelist &&
      !command.roleWhitelist.some((roleId) => memberRoles.cache.has(roleId)),
    command.roleBlacklist &&
      command.roleBlacklist.some((roleId) => memberRoles.cache.has(roleId)),
    command.nsfw && channel && !channel.nsfw,
  ];
  if (notAllowedConditions.some(Boolean)) return false;
  if (
    !command.optionalUserWhitelist &&
    !command.optionalChannelWhitelist &&
    !command.optionalCategoryWhitelist &&
    !command.optionalGuildWhitelist &&
    !command.optionalRoleWhitelist
  )
    return true;
  const allowedByOptionalList = [
    command.optionalUserWhitelist &&
      command.optionalUserWhitelist.includes(user.id),
    command.optionalChannelWhitelist &&
      channel &&
      command.optionalChannelWhitelist.includes(channel.id),
    command.optionalCategoryWhitelist &&
      channel &&
      !channel.isDMBased() &&
      command.optionalCategoryWhitelist.includes(channel.parentId),
    command.optionalGuildWhitelist &&
      guild &&
      command.optionalGuildWhitelist.includes(guild.id),
    command.optionalRoleWhitelist &&
      command.optionalRoleWhitelist.some((roleId) =>
        memberRoles.cache.has(roleId)
      ),
  ];
  return allowedByOptionalList.some(Boolean);
}
function hasCooldown(userId, commandName, cooldown) {
  if (!cooldown) return true;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  let commandCollection =
    index_1.client.cooldowns.user.get(commandName) ||
    new discord_js_1.Collection();
  index_1.client.cooldowns.user.set(commandName, commandCollection);
  const userCooldown = commandCollection.get(userId);
  if (userCooldown && currentTimestamp < userCooldown) {
    return userCooldown - currentTimestamp;
  }
  commandCollection.set(userId, currentTimestamp + cooldown);
  return true;
}
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
