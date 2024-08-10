"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInteractionCommands = handleInteractionCommands;
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("./Logger"));
const index_1 = require("../../index");
const handleCommands_1 = require("./handleCommands");
const Command_1 = require("../types/Command");
const config_1 = require("../../config");
async function handleInteractionCommands(interaction) {
  if (interaction.isChatInputCommand())
    await handleCommand(Command_1.CommandTypes.SlashCommand, interaction);
  else if (interaction.isContextMenuCommand())
    await handleCommand(Command_1.CommandTypes.ContextMenu, interaction);
  else if (interaction.isAutocomplete()) await handleAutocomplete(interaction);
}
async function handleCommand(type, interaction) {
  const commandModule = index_1.client.commands[type].get(
    interaction.commandName
  );
  if (!commandModule) {
    return Logger_1.default.error(
      `No command matching ${interaction.commandName} was found.`
    );
  }
  const cooldown = (0, handleCommands_1.hasCooldown)(
    interaction.user.id,
    commandModule.data.name,
    commandModule.cooldown
  );
  if (typeof cooldown === "number") {
    await interaction.reply({
      embeds: [
        (0, config_1.getCommandOnCooldownEmbed)(
          cooldown,
          commandModule.data.name
        ),
      ],
      ephemeral: true,
    });
    return;
  }
  if (
    !(0, handleCommands_1.isAllowedCommand)(
      commandModule,
      interaction.user,
      interaction.guild,
      interaction.channel,
      interaction.member
    )
  ) {
    await interaction.reply({
      embeds: [(0, config_1.getCommandNotAllowedEmbed)(interaction)],
      ephemeral: true,
    });
    return;
  }
  try {
    await commandModule.execute(interaction);
  } catch (err) {
    return Logger_1.default.error(
      `Error executing ${interaction.commandName}`,
      err
    );
  }
}
async function handleAutocomplete(interaction) {
  const command = index_1.client.commands.slash.get(interaction.commandName);
  if (!command) {
    return Logger_1.default.error(
      `No command matching ${interaction.commandName} was found.`
    );
  }
  if (!command.autocomplete) {
    return Logger_1.default.error(
      `No autocomplete in ${interaction.commandName} was found.`
    );
  }
  try {
    await command.autocomplete(interaction);
  } catch (err) {
    return Logger_1.default.error(
      `Error autocompleting ${interaction.commandName}`,
      err
    );
  }
}
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
