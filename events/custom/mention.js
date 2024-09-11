const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "mention",
  run: async (client, message) => {
    const embed = new EmbedBuilder()
      .setDescription(`<:qt_kronix:1282509164291293267> Heyoo..!! - ${message.author}\n<a:flower:1281549564427632640> Prefix - \`${client.prefix}\`\n\nTry \`${client.prefix}help\` To Get The Command List.`)
      .setImage('https://media.discordapp.net/attachments/1277534826819223586/1277927652765995069/eleven.png?ex=66cef25f&is=66cda0df&hm=b09e776e030ce9738bf735767825ce822eb36e575ab7007d5a102fb8e9dfbb8e&')
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
