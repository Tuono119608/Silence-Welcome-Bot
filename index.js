const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const WELCOME_CHANNEL_NAME = 'welcome'; // change if needed

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === WELCOME_CHANNEL_NAME
  );

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle('Welcome! 👋')
    .setDescription(`Hey ${member}, welcome to **${member.guild.name}**!`)
    .setColor(0x5865F2)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: 'Enjoy your stay!' });

  channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);
