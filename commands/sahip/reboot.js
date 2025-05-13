const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.ownerID) {
    return message.channel.send("Bu komutu sadece bot sahibi kullanabilir.");
  }
  
  const embed = new EmbedBuilder()
    .setTitle("🔄 Bot Yeniden Başlatılıyor")
    .setDescription("Bot birkaç saniye içinde yeniden başlatılacak...")
    .setColor("Blue")
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  await message.channel.send({ embeds: [embed] });
  
  console.log(`${message.author.tag} tarafından bot yeniden başlatılıyor...`);
  
  // Botu yeniden başlat
  process.exit();
};

exports.help = {
  name: "reboot",
  kategori: "Sahip",
  açıklama: "Botu yeniden başlatır"
};
