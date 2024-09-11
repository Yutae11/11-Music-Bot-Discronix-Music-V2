/**
 * @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "nowplaying",
  aliases: ["now", "np"],
  cooldown: "",
  category: "music",
  usage: "",
  description: "See what's being played",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: true,
  queue: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (client, message, args, emoji) => {
    // Fetch the player instance for the guild
    let player = await client.getPlayer(message.guild.id);

    // Check if there's music currently playing
    if (!player || !player.queue.current) {
      return message.reply("No music is currently playing.");
    }

    // Get the current track details
    let track = player.queue.current;

    // Create the clickable song title link
    const trackTitle = track.uri
      ? `[${track.title}](${track.uri})`
      : track.title || 'Unknown Title';

    // Create an embed to display the 'Now Playing' information
    const embed = new EmbedBuilder()
      .setTitle('Now Playing')
      .setDescription(trackTitle) // Clickable link to the song
      .setColor('#07f7fa') // Embed color
      .addFields(
        { name: 'Duration:', value: track.isStream ? 'Live Stream' : new Date(track.length).toISOString().slice(11, 19), inline: true },
        { name: 'Track Author(s):', value: track.author || 'Unknown Artist', inline: true }
      )
      .setThumbnail(track.thumbnail || 'default_thumbnail_url_here') // Display the song's thumbnail
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      });

    // Send the embed with the song details
    await message.reply({
      embeds: [embed],
    }).catch(() => {});
  },
};
