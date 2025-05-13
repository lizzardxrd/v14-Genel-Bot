const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send("Bir emoji belirtmelisin!");
  }
  
  let emoji = args[0];
  
  // Özel emoji ID'sini çıkarma
  if (emoji.startsWith('<') && emoji.endsWith('>')) {
    const matched = emoji.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})>?/);
    if (!matched) {
      return message.channel.send("Geçerli bir emoji belirtmelisin!");
    }
    
    const isAnimated = Boolean(matched[1]);
    const name = matched[2];
    const id = matched[3];
    
    const emojiURL = `https://cdn.discordapp.com/emojis/${id}.${isAnimated ? 'gif' : 'png'}?size=4096`;
    
    const createdAt = Math.floor((id / 4194304) + 1420070400000) / 1000;
    
    const embed = new EmbedBuilder()
      .setTitle(`Emoji Bilgisi: ${name}`)
      .setColor('Random')
      .setThumbnail(emojiURL)
      .addFields(
        { name: 'Ad', value: name, inline: true },
        { name: 'ID', value: id, inline: true },
        { name: 'Animasyonlu', value: isAnimated ? 'Evet' : 'Hayır', inline: true },
        { name: 'Oluşturulma Tarihi', value: `<t:${createdAt}:F> (<t:${createdAt}:R>)`, inline: false },
        { name: 'URL', value: `[Tıkla](${emojiURL})`, inline: true }
      )
      .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
    
    return message.channel.send({ embeds: [embed] });
  } else {
    return message.channel.send("Sadece özel Discord emojileri hakkında bilgi verebilirim.");
  }
};

exports.help = {
  name: "emoji-bilgi",
  kategori: "Kullanıcı",
  açıklama: "Belirtilen emoji hakkında bilgi verir"
};
