const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!args.length) {
    return message.channel.send("Embedde gösterilecek bir mesaj belirtmelisin!");
  }
  
  const text = args.join(" ");
  
  const embed = new EmbedBuilder()
    .setDescription(text)
    .setColor('Random')
    .setFooter({ text: `${message.author.tag} tarafından oluşturuldu`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "embed",
  kategori: "Kullanıcı",
  açıklama: "Mesajı kutu içinde (embed) yollar"
};
