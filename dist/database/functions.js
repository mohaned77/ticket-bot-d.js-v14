"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blacklist_1 = require("./schemas/blacklist");
const ticket_1 = require("./schemas/ticket");
const ticket_handling_1 = require("./schemas/ticket-handling");
const ticket_setup_1 = require("./schemas/ticket-setup");
const setupTicketSystem = async (
  serverId,
  channel,
  staffRole,
  category,
  logChannel
) => {
  await ticket_setup_1.TicketSetup.create({
    serverId,
    channel,
    staffRole,
    category,
    logChannel,
    status: true,
  });
};
const disableTicketSystem = async (serverId) => {
  await ticket_setup_1.TicketSetup.destroy({
    where: {
      serverId: serverId,
    },
  });
};
const checkTicketSystem = async (serverId) => {
  const result = await ticket_setup_1.TicketSetup.findOne({
    attributes: ["status"],
    where: { serverId: serverId },
  });
  return result?.status;
};
const getAllData = async (serverId) => {
  const result = await ticket_setup_1.TicketSetup.findAll({
    where: {
      serverId: serverId,
    },
  });
  return result;
};
const checkBlacklist = async (userId) => {
  const result = await blacklist_1.Blacklist.findOne({
    attributes: ["status"],
    where: {
      userId: userId,
    },
  });
  return result?.status;
};
const blacklist = async (userId) => {
  await blacklist_1.Blacklist.create({
    userId: userId,
    status: true,
  });
};
const un_blacklist = async (userId) => {
  await blacklist_1.Blacklist.destroy({
    where: {
      userId: userId,
    },
  });
};
const setTicketData = async (channelId, createdBy, claimedBy, closedBy) => {
  await ticket_1.Ticket.create({
    channelId,
    createdBy,
    claimedBy,
    closedBy,
  });
};
const setClaimedBy = async (channelId, claimedBy) => {
  await ticket_1.Ticket.update(
    { claimedBy: claimedBy },
    { where: { channelId: channelId } }
  );
};
const setClosedBy = async (channelId, closedBy) => {
  await ticket_1.Ticket.update(
    { closedBy: closedBy },
    { where: { channelId: channelId } }
  );
};
const getTicketData = async (channelId) => {
  const result = await ticket_1.Ticket.findAll({
    where: {
      channelId: channelId,
    },
  });
  return result;
};
const deleteticketData = async (channelId) => {
  await ticket_1.Ticket.destroy({
    where: {
      channelId: channelId,
    },
  });
};
const checkTicket = async (userId) => {
  const result = await ticket_handling_1.TicketHandling.findOne({
    attributes: ["status"],
    where: { userId },
  });
  return result?.status;
};
const setTicket = async (userId) => {
  await ticket_handling_1.TicketHandling.create({
    userId: userId,
    status: true,
  });
};
const deleteTicket = async (userId) => {
  await ticket_handling_1.TicketHandling.destroy({ where: { userId } });
};
exports.default = {
  setupTicketSystem,
  disableTicketSystem,
  checkTicketSystem,
  getAllData,
  checkBlacklist,
  blacklist,
  un_blacklist,
  setTicketData,
  setClaimedBy,
  setClosedBy,
  checkTicket,
  setTicket,
  deleteTicket,
  getTicketData,
  deleteticketData,
};
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
