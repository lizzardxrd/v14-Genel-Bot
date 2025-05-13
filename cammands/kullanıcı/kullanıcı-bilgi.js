const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const user = member.user;
  
  const createdAt = Math.floor(user.createdTimestamp / 1000);
  const joinedAt = Math.floor(member.joinedTimestamp / 1000);
  
  const userRoles = member.roles.cache
    .filter(role => role.id !== message.guild.id)
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, 10)
    .join(', ') || 'Yok';
  
  const embed = new EmbedBuilder()
    .setTitle(`${user.tag} Bilgileri`)
    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .setColor('Blue')
    .addFields(
      { name: 'ID', value: user.id, inline: true },
      { name: 'Sunucu İsmi', value: member.displayName, inline: true },
      { name: 'Hesap Oluşturulma', value: `<t:${createdAt}:F> (<t:${createdAt}:R>)`, inline: false },
      { name: 'Sunucuya Katılma', value: `<t:${joinedAt}:F> (<t:${joinedAt}:R>)`, inline: false },
      { name: `Roller [${member.roles.cache.size - 1}]`, value: userRoles, inline: false }
    )
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "kullanıcı-bilgi",
  kategori: "Kullanıcı",
  açıklama: "Kullanıcının bilgilerini listeler"
};
