require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

// Create a new client instance with necessary intents
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// Define the slash commands
const commands = [
    new SlashCommandBuilder()
        .setName('setupwelcome')
        .setDescription('Sets the welcome channel and role.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send welcome messages in')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to assign to new members')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('test')
        .setDescription('Sends a test welcome message to you.')
];

// Register slash commands for a specific guild
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// Listen for when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Check if the user has Admin permissions
function isAdmin(interaction) {
    return interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
}

// Handle slash command interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // Admin permission check
    if (!isAdmin(interaction)) {
        await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        return;
    }

    // /setupwelcome command
    if (interaction.commandName === 'setupwelcome') {
        await interaction.deferReply();

        const channel = interaction.options.getChannel('channel');
        const role = interaction.options.getRole('role');

        // Your logic to store configuration here (in memory or database)

        await interaction.editReply(`Welcome channel set to <#${channel.id}> and default role set to <@&${role.id}>.`);
    }

    // /test command to send a test welcome message
    if (interaction.commandName === 'test') {
        await interaction.deferReply({ ephemeral: true });

        // Create a welcome embed message
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('Test Welcome to the Server!')
            .setDescription(`Hello <@${interaction.user.id}>! We're glad to have you here. 🎉`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                { name: 'Username', value: `${interaction.user.tag}`, inline: true },
                { name: 'User ID', value: `${interaction.user.id}`, inline: true },
                { name: 'Account Created', value: `<t:${Math.floor(interaction.user.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setFooter({ text: 'This is a test welcome message.', iconURL: interaction.guild.iconURL() });

        await interaction.editReply({ embeds: [welcomeEmbed] });
    }
});

// Log in the bot with your token
client.login(process.env.DISCORD_TOKEN);
