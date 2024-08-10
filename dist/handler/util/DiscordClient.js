"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const tslib_1 = require("tslib");
const Logger_1 = tslib_1.__importDefault(require("./Logger"));
const config_1 = require("../../config");
const handleEvents_1 = require("./handleEvents");
const handleComponents_1 = require("./handleComponents");
const EventIntentMapping_1 = require("../types/EventIntentMapping");
const discord_js_1 = require("discord.js");
const handleCommands_1 = require("./handleCommands");
class DiscordClient extends discord_js_1.Client {
  events;
  commands;
  components;
  cooldowns;
  constructor(options) {
    super(options);
    this.events = [];
    this.commands = {
      slash: new discord_js_1.Collection(),
      prefix: new discord_js_1.Collection(),
      message: new discord_js_1.Collection(),
      ping: new discord_js_1.Collection(),
      context: new discord_js_1.Collection(),
      aliases: {
        slash: new discord_js_1.Collection(),
        prefix: new discord_js_1.Collection(),
        message: new discord_js_1.Collection(),
        ping: new discord_js_1.Collection(),
        context: new discord_js_1.Collection(),
      },
    };
    this.components = {
      buttons: new discord_js_1.Collection(),
      selectMenus: new discord_js_1.Collection(),
      modals: new discord_js_1.Collection(),
    };
    this.cooldowns = {
      user: new discord_js_1.Collection(),
    };
  }
  async registerEvents() {
    await (0, handleEvents_1.registerEvents)(this);
  }
  async registerCommands(options) {
    await (0, handleCommands_1.registerCommands)(this, options);
  }
  async deleteCommand(commandId, type) {
    await (0, handleCommands_1.deleteCommands)([commandId], type);
  }
  async deleteCommands(commandIds, type) {
    await (0, handleCommands_1.deleteCommands)(commandIds, type);
  }
  async deleteAllCommands(type) {
    await (0, handleCommands_1.deleteAllCommands)(type);
  }
  async registerComponents() {
    await (0, handleComponents_1.registerComponents)(this);
  }
  async connect(token) {
    if (token === undefined)
      return Logger_1.default.error(
        "Token is undefined. Please provide a valid token."
      );
    if (!this.options.intents.bitfield) await this.setIntents();
    try {
      await this.login(token);
    } catch (err) {
      Logger_1.default.error("Failed to connect to the bot:", err);
    }
  }
  async setIntents() {
    const intentBitField = new discord_js_1.IntentsBitField();
    this.events.forEach((event) => {
      const intents = EventIntentMapping_1.EventIntentMapping[event];
      if (intents)
        Array.from(intents).forEach((intent) => intentBitField.add(intent));
    });
    config_1.defaultIntents.forEach((intent) => {
      intentBitField.add(intent);
    });
    this.options.intents = intentBitField;
  }
}
exports.DiscordClient = DiscordClient;
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
