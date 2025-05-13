const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
    return message.channel.send("Bu komutu kullanmak için **Üyeleri Yasakla** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
    return message.channel.send("Üyeleri yasaklama yetkim yok!");
  }
  
  if (!args[0]) {
    return message.channel.send("Yasaklanacak bir kullanıcı belirtmelisin!");
  }
  
  const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const reason = args.slice(1).join(' ') || "Sebep belirtilmedi";
  
  if (!target) {
    return message.channel.send("Geçerli bir kullanıcı belirtmelisin!");
  }
  
  if (target.id === message.author.id) {
    return message.channel.send("Kendini yasaklayamazsın!");
  }
  
  if (target.id === client.user.id) {
    return message.channel.send("Kendimi yasaklayamam!");
  }
  
  if (target.id === message.guild.ownerId) {
    return message.channel.send("Sunucu sahibini yasaklayamazsın!");
  }
  
  if (target.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) {
    return message.channel.send("Bu kullanıcının rolü senin rolünden yüksek veya aynı seviyede!");
  }
  
  if (!target.bannable) {
    return message.channel.send("Bu kullanıcıyı yasaklayamam!");
  }
  
  try {
    await target.ban({ reason: `${message.author.tag} tarafından yasaklandı: ${reason}` });
    
    const embed = new EmbedBuilder()
      .setTitle("✅ Kullanıcı Yasaklandı")
      .setColor("Red")
      .setThumbnail(target.user.displayAvatarURL())
      .addFields(
        { name: 'Yasaklanan Kullanıcı', value: `${target.user.tag} (${target.id})`, inline: false },
        { name: 'Yasaklayan Yetkili', value: `${message.author.tag} (${message.author.id})`, inline: false },
        { name: 'Sebep', value: reason, inline: false },
        { name: 'Tarih', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false }
      )
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send(`Kullanıcı yasaklanırken bir hata oluştu: ${error.message}`);
  }
};

exports.help = {
  name: "ban",
  kategori: "Moderasyon",
  açıklama: "Kullanıcıyı sunucudan yasaklar"
};
