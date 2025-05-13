const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
    return message.channel.send("Bu komutu kullanmak için **Üyeleri Yasakla** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
    return message.channel.send("Yasak kaldırma yetkim yok!");
  }
  
  if (!args[0]) {
    return message.channel.send("Yasağı kaldırılacak kullanıcının ID'sini belirtmelisin!");
  }
  
  const userId = args[0];
  
  if (isNaN(userId)) {
    return message.channel.send("Geçerli bir kullanıcı ID'si belirtmelisin!");
  }
  
  try {
    const banList = await message.guild.bans.fetch();
    
    if (!banList.has(userId)) {
      return message.channel.send("Bu kullanıcı sunucudan yasaklanmamış!");
    }
    
    const bannedUser = banList.get(userId).user;
    
    await message.guild.members.unban(userId, `${message.author.tag} tarafından yasak kaldırıldı`);
    
    const embed = new EmbedBuilder()
      .setTitle("✅ Kullanıcının Yasağı Kaldırıldı")
      .setColor("Green")
      .setThumbnail(bannedUser.displayAvatarURL())
      .addFields(
        { name: 'Yasağı Kaldırılan Kullanıcı', value: `${bannedUser.tag} (${bannedUser.id})`, inline: false },
        { name: 'Yasağı Kaldıran Yetkili', value: `${message.author.tag} (${message.author.id})`, inline: false },
        { name: 'Tarih', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false }
      )
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send(`Kullanıcının yasağı kaldırılırken bir hata oluştu: ${error.message}`);
  }
};

exports.help = {
  name: "unban",
  kategori: "Moderasyon",
  açıklama: "ID ile yasağı kaldırır"
};
