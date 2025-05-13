const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {
  const embed = new EmbedBuilder()
    .setTitle("Prot0gen+ | Yardım Menüsü")
    .setDescription("✅ Merhaba, **Prot0gen+** Yardım Menüsüne Hoşgeldin! 🎉\n\n➡️ Aşağıdaki menüden **Prot0gen+** botunda kullanabileceğin komutlar listelenecektir.\n\n📌 Eğer komutlarda hata veya bug görürsen <@1234262055070994473> veya [yardım sunucusuna](https://discord.gg/wWKJDQZsBJ) gelerek iletişime geçebilirsin")
    .setImage('https://cdn.discordapp.com/attachments/1365425633945059358/1371545900064964689/standard_4.gif?ex=68238728&is=682235a8&hm=550b3a9a79ff1937ab8593af2a9651455ddc066028497b207deeaaa87ccc77bf&')
    .setColor("Random")
    .setFooter({ text: `${client.user.username} | Sürüm ${client.config.version}`, iconURL: client.user.displayAvatarURL() })
    .setTimestamp();

  const kullanıcıKomutları = [];
  const moderasyonKomutları = [];
  const sahipKomutları = [];

  client.commands.forEach(cmd => {
    switch(cmd.help.kategori) {
      case "Kullanıcı":
        kullanıcıKomutları.push(`\`${client.config.emoji} ${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
        break;
      case "Moderasyon":
        moderasyonKomutları.push(`\`${client.config.emoji} ${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
        break;
      case "Sahip":
        sahipKomutları.push(`\`${client.config.emoji} ${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
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
              emoji: '<:l_k:1371035450239881298>',
            label: 'Kullanıcı Komutları',
            description: 'Herkesin kullanabileceği genel komutlar',
            value: 'kullanıcı',
          },
          {
              emoji: '<:l_m:1371035530124333076>',
            label: 'Moderasyon Komutları',
            description: 'Yetkililerin kullanabileceği moderasyon komutları',
            value: 'moderasyon',
          },
          {
              emoji: '<:l_s:1371035609610846248>',
            label: 'Sahip Komutları',
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
