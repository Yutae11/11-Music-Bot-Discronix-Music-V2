/** @format
 *
 * MELODIFY by Doremxn 
 * Version: 1.0.0-beta
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "about",
  aliases: [],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows about info of bot",
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
  execute: async (client, message, args, emoji) => {
    const nodeVersion = process.version;

    await message
      .reply({
        embeds: [
          new client.embed()
            .setColor("#07f7fa")
            .setAuthor({
              name: message.guild.name,
              iconURL: client.user.displayAvatarURL(),
            })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(
              `**About Eleven**\n\nEleven - Let Eleven spin the tunes and elevate your vibe!\nMeet Eleven, your personal DJ on Discord! Bringing you the beats, rhythm, and vibes you love, all in one seamless experience.`
            )
            .addFields(
              { name: "**Basic Information**", value: `> **Node.js Version:** ${nodeVersion}\n> **Library:** [discord.js](https://discord.js.org)` },
              { name: "__Links__", value: "[Invite](https://dsc.gg/discronix) : [Support](https://dsc.gg/discronix) : [Vote](https://dsc.gg/discronix)" }
            )
            .setImage(
              "https://cdn.discordapp.com/attachments/1188669877985222677/1271783939236958238/20240810_155952.jpg?ex=66e02597&is=66ded417&hm=79a3b3701ceb90b3d9b68269a1e4766ae95a26bf5fe5ba89480211306a1ad68a&"
            )
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel("About Developers")
              .setStyle(ButtonStyle.Success)
              .setCustomId("about_developers")
          ),
        ],
      })
      .catch(() => {});
  },
};
