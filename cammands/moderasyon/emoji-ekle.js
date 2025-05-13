const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers)) {
    return message.channel.send("Bu komutu kullanmak için **Emoji ve Çıkartmaları Yönet** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers)) {
    return message.channel.send("Emoji ekleme yetkim yok!");
  }
  
  if (!args[0]) {
    return message.channel.send("Bir emoji veya emoji URL'si belirtmelisin!");
  }
  
  let name = args[1] ? args[1].replace(/[^a-z0-9_]/gi, '') : 'emoji';
  let emoji = args[0];
  let url;
  
  if (emoji.startsWith('<') && emoji.endsWith('>')) {
    // Özel emoji
    const matched = emoji.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})>?/);
    
    if (!matched) {
      return message.channel.send("Geçerli bir emoji belirtmelisin!");
    }
    
    const isAnimated = Boolean(matched[1]);
    name = matched[2] || name;
    const id = matched[3];
    
    url = `https://cdn.discordapp.com/emojis/${id}.${isAnimated ? 'gif' : 'png'}`;
  } else if (emoji.startsWith('http')) {
    // URL
    url = emoji;
  } else {
    return message.channel.send("Geçerli bir emoji veya resim URL'si belirtmelisin!");
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return message.channel.send("Emoji resmi alınamadı: " + response.statusText);
    }
    
    const buffer = await response.buffer();
    
    const newEmoji = await message.guild.emojis.create({
      attachment: buffer,
      name: name
    });
    
    const embed = new EmbedBuilder()
      .setTitle("✅ Emoji Eklendi")
      .setColor("Green")
      .setThumbnail(newEmoji.url)
      .addFields(
        { name: 'Emoji Adı', value: newEmoji.name, inline: true },
        { name: 'Emoji ID', value: newEmoji.id, inline: true },
        { name: 'Kullanım', value: `\`<:${newEmoji.name}:${newEmoji.id}>\``, inline: false }
      )
      .setFooter({ text: `${message.author.tag} tarafından eklendi`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send(`Emoji eklenirken bir hata oluştu: ${error.message}`);
  }
};

exports.help = {
  name: "emoji-ekle",
  kategori: "Moderasyon",
  açıklama: "Emoji ekler"
};
