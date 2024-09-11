/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const voucher_codes = require("voucher-code-generator");

module.exports = {
  name: "premium",
  aliases: [],
  cooldown: "",
  category: "config",
  usage: "",
  description: "Shows your premium status or generates a premium code",
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
    let [premiumUser, premiumGuild, owner, admin] = await Promise.all([
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.guild.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
    ]);

    const cmd = args[0] ? args[0].toLowerCase() : null;
    const type = args[1] ? args[1].toLowerCase() : null;
    const duration = args[2] || 7; // Default duration to 7 if not specified

    switch (cmd) {
      case "gen":
        if (!owner && !admin)
          return await message.reply({
            embeds: [
              new client.embed().desc(
                `${emoji.admin} **Only my Owner/s and Admin/s can use this command**`,
              ),
            ],
          });

        let code;
        switch (type) {
          case "guild":
            code = voucher_codes.generate({
              pattern: `Melodify-####-GUILD-DUR${duration}`,
            });
            break;
          default:
            code = voucher_codes.generate({
              pattern: `Melodify-#####-USER-DUR${duration}`,
            });
            break;
        }
        code = code[0].toUpperCase(); // Get the first generated code and convert to uppercase
        await client.db.vouchers.set(code, true); // Store the code in the database

        await message
          .reply({
            embeds: [
              new client.embed().desc(
                `${emoji.free} **Here's your generated code**\n` +
                `${emoji.bell} **Usage :** ${client.prefix}redeem your_code\n` +
                `${emoji.rich} ||${code}||\n`,
              ),
            ],
          })
          .catch(() => {});
        break;
      // Handle other cases or commands if necessary
      default:
        // Optional: Handle other commands or provide default responses
        break;
    }
  },
};
