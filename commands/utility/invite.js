const { MessageEmbed } = require('discord.js');

// Command to check how many invites a user has
async function checkInvites(message) {
    const user = message.author;
    const invites = await message.guild.invites.fetch();
    let count = 0;

    invites.forEach(inv => {
        if (inv.inviter && inv.inviter.id === user.id) {
            count += inv.uses;
        }
    });

    message.reply(`You have invited ${count} members.`);
}

// Command to check who invited a specific user
async function checkInviter(message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

    if (!member) {
        return message.reply('Please mention a user or provide their ID.');
    }

    const invites = await message.guild.invites.fetch();
    let inviter = null;

    invites.forEach(inv => {
        if (inv.uses > 0 && inv.inviter) {
            if (inv.code === member.user.id) {
                inviter = inv.inviter;
            }
        }
    });

    if (inviter) {
        message.reply(`${member.user.tag} was invited by ${inviter.tag}.`);
    } else {
        message.reply(`Could not find inviter for ${member.user.tag}.`);
    }
}

// Command to show a list of members invited by the user
async function checkInvited(message) {
    const user = message.author;
    const invites = await message.guild.invites.fetch();
    let invitedList = [];

    invites.forEach(inv => {
        if (inv.inviter && inv.inviter.id === user.id) {
            invitedList.push(inv.code);
        }
    });

    if (invitedList.length > 0) {
        message.reply(`You invited the following members: ${invitedList.join(', ')}`);
    } else {
        message.reply('You haven\'t invited anyone yet.');
    }
}

// Export commands
module.exports = {
    checkInvites,
    checkInviter,
    checkInvited,
};

