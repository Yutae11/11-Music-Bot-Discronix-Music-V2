const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Shows bot's help menu",
  execute: async (client, message, args) => {
    const endImageUrl = "https://your-image-url.com/end-image.png"; // Replace with your desired image URL

    // Main help menu embed
    const embed = new EmbedBuilder()
      .setColor(`#07f7fa`)
      .setAuthor({
        name: client.user.username,
        iconURL: (client.user.displayAvatarURL()), // Replace with your bot's avatar URL
      })
      .setDescription(
        "<:eg_wave:1277919745114378341> **A minimalistic music bot with a lot of features.**\n\n" +
        "<:eg_discovery:1277919747035500635> **Command Categories ~**\n" +
        "> <:1275390609749966921:1277541383179210823> **Music**\n" +
        "> <:eg_premium:1277919796700123186> **Filters**\n" +
        "> <:eg_star:1277919777762967564> **Radio**\n" +
        "> <:eg_setting:1277919764605304935> **Config**\n" +
        "> <:eg_fire:1277919758133497857> **Playlist**\n" +
        "> <:eg_question:1277919767440789547>** Misc**\n\n" +
        "<:eg_link:1277919741381447681> **Links ~**\n" +
        "> **[Team Discronix](https://dsc.gg/discronix) | [Invite Me](https://discord.com/oauth2/authorize?client_id=1215354057246511104&permissions=8&integration_type=0&scope=bot)**"
      )
      .setFooter({
        text: `Thank you ${message.author.username} for using me. `,
        iconURL: message.member.displayAvatarURL(),
      })
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())

      .setImage('https://cdn.discordapp.com/attachments/1188669877985222677/1271783939236958238/20240810_155952.jpg?ex=66e02597&is=66ded417&hm=79a3b3701ceb90b3d9b68269a1e4766ae95a26bf5fe5ba89480211306a1ad68a&');

    // Create select menu
    let menu = new StringSelectMenuBuilder()
      .setCustomId("help-menu")
      .setPlaceholder("Browse Commands Of Melodify")
      .addOptions([
    {
        label: 'Music',
        value: 'music',
        description: 'View Music Commands',
        emoji: '<:1275390609749966921:1277541383179210823>',
      },
      {
        label: 'Radio',
        value: 'radio',
        description: 'View Radio Command',
        emoji: '<:eg_star:1277919777762967564>',
      },
        {
          label: 'Filters',
          value: 'filters',
          description: 'View Filter Command',
          emoji: '<:eg_premium:1277919796700123186>',
        },
      {
        label: 'Config',
        value: 'config',
        description: 'View Config Commands',
        emoji: '<:eg_setting:1277919764605304935>',
      },
      {
        label: 'Premium',
        value: 'playlist',
        description: 'View Premium Commands',
        emoji: '<:eg_fire:1277919758133497857>',
      },
      {
        label: 'Misc',
        value: 'misc',
        description: 'View Misc Commands',
        emoji: '<:eg_question:1277919767440789547>',
      },
    ]);

    const selectMenu = new ActionRowBuilder().addComponents(menu);

    // Send initial message
    const m = await message.reply({
      embeds: [embed],
      components: [selectMenu],
    });

    // Interaction filter
    const filter = (interaction) => interaction.user.id === message.author.id;

    // Create collector
    const collector = m.createMessageComponentCollector({ filter, time: 60000 });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();
      const categoryValue = interaction.values[0];

      let commandsEmbed;

      // Commands for each category
      if (categoryValue === "music") {
        commandsEmbed = new EmbedBuilder()
          .setColor(0x1e90ff)
          .setTitle("<:1275390609749966921:1277541383179210823> Music Commands")
          .setDescription(
    "`autoplay`, `clear`, `grab`, `join`, `leave`, `loop`, `nowplaying`, `pause`, `play`, `previous`, `queue`, `radio`, `rejoin`, `remove`, `resume`, `search`, `seek`, `shuffle`, `similar`, `skip`, `stop`, `volume`\n\n"
)

        .setFooter({
          text: `Thanks For Choosing Melodify.`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();  // This will add the current timestamp

      } else if (categoryValue === "filters") {
        commandsEmbed = new EmbedBuilder()
          .setColor(0x1e90ff)
          .setTitle("<:eg_premium:1277919796700123186> Filters Commands")
          .setDescription(
            "`filter`\n\n" )
        .setFooter({
          text: `Thanks For Choosing Melodify.`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();  // This will add the current timestamp

      } else if (categoryValue === "config") {
        commandsEmbed = new EmbedBuilder()
          .setColor(0x1e90ff)
          .setTitle("<:eg_setting:1277919764605304935> Config Commands")
          .setDescription(
            "`247`, `announce`, `prefix`\n\n" )
        .setFooter({
          text: `Thanks For Choosing Melodify.`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();  // This will add the current timestamp

      } else if (categoryValue === "playlist") {
        commandsEmbed = new EmbedBuilder()
          .setColor(0x1e90ff)
          .setTitle("<:eg_fire:1277919758133497857> premium Commands")
          .setDescription(
            "`generate`, `redeem`, `removepremium`,`buy`\n\n" )
        .setFooter({
          text: `Thanks For Choosing Melodify.`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();  // This will add the current timestamp

      } else if (categoryValue === "misc") {
        commandsEmbed = new EmbedBuilder()
          .setColor(0x1e90ff)
          .setTitle("<:eg_question:1277919767440789547> Misc Commands")
          .setDescription(
            "`avatar`, `help`, `invite`, `ping`,`say`,`stats`,`support`,`vote`,`about`\n\n" )
        .setFooter({
          text: `Thanks For Choosing Melodify.`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();  // This will add the current timestamp

      } else if (categoryValue === "radio") {
        commandsEmbed = new EmbedBuilder()
          .setColor(0x1e90ff)
          .setTitle("<:eg_star:1277919777762967564> Radio Commands")
          .setDescription(
            "`radio`\n\n" )
        .setFooter({
          text: `Thanks For Choosing Melodify.`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();  // This will add the current timestamp

      }

      await m.edit({ embeds: [commandsEmbed] });
    });

    collector.on("end", async () => {
      await m.edit({ components: [] }).catch(() => {});
    });
  },
};
