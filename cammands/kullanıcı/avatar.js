const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
  const avatarEmbed = new EmbedBuilder()
    .setTitle(`${user.tag} Avatar`)
    .setColor('Random')
    .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [avatarEmbed] });
};

exports.help = {
  name: "avatar",
  kategori: "Kullanıcı",
  açıklama: "Kullanıcının avatarını gösterir"
};
