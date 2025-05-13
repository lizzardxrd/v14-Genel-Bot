const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const snipeData = client.snipes.get(message.channel.id);
  
  if (!snipeData) {
    return message.channel.send("Bu kanalda silinen bir mesaj bulunamadı!");
  }
  
  const embed = new EmbedBuilder()
    .setTitle("🗑️ Son Silinen Mesaj")
    .setDescription(snipeData.content || "*Mesaj içeriği yok*")
    .setColor("Random")
    .setAuthor({ name: snipeData.author.tag, iconURL: snipeData.author.displayAvatarURL() })
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp(snipeData.timestamp);
  
  if (snipeData.image) {
    embed.setImage(snipeData.image);
  }
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "snipe",
  kategori: "Moderasyon",
  açıklama: "Son silinen mesajı gösterir"
};
