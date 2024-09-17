const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "mention",
  run: async (client, message) => {
    const embed = new EmbedBuilder()
      .setDescription(`<:qt_kronix:1282509164291293267> Heyoo..!! - ${message.author}\n<a:flower:1281549564427632640> Prefix - \`${client.prefix}\`\n\nTry \`${client.prefix}help\` To Get The Command List.`)
      .setImage('https://cdn.discordapp.com/attachments/1188669877985222677/1271783939236958238/20240810_155952.jpg?ex=66e02597&is=66ded417&hm=79a3b3701ceb90b3d9b68269a1e4766ae95a26bf5fe5ba89480211306a1ad68a&')
      .setFooter({ text: 'made with love for y\'all ~ Doremxn',
                      iconURL: 'https://cdn.discordapp.com/emojis/1282510435668459592.png' // Replace with the actual image URL
                    })
      .setColor('#00FFCB');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Support Server')
        .setStyle(ButtonStyle.Link)
        .setURL('https://dsc.gg/discronix') // Updated with your support server link
    );

    await message.reply({ embeds: [embed], components: [row] }).catch(() => {});
  },
};
