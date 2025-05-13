const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  if (args.length < 2) {
    return message.channel.send("Kullanım: `!translate <dil kodu> <metin>` Örnek: `!translate en Merhaba nasılsın?`");
  }
  
  const targetLang = args[0].toLowerCase();
  const textToTranslate = args.slice(1).join(" ");
  
  try {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
    
    if (!response.ok) {
      return message.channel.send("Çeviri yapılırken bir hata oluştu. Lütfen geçerli bir dil kodu kullandığınızdan emin olun.");
    }
    
    const data = await response.json();
    const translation = data[0].map(item => item[0]).join("");
    const detectedLang = data[2];
    
    const embed = new EmbedBuilder()
      .setTitle("📝 Çeviri")
      .addFields(
        { name: "Orijinal Metin", value: textToTranslate, inline: false },
        { name: "Çeviri", value: translation, inline: false },
        { name: "Diller", value: `${detectedLang} ➡️ ${targetLang}`, inline: false }
      )
      .setColor("Blue")
      .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send("Çeviri yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
  }
};

exports.help = {
  name: "translate",
  kategori: "Kullanıcı",
  açıklama: "Gönderilen metni belirtilen dile çevirir"
};
