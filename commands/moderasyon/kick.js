const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
    return message.channel.send("Bu komutu kullanmak için **Üyeleri At** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) {
    return message.channel.send("Üyeleri atma yetkim yok!");
  }
  
  if (!args[0]) {
    return message.channel.send("Atılacak bir kullanıcı belirtmelisin!");
  }
  
  const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const reason = args.slice(1).join(' ') || "Sebep belirtilmedi";
  
  if (!target) {
    return message.channel.send("Geçerli bir kullanıcı belirtmelisin!");
  }
  
  if (target.id === message.author.id) {
    return message.channel.send("Kendini atamazsın!");
  }
  
  if (target.id === client.user.id) {
    return message.channel.send("Kendimi atamam!");
  }
  
  if (target.id === message.guild.ownerId) {
    return message.channel.send("Sunucu sahibini atamazsın!");
  }
  
  if (target.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) {
    return message.channel.send("Bu kullanıcının rolü senin rolünden yüksek veya aynı seviyede!");
  }
  
  if (!target.kickable) {
    return message.channel.send("Bu kullanıcıyı atamam!");
  }
  
  try {
    await target.kick(`${message.author.tag} tarafından atıldı: ${reason}`);
    
    const embed = new EmbedBuilder()
      .setTitle("✅ Kullanıcı Atıldı")
      .setColor("Orange")
      .setThumbnail(target.user.displayAvatarURL())
      .addFields(
        { name: 'Atılan Kullanıcı', value: `${target.user.tag} (${target.id})`, inline: false },
        { name: 'Atan Yetkili', value: `${message.author.tag} (${message.author.id})`, inline: false },
        { name: 'Sebep', value: reason, inline: false },
        { name: 'Tarih', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false }
      )
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send(`Kullanıcı atılırken bir hata oluştu: ${error.message}`);
  }
};

exports.help = {
  name: "kick",
  kategori: "Moderasyon",
  açıklama: "Kullanıcıyı sunucudan atar"
};
