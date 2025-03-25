module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user')
        .addUserOption(option => option.setName('user').setDescription('User to kick').setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        
        try {
            await interaction.guild.members.kick(user);
            await interaction.reply(`${user.tag} has been kicked!`);
        } catch (error) {
            await interaction.reply('I could not kick the user.');
        }
    }
};
