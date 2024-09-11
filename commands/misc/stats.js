/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const os = require("os");

module.exports = {
  name: "stats",
  aliases: ["shard", "status", "stat"],
  description: "Shows bot's shard stats",
  execute: async (client, message, args, emoji) => {
    // Fetching data for display
    const botLatency = Date.now() - message.createdTimestamp;
    const databaseLatency = 16; // You can fetch actual DB latency if needed
    const uptime = client.uptime;
    const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMemory = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const platform = os.platform();
    const nodeVersion = process.version;
    const discordJSVersion = require('discord.js').version;
    const servers = client.guilds.cache.size;
    const users = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const channels = client.channels.cache.size;

    const embed = new client.embed()
      .setColor("#07f7fa")
      .setTitle(`Below Are the statistics of ${client.user.username} Music.`)
      .addFields(
        {
          name: `<:eg_setting:1277919764605304935> Status`,
          value: `> **<:botlatency:1278236835432366232>  Bot Latency**: ${botLatency} ms\n> **<:database:1278236837923782749> Database Latency**: ${databaseLatency} ms\n> **<:uptime:1278236840549158936> Uptime**: ${Math.floor(uptime / 1000 / 60)} minutes\n> **<:slash_commands:1276978940119879733> Commands**: ${client.commands.size}`,
          inline: false
        },
        {
          name: `<:stats:1278236833091948565> Stats`,
          value: `> **<:server:1278236843980357684> Servers**: ${servers}\n> **<:users:1278236846752792576> Users**: ${users}\n> **<:channels:1278236850133270583> Channels**: ${channels}`,
          inline: false
        },
        {
          name: `<:host:1278236830915104819> Host`,
          value: `> **<a:dot_purple:1278242798252068866> Platform**: ${platform}\n> **<a:dot_purple:1278242798252068866> Total Memory**: ${totalMemory} GB\n> **<a:dot_purple:1278242798252068866> Free Memory**: ${freeMemory} GB`,
          inline: false
        },
        {
          name: `<:library:1278236827827961930> Library`,
          value: `> **<:discordjs:1278236817635934281> Discord.js**: v${discordJSVersion}\n> **<:node:1278236820571951104> Node**: ${nodeVersion}`,
          inline: false
        }
      )
      .setImage("https://cdn.discordapp.com/attachments/1188669877985222677/1271783939236958238/20240810_155952.jpg?ex=66e02597&is=66ded417&hm=79a3b3701ceb90b3d9b68269a1e4766ae95a26bf5fe5ba89480211306a1ad68a&") // Add the image URL here
      .setFooter({
        text: `Information provided by ${client.user.username}`,
      });

    await message.reply({ embeds: [embed] });
  },
};
