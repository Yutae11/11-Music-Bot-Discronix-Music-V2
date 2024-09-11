/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const yt =
  /^(?:(?:(?:https?:)?\/\/)?(?:www\.)?)?(?:youtube\.com\/(?:[^\/\s]+\/\S+\/|(?:c|channel|user)\/\S+|embed\/\S+|watch\?(?=.*v=\S+)(?:\S+&)*v=\S+)|(?:youtu\.be\/\S+)|yt:\S+)$/i;

module.exports = {
  name: "play",
  aliases: ["p"],
  cooldown: "",
  category: "music",
  usage: "<uri / name / file>",
  description: "Play song via query",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: ["AttachFiles"],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (client, message, args, emoji) => {
    const { channel } = message.member.voice;
    const file = await message.attachments;
    const query = [...file]?.[0] ? [...file][0][1].attachment : args.join(" ");

    // Send loading message
    const loading = {
      embeds: [
        new client.embed().desc(
          `<a:GF_Loading_Google:1282636777743716405> **Making Best Environment For You...**`,
        ),
      ],
    };
    let x = await message.reply(loading).catch(() => {});

    if (!query) {
      await message
        .reply({
          embeds: [
            new client.embed().desc(
              `${emoji.bell} **No query! Try a radio: \`${client.prefix}radio\`**`,
            ),
          ],
        })
        .catch(() => {});
      return;
    }

    if (yt.test(query)) {
      if (
        !(await client.db.premium.get(`${client.user.id}_${message.author.id}`))
      )
        return await message
          .reply({
            embeds: [
              new client.embed().desc(
                `${emoji.warn} **This provider is against ToS** \n`,
              ),
            ],
          })
          .catch(() => {});

      x = await message
        .reply({
          embeds: [
            new client.embed().desc(
              `${emoji.warn} **This provider is against ToS!** \n` +
                `${emoji.bell} Retrieving metadata to play from a different source`,
            ),
          ],
        })
        .catch(() => {});
    }

    const player = await client.manager.createPlayer({
      voiceId: channel.id,
      textId: message.channel.id,
      guildId: message.guild.id,
      shardId: message.guild.shardId,
      loadBalancer: true,
      deaf: true,
    });

    const result = await player.search(query, {
      requester: message.author,
    });

    let noRes = {
      embeds: [
        new client.embed().desc(`${emoji.no} **No results found for query**`),
      ],
    };

    if (!result.tracks.length)
      return x
        ? await x.edit(noRes).catch(() => {})
        : await message.reply(noRes).catch(() => {});

    const tracks = result.tracks;

    // Shorten the title or playlist name if too long
    const shortenText = (text, length = 35) =>
      text.length > length ? text.substring(0, length - 3) + "..." : text;

    if (result.type === "PLAYLIST")
      for (let track of tracks) {
        await player.queue.add(track);
      }
    else {
      if (tracks[0].length < 10000)
        return message.reply({
          embeds: [
            new client.embed().desc(
              `${emoji.no} **Songs of duration less than \`30s\` cannot be played!**`,
            ),
          ],
        });
      await player.queue.add(tracks[0]);
    }

    let added =
      result.type === "PLAYLIST"
        ? {
            embeds: [
              new client.embed().desc(
                `<:Add:1282704334320304224> **${message.member} added ${tracks.length} songs from [${shortenText(
                  result.playlistName,
                )}](https://0.0) to the queue**`,
              ),
            ],
          }
        : {
            embeds: [
              new client.embed().desc(
                `<:Add:1282704334320304224> **${message.member} added [${shortenText(
                  tracks[0].title.replace("[", "").replace("]", ""),
                )}](${tracks[0].uri}) to the queue**`,
              ),
            ],
          };

    if (!player.playing && !player.paused) player.play();

    x
      ? await x.edit(added).catch(() => {})
      : await message.reply(added).catch(() => {});
  },
};
