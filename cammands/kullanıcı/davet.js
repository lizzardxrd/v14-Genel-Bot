const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const invite = `https://discord.com/oauth2/authorize?client_id=1369723690237034567&permissions=8&integration_type=0&scope=bot`;
  
  const embed = new EmbedBuilder()
    .setTitle("🔗 Bot Linkleri")
    .setDescription(`**[Botu sunucuna ekle!](${invite}), [Destek Sunucusuna](https://discord.gg/hV6ssU4hYf) Katıl**`)
    .setColor("Random")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "davet",
  kategori: "Kullanıcı",
  açıklama: "Botun davet linkini yollar"
};
