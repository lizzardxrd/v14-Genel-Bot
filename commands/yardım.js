const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {
  const embed = new EmbedBuilder()
    .setTitle("Prot0gen+ | Yardım Menüsü")
    .setDescription("<a:l_tik1:1365047747908075703> Merhaba, **Prot0gen+** Yardım Menüsüne Hoşgeldin! <a:l_parti:1368183366247125102>\n\n<a:l_ht:1364824426872569868> Aşağıdaki menüden **Prot0gen+** botunda kullanabileceğin komutlar listelenecektir.\n\n<a:l_pin:1365047429917048932> Eğer komutlarda hata veya bug görürsen <@1234262055070994473> veya [yardım sunucusuna](https://discord.gg/wWKJDQZsBJ) gelerek iletişime geçebilirsin")
    .setColor("Random")
    .setFooter({ text: `${client.user.username} | Sürüm ${client.config.version}`, iconURL: client.user.displayAvatarURL() })
    .setTimestamp();

  const kullanıcıKomutları = [];
  const moderasyonKomutları = [];
  const sahipKomutları = [];

  client.commands.forEach(cmd => {
    switch(cmd.help.kategori) {
      case "Kullanıcı":
        kullanıcıKomutları.push(`\`${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
        break;
      case "Moderasyon":
        moderasyonKomutları.push(`\`${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
        break;
      case "Sahip":
        sahipKomutları.push(`\`${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
        break;
    }
  });

  const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('help_menu')
        .setPlaceholder('Bir kategori seçin')
        .addOptions([
          {
            label: '<:l_k:1371035450239881298> Kullanıcı Komutları',
            description: 'Herkesin kullanabileceği genel komutlar',
            value: 'kullanıcı',
          },
          {
            label: '<:l_m:1371035530124333076> Moderasyon Komutları',
            description: 'Yetkililerin kullanabileceği moderasyon komutları',
            value: 'moderasyon',
          },
          {
            label: '<:l_s:1371035609610846248> Sahip Komutları',
            description: 'Sadece bot sahibinin kullanabileceği komutlar',
            value: 'sahip',
          },
        ]),
    );

  const helpMessage = await message.channel.send({ embeds: [embed], components: [row] });

  const filter = i => i.customId === 'help_menu' && i.user.id === message.author.id;
  const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

  collector.on('collect', async i => {
    const selection = i.values[0];
    
    const updatedEmbed = new EmbedBuilder()
      .setColor("Random")
      .setFooter({ text: `${client.user.username} | Sürüm ${client.config.version}`, iconURL: client.user.displayAvatarURL() })
      .setTimestamp();

    switch(selection) {
      case 'kullanıcı':
        updatedEmbed
          .setTitle("Prot0gen+ | Kullanıcı Komutları")
          .setDescription(kullanıcıKomutları.join('\n'));
        break;
      case 'moderasyon':
        updatedEmbed
          .setTitle("Prot0gen+ | Moderasyon Komutları")
          .setDescription(moderasyonKomutları.join('\n'));
        break;
      case 'sahip':
        updatedEmbed
          .setTitle("Prot0gen+ | Sahip Komutları")
          .setDescription(sahipKomutları.join('\n'));
        break;
    }

    await i.update({ embeds: [updatedEmbed], components: [row] });
  });

  collector.on('end', () => {
    helpMessage.edit({ components: [] }).catch(() => {});
  });
};

exports.help = {
  name: "yardım",
  kategori: "Kullanıcı", 
  açıklama: "Komutları kategoriye göre listeler"
};
