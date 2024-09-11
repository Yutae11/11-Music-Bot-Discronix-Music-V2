/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["pong"],
  cooldown: "",
  category: "information",
  usage: "",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args) => {
    const msg = await message.reply("Calculating message latency...");

    const latency = msg.createdTimestamp - message.createdTimestamp;

    const embed = new EmbedBuilder()
      .setColor("#07f7fa")
      .setDescription(`🟢 ${latency} **ms**`);

    await msg.edit({ content: '', embeds: [embed] }).catch(() => {});
  },
};
