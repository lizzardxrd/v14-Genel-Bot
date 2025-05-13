const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const guild = message.guild;
  
  const createdAt = Math.floor(guild.createdTimestamp / 1000);
  
  const botCount = guild.members.cache.filter(member => member.user.bot).size;
  const memberCount = guild.memberCount - botCount;
  
  const verificationLevels = {
    0: "Yok",
    1: "Düşük",
    2: "Orta",
    3: "Yüksek",
    4: "Çok Yüksek"
  };
  
  const embed = new EmbedBuilder()
    .setTitle(`${guild.name} Sunucu Bilgileri`)
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setColor('Random')
    .addFields(
      { name: 'ID', value: guild.id, inline: true },
      { name: 'Sahip', value: `<@${guild.ownerId}>`, inline: true },
      { name: 'Oluşturulma Tarihi', value: `<t:${createdAt}:F> (<t:${createdAt}:R>)`, inline: false },
      { name: 'Üye Sayısı', value: `Toplam: ${guild.memberCount}\nKullanıcı: ${memberCount}\nBot: ${botCount}`, inline: true },
      { name: 'Kanal Sayısı', value: `Toplam: ${guild.channels.cache.size}\nText: ${guild.channels.cache.filter(c => c.type === 0).size}\nSes: ${guild.channels.cache.filter(c => c.type === 2).size}\nKategori: ${guild.channels.cache.filter(c => c.type === 4).size}`, inline: true },
      { name: 'Rol Sayısı', value: guild.roles.cache.size.toString(), inline: true },
      { name: 'Emoji Sayısı', value: guild.emojis.cache.size.toString(), inline: true },
      { name: 'Boost Sayısı', value: guild.premiumSubscriptionCount.toString(), inline: true },
      { name: 'Doğrulama Seviyesi', value: verificationLevels[guild.verificationLevel], inline: true }
    )
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  if (guild.bannerURL()) {
    embed.setImage(guild.bannerURL({ size: 4096 }));
  }
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "sunucu-bilgi",
  kategori: "Kullanıcı",
  açıklama: "Sunucunun bilgilerini gösterir"
};
