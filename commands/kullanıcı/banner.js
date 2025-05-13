const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
  try {
    const fetchedUser = await client.users.fetch(user.id, { force: true });
    
    if (!fetchedUser.banner) {
      return message.channel.send("Bu kullanıcının banner'ı bulunmuyor.");
    }
    
    const bannerURL = fetchedUser.bannerURL({ size: 4096, dynamic: true });
    
    const bannerEmbed = new EmbedBuilder()
      .setTitle(`${user.tag} Banner`)
      .setColor('Random')
      .setImage(bannerURL)
      .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [bannerEmbed] });
  } catch (error) {
    message.channel.send("Banner bilgisi alınırken bir hata oluştu.");
  }
};

exports.help = {
  name: "banner",
  kategori: "Kullanıcı",
  açıklama: "Kullanıcının banner görselini gösterir"
};
