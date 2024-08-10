"use strict";
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const handler_1 = require("../../handler");
const functions_1 = tslib_1.__importDefault(
  require("../../database/functions")
);
module.exports = {
  id: "close",
  type: handler_1.ComponentTypes.Button,
  async execute(interaction) {
    await functions_1.default.setClosedBy(
      interaction.channel?.id,
      interaction.user.id
    );
    const ticketData = await functions_1.default.getTicketData(
      interaction.channel?.id
    );
    await functions_1.default.deleteTicket(ticketData[0].createdBy);
    await interaction.channel?.delete().then(async () => {
      const data = await functions_1.default.getAllData(interaction.guild?.id);
      const channel = ticketData[0].channelId;
      const logChannelId = data[0].logChannel;
      const logChannel = interaction.guild?.channels.cache.get(logChannelId);
      const CreatedById = ticketData[0].createdBy;
      const CreatedBy = interaction.guild?.members.cache.get(CreatedById);
      const ClosedById = ticketData[0].closedBy;
      const ClosedBy = interaction.guild?.members.cache.get(ClosedById);
      const ClaimedById = ticketData[0].claimedBy;
      const ClaimedBy =
        interaction.guild?.members.cache.get(ClaimedById) || "none claimed";
      await functions_1.default.deleteticketData(channel);
      const embed = new discord_js_1.EmbedBuilder()
        .setColor("Blue")
        .setTitle(` ** Ticket Logs **`)
        .setThumbnail(interaction.guild?.iconURL({ size: 1024 }))
        .addFields([
          {
            name: "Created By",
            value: `${CreatedBy}`,
          },
          {
            name: "Claimed By",
            value: `${ClaimedBy}`,
          },
          {
            name: "Closed By",
            value: `${ClosedBy}`,
          },
        ])
        .setFooter({
          text: `${interaction.guild?.name} logs`,
          iconURL: interaction.guild?.iconURL(),
        });
      await logChannel.send({ embeds: [embed] });
    });
  },
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
