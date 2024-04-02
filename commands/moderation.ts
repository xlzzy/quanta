// moderation.ts

import { Command, GuildMember, Message, Permissions } from 'discord.js';

interface ModerationCommand extends Command {
  execute: (message: Message, args: string[]) => void;
}

const moderationCommands: Record<string, ModerationCommand> = {
  kick: {
    name: 'kick',
    description: 'Kicks a user from the server.',
    execute(message, args) {
      if (!message.member) return;

      const targetMember = message.mentions.members?.first() as GuildMember | undefined;
      if (!targetMember) {
        message.channel.send('You need to mention a user to kick.');
        return;
      }

      if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        message.reply('You do not have permission to use this command.');
        return;
      }

      if (!targetMember.kickable) {
        message.channel.send('Cannot kick this user.');
        return;
      }

      const reason = args.slice(1).join(' ');
      targetMember.kick(reason)
        .then(() => message.channel.send(`Successfully kicked ${targetMember.user.tag}.`))
        .catch(error => {
          console.error('Error kicking member:', error);
          message.channel.send('There was an error kicking the member.');
        });
    },
  },

  ban: {
    name: 'ban',
    description: 'Bans a user from the server.',
    execute(message, args) {
      if (!message.member) return;

      const targetMember = message.mentions.members?.first() as GuildMember | undefined;
      if (!targetMember) {
        message.channel.send('You need to mention a user to ban.');
        return;
      }

      if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        message.reply('You do not have permission to use this command.');
        return;
      }

      if (!targetMember.bannable) {
        message.channel.send('Cannot ban this user.');
        return;
      }

      const reason = args.slice(1).join(' ');
      targetMember.ban({ reason })
        .then(() => message.channel.send(`Successfully banned ${targetMember.user.tag}.`))
        .catch(error => {
          console.error('Error banning member:', error);
          message.channel.send('There was an error banning the member.');
        });
    },
  },

  // Add more moderation commands as needed...
};

export default moderationCommands;
