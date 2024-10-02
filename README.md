# Discord Welcome Bot
# Developed by Playboii Driizzyy

## Overview

This is a Discord bot built using `discord.js` that welcomes new users to the server. The bot provides two main slash commands:
- `/setupwelcome`: Sets the welcome channel and default role for new users.
- `/test`: Sends a test welcome message to the admin running the command.

## Setup

1. Install dependencies:
    ```
    npm install
    ```

2. Create a `.env` file in the project root with the following content:
    ```
    DISCORD_TOKEN=your-discord-bot-token
    CLIENT_ID=your-bot-client-id
    GUILD_ID=your-guild-id
    ```

3. Run the bot:
    ```
    node index.js
    ```

## Commands

- **/setupwelcome**
    - Admin-only command to set the welcome channel and role for new users.
    - Usage: `/setupwelcome <channel> <role>`

- **/test**
    - Admin-only command to send a test welcome message to the admin using the command.

## Notes

Make sure you have set the necessary permissions for the bot in the Discord Developer Portal (e.g., `GUILD_MEMBERS` intent) and that the bot has sufficient privileges in the server to manage roles and send messages.

SUPPORT: Join my discord linked below
https://discord.gg/spinnablockrp

