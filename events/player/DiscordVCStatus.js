/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { VibeSync } = require('vibesync');

class DiscordVCStatus {
  constructor(client) {
    this.vcStatus = new VibeSync(client);
  }

  /**
   * Updates the voice channel status.
   * @param {string} channelId - The ID of the voice channel to update.
   * @param {string} status - The status to set for the voice channel.
   * @returns {Promise<void>}
   */
  async setVoiceStatus(channelId, status) {
    try {
      await this.vcStatus.setVoiceStatus(channelId, status);
      console.log(`Voice channel status updated to: ${status}`);
    } catch (error) {
      console.error('Failed to update voice channel status:', error);
    }
  }
}

module.exports = DiscordVCStatus;
