const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/TRY');
    const data = await response.json();
    
    if (!data.rates) {
      return message.channel.send("Döviz kurları alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
    
    const rates = data.rates;
    const usd = (1 / rates.USD).toFixed(2);
    const eur = (1 / rates.EUR).toFixed(2);
    const gbp = (1 / rates.GBP).toFixed(2);
    const aud = (1 / rates.AUD).toFixed(2);
    const cad = (1 / rates.CAD).toFixed(2);
    const jpy = (1 / rates.JPY).toFixed(2);
    
    const embed = new EmbedBuilder()
      .setTitle("💰 Güncel Döviz Kurları")
      .setDescription(`**1 Türk Lirası** karşılığı döviz kurları.\nGüncelleme: <t:${Math.floor(Date.now() / 1000)}:R>`)
      .setColor("Gold")
      .addFields(
        { name: '💵 Amerikan Doları (USD)', value: `${usd} ₺`, inline: true },
        { name: '💶 Euro (EUR)', value: `${eur} ₺`, inline: true },
        { name: '💷 İngiliz Sterlini (GBP)', value: `${gbp} ₺`, inline: true },
        { name: '💴 Avustralya Doları (AUD)', value: `${aud} ₺`, inline: true },
        { name: '💴 Kanada Doları (CAD)', value: `${cad} ₺`, inline: true },
        { name: '💴 Japon Yeni (JPY)', value: `${jpy} ₺`, inline: true }
      )
      .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send("Döviz kurları alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
  }
};

exports.help = {
  name: "döviz",
  kategori: "Kullanıcı",
  açıklama: "Anlık döviz kuru bilgisi verir"
};
