const { EmbedBuilder, version } = require('discord.js');
const os = require('os');

exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.ownerID) {
    return message.channel.send("Bu komutu sadece bot sahibi kullanabilir.");
  }
  
  const users = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
  
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor(uptime / 3600) % 24;
  const minutes = Math.floor(uptime / 60) % 60;
  const seconds = Math.floor(uptime % 60);
  
  const uptimeString = `${days ? days + ' gün, ' : ''}${hours ? hours + ' saat, ' : ''}${minutes ? minutes + ' dakika, ' : ''}${seconds} saniye`;
  
  const memoryUsage = process.memoryUsage();
  const totalRam = os.totalmem();
  const freeRam = os.freemem();
  const usedRam = totalRam - freeRam;
  
  const memoryPercentage = ((memoryUsage.rss / totalRam) * 100).toFixed(2);
  
  const embed = new EmbedBuilder()
    .setTitle("📊 Bot İstatistikleri")
    .setColor("Blue")
    .setThumbnail(client.user.displayAvatarURL())
    .addFields(
      { name: '🤖 Bot Bilgisi', value: `Bot İsmi: ${client.user.tag}\nBot ID: ${client.user.id}\nSürüm: ${client.config.version}`, inline: false },
      { name: '📈 Kullanım', value: `Sunucular: ${client.guilds.cache.size}\nKanallar: ${client.channels.cache.size}\nKullanıcılar: ${users}`, inline: false },
      { name: '⏱️ Çalışma Süresi', value: uptimeString, inline: false },
      { name: '🖥️ Sistem', value: `İşletim Sistemi: ${os.platform()} ${os.release()}\nCPU: ${os.cpus()[0].model}\nRAM Kullanımı: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB (${memoryPercentage}%)\nDiscord.js: v${version}\nNode.js: ${process.version}`, inline: false }
    )
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "istatistik",
  kategori: "Sahip",
  açıklama: "Bot istatistiklerini gösterir"
};
