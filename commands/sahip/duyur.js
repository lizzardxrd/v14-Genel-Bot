const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.ownerID) {
    return message.channel.send("Bu komutu sadece bot sahibi kullanabilir.");
  }
  
  if (!args.length) {
    return message.channel.send("Duyuru mesajını belirtmelisin!");
  }
  
  const announcement = args.join(" ");
  
  
  const allMembers = [];
  client.guilds.cache.forEach(guild => {
    guild.members.cache.forEach(member => {
      if (!member.user.bot && !allMembers.includes(member.id)) {
        allMembers.push(member.id);
      }
    });
  });
  
  const embed = new EmbedBuilder()
    .setTitle("📢 Bot Duyurusu")
    .setDescription(announcement)
    .setColor("Blue")
    .setFooter({ text: `${client.user.username} | ${client.config.version}`, iconURL: client.user.displayAvatarURL() })
    .setTimestamp();
  
  const statusEmbed = new EmbedBuilder()
    .setTitle("📨 Duyuru Gönderiliyor")
    .setDescription(`Toplam ${allMembers.length} kullanıcıya duyuru gönderiliyor...`)
    .setColor("Blue")
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  const statusMessage = await message.channel.send({ embeds: [statusEmbed] });
  
  let successCount = 0;
  let failedCount = 0;
  
  for (let i = 0; i < allMembers.length; i++) {
    try {
      const memberId = allMembers[i];
      const user = await client.users.fetch(memberId);
      
      await user.send({ embeds: [embed] });
      successCount++;
      
      
      if (i % 10 === 0 && i > 0) {
        await new Promise(resolve => setTimeout(resolve, 100000)); 
        
        const progressEmbed = new EmbedBuilder()
          .setTitle("📨 Duyuru Gönderiliyor")
          .setDescription(`İlerleme: ${i}/${allMembers.length}\nBaşarılı: ${successCount}\nBaşarısız: ${failedCount}`)
          .setColor("Blue")
          .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
          .setTimestamp();
        
        await statusMessage.edit({ embeds: [progressEmbed] });
      }
    } catch (error) {
      failedCount++;
      console.error(`${allMembers[i]} ID'li kullanıcıya mesaj gönderilemedi: ${error.message}`);
    }
  }
  
  const finalEmbed = new EmbedBuilder()
    .setTitle("✅ Duyuru Tamamlandı")
    .setDescription(`Toplam: ${allMembers.length}\nBaşarılı: ${successCount}\nBaşarısız: ${failedCount}`)
    .setColor("Green")
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  await statusMessage.edit({ embeds: [finalEmbed] });
};

exports.help = {
  name: "duyur",
  kategori: "Sahip",
  açıklama: "Botun bulunduğu tüm sunuculardaki tüm üyelere DM'den duyuru yapar"
};
