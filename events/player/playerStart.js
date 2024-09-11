const { Client, GatewayIntentBits } = require('discord.js');
const { VibeSync } = require('vibesync');
const { RateLimitManager } = require("@sapphire/ratelimits");
const { Dynamic } = require('musicard');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const adCooldownManager = new RateLimitManager(600000);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const vcStatus = new VibeSync(client); // VibeSync setup

async function createMusicCard(track, progress) {
    const musicard = await Dynamic({
        thumbnailImage: track?.thumbnail || 'default_thumbnail_url_here',
        backgroundColor: '#0e0e0e',
        progress: progress,
        progressColor: '#585454',
        progressBarColor: '#242323',
        name: track?.title || 'Something Good',
        nameColor: '#585454',
        author: `By ${track?.author || 'Unknown Artist'}`,
        authorColor: '#F2F3F4',
    });

    return new AttachmentBuilder(musicard, { name: 'musicard.png' });
}

// Helper function to format duration
function formatDuration(ms) {
    if (isNaN(ms) || ms <= 0) return 'Unknown'; // Handle invalid or zero duration

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

module.exports = {
    name: "playerStart",
    run: async (client, player, track) => {
        if (!track?.title) return;

        let channel = await client.channels.cache.get(player.textId);

        let progress = track.isStream
            ? 50
            : (player.position / player.queue.current.length) * 100;

        const musicCard = await createMusicCard(track, progress);

        // Check the title length and add ellipsis if it's too long
        const maxTitleLength = 35; // Reduced maximum characters for the title
        const songTitle = track.title.length > maxTitleLength
            ? `${track.title.substring(0, maxTitleLength)}...`
            : track.title;

        // Format the duration
        const duration = formatDuration(track.duration);

        const embed = new EmbedBuilder()
            .setDescription(
                `<:StatusRole:1282317187985702912> Now Playing: [${songTitle}](${track.uri})\n` +
                `<:team:1282317574129979434> Requested by: <@${track.requester.id}>`
            )
            .setColor('#07f7fa')
            .setImage('attachment://musicard.png') // Embed now has description and image
            .setFooter({ text: `Melodify ~ Best Music Experience !` }); // Adding footer with duration

        const components = [
            {
                type: 1, // Action row
                components: [
                    {
                        type: 2,
                        emoji: '⏪', // Back emoji
                        style: 2, // Secondary
                        custom_id: 'back',
                    },
                    {
                        type: 2,
                        emoji: '⏸️', // Pause emoji
                        style: 2, // Secondary
                        custom_id: 'halt',
                    },
                    {
                        type: 2,
                        emoji: '⏩', // Skip emoji
                        style: 2, // Secondary
                        custom_id: 'skip',
                    },
                    {
                        type: 2,
                        emoji: '🔁', // Repeat emoji
                        style: 2, // Secondary
                        custom_id: 'auto',
                    },
                    {
                        type: 2,
                        emoji: '⏹️', // Stop emoji
                        style: 4, // Danger
                        custom_id: 'stop',
                    },
                ],
            },
        ];

        const msg = await channel
            ?.send({
                embeds: [embed],
                files: [musicCard],
                components: components,
            })
            .catch(() => {});

        if (msg) player.data.set("message", msg);

        // Update the voice channel status using VibeSync
        const channelId = player.voiceId;  // Assuming you have the voice channel ID from the player
        const status = `Now Playing: ${songTitle}`;

        vcStatus.setVoiceStatus(channelId, status)
            .then(() => console.log('Voice channel status updated successfully'))
            .catch(err => console.error('Failed to update voice channel status:', err));

        await client.webhooks.player
            .send({
                username: client.user.username,
                avatarURL: client.user.displayAvatarURL(),
                embeds: [
                    new client.embed().desc(
                        `**Playing** ${track?.title
                            .replace(/[^a-zA-Z0-9\s]/g, "")
                            .substring(0, 35)} in [ ${client.guilds.cache.get(
                            player.guildId,
                        )} ]`,
                    ),
                ],
            })
            .catch(() => {});
    },
};
