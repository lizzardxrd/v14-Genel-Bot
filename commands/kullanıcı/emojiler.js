const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const emojis = message.guild.emojis.cache;
  
  if (emojis.size === 0) {
    return message.channel.send("Bu sunucuda emoji bulunmuyor.");
  }
  
  const regularEmojis = emojis.filter(emoji => !emoji.animated);
  const animatedEmojis = emojis.filter(emoji => emoji.animated);
  
  const embed = new EmbedBuilder()
    .setTitle(`${message.guild.name} Sunucusunun Emojileri`)
    .setColor('Random')
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  if (regularEmojis.size > 0) {
    let regularEmojiStr = '';
    regularEmojis.forEach(emoji => {
      regularEmojiStr += `${emoji} \`:${emoji.name}:\` (\`${emoji.id}\`)\n`;
    });
    
    if (regularEmojiStr.length > 1024) {
      regularEmojiStr = regularEmojiStr.substring(0, 1020) + '...';
    }
    
    embed.addFields({ name: `Normal Emojiler [${regularEmojis.size}]`, value: regularEmojiStr || 'Yok', inline: false });
  }
  
  if (animatedEmojis.size > 0) {
    let animatedEmojiStr = '';
    animatedEmojis.forEach(emoji => {
      animatedEmojiStr += `${emoji} \`:${emoji.name}:\` (\`${emoji.id}\`)\n`;
    });
    
    if (animatedEmojiStr.length > 1024) {
      animatedEmojiStr = animatedEmojiStr.substring(0, 1020) + '...';
    }
    
    embed.addFields({ name: `Hareketli Emojiler [${animatedEmojis.size}]`, value: animatedEmojiStr || 'Yok', inline: false });
  }
  
  message.channel.send({ embeds: [embed] });
};

exports.help = {
  name: "emojiler",
  kategori: "Kullanıcı",
  açıklama: "Sunucudaki tüm emojileri listeler"
};
