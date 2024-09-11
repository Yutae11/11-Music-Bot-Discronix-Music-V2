/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "guildCreate",
  run: async (client, guild) => {
    if (!guild.name) return;

    const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

    // Message content similar to the screenshot you provided
    let description = `<:tick:1282516070736990270> \`${client.user.username}\` has been successfully added to \`${guild.name}\`.\n\n` +
      `<:set:1282516073077411972> You can report any issues at my **[Support Server](${client.support})** or reach out to my **[Developers](${client.support})** for more information.`;

    let embed = new client.embed()
      .setTitle(`Thank you for choosing ${client.user.username}!`)
      .setDescription(description)
      .setColor("#2f3136"); // Dark color for the embed background

    try {
      // Fetch the guild owner and send them the message
      let owner = await client.users.fetch(guild.ownerId);

      await owner.send({
        embeds: [embed],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel('Support Server')
              .setStyle(ButtonStyle.Link)
              .setURL(`${client.support}`),
            new ButtonBuilder()
              .setLabel('Get Your Own Melodify')
              .setStyle(ButtonStyle.Link)
              .setURL(`${client.support}`)
          ),
        ],
      }).catch(() => {});
    } catch (e) {
      console.error(`Could not send message to guild owner: ${e}`);
    }

    // Optionally send a webhook message when the bot joins a new server
    await client.webhooks.server.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [
        new client.embed()
          .setDescription(`**Joined** ${guild.name} [${guild.id}] [${guild.memberCount}]`)
          .setColor("#7ffa2d"), // Green color to indicate a successful join
      ],
    }).catch(() => {});
  },
};
