/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  cooldown: "",
  category: "information",
  usage: "[user]",
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
    let user = message.mentions.users.first() || message.author;

    const embed = new EmbedBuilder()
      .setColor("#07f7fa")
      .setTitle(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }));

    await message.reply({ embeds: [embed] }).catch(() => {
      message.reply("There was an error trying to fetch the avatar!");
    });
  },
};
