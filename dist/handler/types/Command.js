"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterTypes = exports.CommandTypes = void 0;
var CommandTypes;
(function (CommandTypes) {
  CommandTypes["SlashCommand"] = "slash";
  CommandTypes["PrefixCommand"] = "prefix";
  CommandTypes["MessageCommand"] = "message";
  CommandTypes["PingCommand"] = "ping";
  CommandTypes["ContextMenu"] = "context";
})(CommandTypes || (exports.CommandTypes = CommandTypes = {}));
var RegisterTypes;
(function (RegisterTypes) {
  RegisterTypes["Guild"] = "applicationGuildCommands";
  RegisterTypes["Global"] = "applicationCommands";
})(RegisterTypes || (exports.RegisterTypes = RegisterTypes = {}));
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
