const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
    return message.channel.send("Bu komutu kullanmak için **Mesajları Yönet** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
    return message.channel.send("Mesajları silme yetkim yok!");
  }
  
  if (!args[0]) {
    return message.channel.send("Silinecek mesaj sayısını belirtmelisin! (1-100)");
  }
  
  const amount = parseInt(args[0]);
  
  if (isNaN(amount)) {
    return message.channel.send("Geçerli bir sayı belirtmelisin!");
  }
  
  if (amount < 1 || amount > 100) {
    return message.channel.send("1 ile 100 arasında bir sayı belirtmelisin!");
  }
  
  try {
    await message.delete();
    
    const fetched = await message.channel.messages.fetch({ limit: amount });
    
    const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
    
    const deletedMessages = await message.channel.bulkDelete(notPinned, true);
    
    const embed = new EmbedBuilder()
      .setTitle("✅ Mesajlar Silindi")
      .setColor("Green")
      .setDescription(`${deletedMessages.size} adet mesaj silindi.`)
      .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
    
    const reply = await message.channel.send({ embeds: [embed] });
    
    setTimeout(() => {
      reply.delete().catch(() => {});
    }, 5000);
  } catch (error) {
    message.channel.send(`Mesajlar silinirken bir hata oluştu: ${error.message}`);
  }
};

exports.help = {
  name: "sil",
  kategori: "Moderasyon",
  açıklama: "Belirtilen sayıda mesaj siler"
};
