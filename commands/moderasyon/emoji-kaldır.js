const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers)) {
    return message.channel.send("Bu komutu kullanmak için **Emoji ve Çıkartmaları Yönet** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers)) {
    return message.channel.send("Emoji kaldırma yetkim yok!");
  }
  
  if (!args[0]) {
    return message.channel.send("Bir emoji belirtmelisin!");
  }
  
  let emoji = args[0];
  
  if (emoji.startsWith('<') && emoji.endsWith('>')) {
    
    const matched = emoji.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})>?/);
    
    if (!matched) {
      return message.channel.send("Geçerli bir emoji belirtmelisin!");
    }
    
    const id = matched[3];
    emoji = message.guild.emojis.cache.get(id);
    
    if (!emoji) {
      return message.channel.send("Bu emoji bu sunucuya ait değil veya bulunamadı!");
    }
  } else {
    
    emoji = message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.find(e => e.name === args[0]);
    
    if (!emoji) {
      return message.channel.send("Bu emoji bulunamadı!");
    }
  }
  
  const emojiInfo = {
    name: emoji.name,
    id: emoji.id,
    url: emoji.url
  };
  
  try {
    await emoji.delete(`${message.author.tag} tarafından kaldırıldı`);
    
    const embed = new EmbedBuilder()
      .setTitle("✅ Emoji Kaldırıldı")
      .setColor("Red")
      .setThumbnail(emojiInfo.url)
      .addFields(
        { name: 'Emoji Adı', value: emojiInfo.name, inline: true },
        { name: 'Emoji ID', value: emojiInfo.id, inline: true }
      )
      .setFooter({ text: `${message.author.tag} tarafından kaldırıldı`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send(`Emoji kaldırılırken bir hata oluştu: ${error.message}`);
  }
};

exports.help = {
  name: "emoji-kaldır",
  kategori: "Moderasyon",
  açıklama: "Emojiyi siler"
};
