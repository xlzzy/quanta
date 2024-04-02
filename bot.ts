// bot.ts

import { Client, Message } from 'discord.js';
import moderationCommands from './commands/moderation';
import nukeCommands from './commands/nuke';

export class Bot {
  private client: Client;
  private prefix: string;
  private ownerId: string; // Add a property to store your user ID

  constructor(prefix: string, ownerId: string) {
    this.client = new Client();
    this.prefix = prefix;
    this.ownerId = ownerId; // Store the provided owner ID
    this.setup();
  }

  private setup(): void {
    this.client.commands = new Map();
    this.client.on('message', this.handleMessage.bind(this));
    // Register moderation commands
    this.registerCommands(moderationCommands);
    // Register nuke commands
    this.registerCommands(nukeCommands);
  }

  private handleMessage(message: Message): void {
    if (message.author.bot) return;

    const content = message.content.trim();
    let args: string[];

    if (content.startsWith(this.prefix)) {
      args = content.slice(this.prefix.length).trim().split(/ +/);
    } else if (message.author.id === this.ownerId) { // Check if the author is the bot owner
      args = content.split(/ +/); // No prefix required for the bot owner
    } else {
      return;
    }

    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command = this.client.commands.get(commandName);
    if (command) {
      try {
        command.execute(message, args);
      } catch (error) {
        console.error('Error executing command:', error);
        message.channel.send('There was an error executing the command.');
      }
    }
  }

  private registerCommands(commands: Record<string, any>): void {
    for (const key in commands) {
      if (commands.hasOwnProperty(key)) {
        const command = commands[key];
        this.client.commands.set(command.name, command);
      }
    }
  }

  public login(token: string): void {
    this.client.login(token);
  }
}
