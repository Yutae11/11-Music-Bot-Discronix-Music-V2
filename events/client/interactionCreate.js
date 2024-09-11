/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { messageLink } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isModalSubmit()) {
      switch (interaction.customId) {
        case "report":
          await client.emit("reportSubmit", interaction);
          break;

        default:
          break;
      }
      return;
    }

      if (interaction.isButton()) {
        // Handle the "About Developers" button
        if (interaction.customId === "about_developers") {
          await interaction.update({
            embeds: [
              new client.embed()
                .setColor("000000")
                .setTitle(`${client.user.username}`)
                .setDescription(
                  `<:eg_developers:1277919760545480727> **Developers**\n1. **[Doremxn](https://discord.com/users/9489371710316954110)**\n\n<:eg_member:1277919828157534289> **Contributor**\n1. **[Doremxn](https://discord.com/users/9489371710316954110)**\n2. **[Doremxn](https://discord.com/users/9489371710316954110)**\n\n<:eg_fire:1277919758133497857> **Organisation**\n1. **[Team Discronix](https://dsc.gg/discronix)**`
                )
                .setImage("https://cdn.discordapp.com/attachments/1277534826819223586/1277927652765995069/eleven.png?ex=66cf9b1f&is=66ce499f&hm=91d24962b0761987555a92968ad3dd617b933ff347bc8d489616f9aa18ec29ee&")
            ],
            components: [] // Remove the buttons after displaying the developer info
          });
          return;
        }

      // Handle music player buttons
      let playerButtonIds = [
        `${interaction.guildId}play_pause`,
        `${interaction.guildId}previous`,
        `${interaction.guildId}skip`,
        `${interaction.guildId}stop`,
        `${interaction.guildId}autoplay`,
      ];
      if (playerButtonIds.includes(interaction.customId))
        return client.emit("playerButtonClick", interaction);
      return;
    }
  },
};
