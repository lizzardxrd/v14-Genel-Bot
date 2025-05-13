const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.ownerID) {
    return message.channel.send("Bu komutu sadece bot sahibi kullanabilir.");
  }
  
  const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount);
  
  if (guilds.size === 0) {
    return message.channel.send("Bot hiçbir sunucuda bulunmuyor.");
  }
  
  const pages = Math.ceil(guilds.size / 10);
  let page = 0;
  
  const generateEmbed = (page) => {
    const guildArray = [...guilds.values()];
    const start = page * 10;
    const end = Math.min(start + 10, guilds.size);
    
    const embed = new EmbedBuilder()
      .setTitle(`🌐 Bot Sunucu Listesi (${guilds.size})`)
      .setColor("Blue")
      .setFooter({ text: `Sayfa ${page + 1}/${pages} | ${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
    
    for (let i = start; i < end; i++) {
      const guild = guildArray[i];
      embed.addFields({
        name: `${i + 1}. ${guild.name}`,
        value: `ID: ${guild.id}\nSahip: <@${guild.ownerId}> (${guild.ownerId})\nÜye Sayısı: ${guild.memberCount}\nOluşturulma: <t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
        inline: false
      });
    }
    
    return embed;
  };
  
  const messageEmbed = await message.channel.send({ embeds: [generateEmbed(page)] });
  
  // Eğer birden fazla sayfa varsa reaksiyon ekle
  if (pages > 1) {
    await messageEmbed.react('⬅️');
    await messageEmbed.react('➡️');
    
    const filter = (reaction, user) => {
      return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    const collector = messageEmbed.createReactionCollector({ filter, time: 60000 });
    
    collector.on('collect', async (reaction, user) => {
      if (reaction.emoji.name === '⬅️') {
        if (page > 0) {
          page--;
          await messageEmbed.edit({ embeds: [generateEmbed(page)] });
        }
      } else if (reaction.emoji.name === '➡️') {
        if (page < pages - 1) {
          page++;
          await messageEmbed.edit({ embeds: [generateEmbed(page)] });
        }
      }
      
      try {
        reaction.users.remove(user.id);
      } catch (error) {
        // Yetkisi yoksa reaksiyonu kaldıramaz
      }
    });
    
    collector.on('end', () => {
      messageEmbed.reactions.removeAll().catch(error => console.error('Reaksiyonları kaldırırken bir hata oluştu:', error));
    });
  }
};

exports.help = {
  name: "sunucu-list",
  kategori: "Sahip",
  açıklama: "Botun bulunduğu sunucuları listeler"
};
