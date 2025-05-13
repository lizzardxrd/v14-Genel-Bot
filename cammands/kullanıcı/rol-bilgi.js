const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!args.length) {
    return message.channel.send("Bir rol belirtmelisin!");
  }
  
  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase());
  
  if (!role) {
    return message.channel.send("Belirtilen rol bulunamadı!");
  }
  
  const createdAt = Math.floor(role.createdTimestamp / 1000);
  const hexColor = role.hexColor;
  
  const memberCount = role.members.size;
  
  const embed = new EmbedBuilder()
    .setTitle(`${role.name} Rol Bilgisi`)
    .setColor(hexColor)
    .addFields(
      { name: 'ID', value: role.id, inline: true },
      { name: 'İsim', value: role.name, inline: true },
      { name: 'Renk', value: hexColor, inline: true },
      { name: 'Pozisyon', value: `${role.position}/${message.guild.roles.cache.size}`, inline: true },
      { name: 'Üye Sayısı', value: memberCount.toString(), inline: true },
      { name: 'Etiketlenebilir', value: role.mentionable ? 'Evet' : 'Hayır', inline: true },
      { name: 'Oluşturulma Tarihi', value: `<t:${createdAt}:F> (<t:${createdAt}:R>)`, inline: false }
    )
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "rol-bilgi",
  kategori: "Kullanıcı",
  açıklama: "Belirtilen rol hakkında bilgi verir"
};
