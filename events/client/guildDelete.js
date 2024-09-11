/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "guildDelete",
  run: async (client, guild) => {
    if (!guild.name) return;

    // Message content similar to the screenshot
    let description = `<:eg_excl:1277919831588474962> **${client.user.username}** was just removed from **${guild.name}**.\n` +
      `<:eg_excl:1277919831588474962> Sorry for any bad experience(s) you had with me!\n` +
      `<:eg_excl:1277919831588474962> Please leave feedback or report any issues at my **[Support Server](${client.support})**, so we can fix or address them as soon as possible.`;

    // Embed structure
    let embed = new client.embed()
      .setTitle(`Oops! ${client.user.username} was removed!`)
      .setDescription(description)
      .setColor("#e63939") // Red color to indicate bot removal
      .setFooter({ text: `Removed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}` });

    try {
      console.log(`Attempting to send DM to the owner of ${guild.name} (ID: ${guild.ownerId})`);

      // Fetch the guild owner and send them the message
      let owner = await client.users.fetch(guild.ownerId).catch(e => {
        console.error("Failed to fetch the guild owner:", e);
        return null;
      });

      if (owner) {
        console.log(`Sending DM to ${owner.tag} (ID: ${owner.id})`);

        await owner.send({
          embeds: [embed],
        }).catch(err => {
          console.error(`Failed to send DM to ${owner.tag}:`, err);
        });
      } else {
        console.log(`Could not fetch owner for ${guild.name}.`);
      }

    } catch (e) {
      console.error(`Could not fetch the guild owner for ${guild.name}:`, e);
    }

    // Optional: Send a webhook message to log the bot's removal
    await client.webhooks.server.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [
        new client.embed()
          .setDescription(`**Left** ${guild.name} [${guild.id}] [${guild.memberCount}]`)
          .setColor("#e63939"), // Red color to indicate bot removal
      ],
    }).catch(() => {});
  },
};
