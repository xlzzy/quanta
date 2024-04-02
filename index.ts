// index.ts

import { Bot } from './bot';

// Define your custom prefix here
const CUSTOM_PREFIX = '!'; // Example custom prefix

// Define your user ID here
const OWNER_ID = 'YOUR_USER_ID_HERE';

// Create a new instance of the Bot class with the custom prefix and your user ID
const bot = new Bot(CUSTOM_PREFIX, OWNER_ID);

// Log in with your bot token
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
bot.login(BOT_TOKEN);
