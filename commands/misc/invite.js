/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
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
  execute: async (client, message, args, emoji) => {
    await message
      .reply({
        components: [
          new ActionRowBuilder().addComponents(
            new client.button().link("Invite", "https://discord.com/oauth2/authorize?client_id=1215354057246511104&permissions=8&integration_type=0&scope=bot"),
            new client.button().link("Support Server", "https://dsc.gg/discronix"),
          ),
        ],
      })
      .catch(() => {});
  },
};
