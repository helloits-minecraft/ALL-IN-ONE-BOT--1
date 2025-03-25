module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('Check the number of invites for a user')
        .addUserOption(option => option.setName('user').setDescription('User to check invites for').setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        
        // Example logic, assuming a function `getInviteCount` to retrieve the count
        const inviteCount = await db.getInviteCount(user.id);
        await interaction.reply(`${user.tag} has ${inviteCount} invites.`);
    }
};
