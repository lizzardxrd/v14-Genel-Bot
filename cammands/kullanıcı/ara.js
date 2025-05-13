const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  if (!args.length) {
    return message.channel.send("Aranacak bir terim belirtmelisin!");
  }
  
  const searchTerm = args.join(" ");
  const encodedTerm = encodeURIComponent(searchTerm);
  
  const googleUrl = `https://www.google.com/search?q=${encodedTerm}`;
  
  const embed = new EmbedBuilder()
    .setTitle("🔍 Arama Sonucu")
    .setDescription(`**${searchTerm}** için arama sonuçları:`)
    .addFields(
      { name: 'Google', value: `[Tıkla](${googleUrl})`, inline: true }
    )
    .setColor("Blue")
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "ara",
  kategori: "Kullanıcı",
  açıklama: "Belirtilen terimi internetten arar"
};
