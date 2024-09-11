/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "announce",
  aliases: [],
  cooldown: "",
  category: "utility",
  usage: "<message>",
  args: true,
  vote: false,
  new: false,
  admin: true, // Only admin users can use this command
  owner: false,
  botPerms: ["SEND_MESSAGES"],
  userPerms: ["ADMINISTRATOR"],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args) => {
    const content = args.join(" ");

    // Check for links or @everyone and ensure the user has admin permissions
    if (content.includes("http") || content.includes("@everyone")) {
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.reply("You need admin permissions to use `@everyone` or include links in the message.");
      }
    }

    if (!content) return message.reply("You need to provide a message to announce!");

    // Create an embed with the announcement
    const embed = new EmbedBuilder()
      .setColor('#3498db') // You can customize the color
      .setTitle('Announcement')
      .setDescription(content)
      .setFooter({ 
        text: `Server: ${message.guild.name}`, 
        iconURL: message.guild.iconURL()
      })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] }).catch(() => {
      message.reply("There was an error trying to send the announcement!");
    });
  },
};
