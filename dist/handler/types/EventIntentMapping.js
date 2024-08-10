"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventIntentMapping = void 0;
const Intent_1 = require("./Intent");
exports.EventIntentMapping = {
  guildCreate: [Intent_1.Intent.Guilds],
  guildUpdate: [Intent_1.Intent.Guilds],
  guildDelete: [Intent_1.Intent.Guilds],
  guildRoleCreate: [Intent_1.Intent.Guilds],
  guildRoleUpdate: [Intent_1.Intent.Guilds],
  guildRoleDelete: [Intent_1.Intent.Guilds],
  channelCreate: [Intent_1.Intent.Guilds],
  channelUpdate: [Intent_1.Intent.Guilds],
  channelDelete: [Intent_1.Intent.Guilds],
  channelPinsUpdate: [Intent_1.Intent.Guilds],
  threadCreate: [Intent_1.Intent.Guilds],
  threadUpdate: [Intent_1.Intent.Guilds],
  threadDelete: [Intent_1.Intent.Guilds],
  threadListSync: [Intent_1.Intent.Guilds],
  threadMemberUpdate: [Intent_1.Intent.Guilds],
  threadMembersUpdate: [Intent_1.Intent.Guilds, Intent_1.Intent.GuildMembers],
  stageInstanceCreate: [Intent_1.Intent.Guilds],
  stageInstanceUpdate: [Intent_1.Intent.Guilds],
  stageInstanceDelete: [Intent_1.Intent.Guilds],
  guildMemberAdd: [Intent_1.Intent.GuildMembers],
  guildMemberUpdate: [Intent_1.Intent.GuildMembers],
  guildMemberRemove: [Intent_1.Intent.GuildMembers],
  guildAuditLogEntryCreate: [Intent_1.Intent.GuildModeration],
  guildBanAdd: [Intent_1.Intent.GuildModeration],
  guildBanRemove: [Intent_1.Intent.GuildModeration],
  guildEmojisUpdate: [Intent_1.Intent.GuildEmojisAndStickers],
  guildStickersUpdate: [Intent_1.Intent.GuildEmojisAndStickers],
  guildIntegrationsUpdate: [Intent_1.Intent.GuildIntegrations],
  integrationCreate: [Intent_1.Intent.GuildIntegrations],
  integrationUpdate: [Intent_1.Intent.GuildIntegrations],
  integrationDelete: [Intent_1.Intent.GuildIntegrations],
  webhooksUpdate: [Intent_1.Intent.GuildWebhooks],
  inviteCreate: [Intent_1.Intent.GuildInvites],
  inviteDelete: [Intent_1.Intent.GuildInvites],
  voiceStateUpdate: [Intent_1.Intent.GuildVoiceStates],
  presenceUpdate: [Intent_1.Intent.GuildPresences],
  messageCreate: [Intent_1.Intent.GuildMessages],
  messageUpdate: [Intent_1.Intent.GuildMessages],
  messageDelete: [Intent_1.Intent.GuildMessages],
  messageDeleteBulk: [Intent_1.Intent.GuildMessages],
  messageReactionAdd: [Intent_1.Intent.GuildMessageReactions],
  messageReactionRemove: [Intent_1.Intent.GuildMessageReactions],
  messageReactionRemoveAll: [Intent_1.Intent.GuildMessageReactions],
  messageReactionRemoveEmoji: [Intent_1.Intent.GuildMessageReactions],
  typingStart: [Intent_1.Intent.DirectMessageTyping],
  guildScheduledEventCreate: [Intent_1.Intent.GuildScheduledEvents],
  guildScheduledEventUpdate: [Intent_1.Intent.GuildScheduledEvents],
  guildScheduledEventDelete: [Intent_1.Intent.GuildScheduledEvents],
  guildScheduledEventUserAdd: [Intent_1.Intent.GuildScheduledEvents],
  guildScheduledEventUserRemove: [Intent_1.Intent.GuildScheduledEvents],
  autoModerationRuleCreate: [Intent_1.Intent.AutoModerationConfiguration],
  autoModerationRuleUpdate: [Intent_1.Intent.AutoModerationConfiguration],
  autoModerationRuleDelete: [Intent_1.Intent.AutoModerationConfiguration],
  autoModerationActionExecution: [Intent_1.Intent.AutoModerationExecution],
  messagePollVoteAdd: [
    Intent_1.Intent.GuildMessagePolls,
    Intent_1.Intent.DirectMessagePolls,
  ],
  messagePollVoteRemove: [
    Intent_1.Intent.GuildMessagePolls,
    Intent_1.Intent.DirectMessagePolls,
  ],
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
