const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.ownerID) {
    return message.channel.send("Bu komutu sadece bot sahibi kullanabilir.");
  }
  
  const embed = new EmbedBuilder()
    .setTitle("🔖 Bot Sürüm Bilgisi")
    .setDescription(`**Sürüm:** ${client.config.version}`)
    .setColor("Blue")
    .addFields(
      { name: 'Bot Adı', value: client.user.tag, inline: true },
      { name: 'Bot ID', value: client.user.id, inline: true },
      { name: 'Discord.js Sürümü', value: require('discord.js').version, inline: true },
      { name: 'Node.js Sürümü', value: process.version, inline: true }
    )
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "sürüm",
  kategori: "Sahip",
  açıklama: "Botun sürümünü gösterir"
};
