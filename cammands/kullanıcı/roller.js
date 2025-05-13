const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .filter(role => role.id !== message.guild.id);
  
  if (roles.size === 0) {
    return message.channel.send("Bu sunucuda hiç rol bulunmuyor.");
  }
  
  const roleMappings = roles.map(role => `${role} (${role.id})`);
  
  const createEmbed = (roleGroup, page, totalPages) => {
    return new EmbedBuilder()
      .setTitle(`${message.guild.name} Sunucusunun Rolleri`)
      .setDescription(roleGroup.join('\n'))
      .setColor('Random')
      .setFooter({ text: `${message.author.tag} | Sayfa ${page}/${totalPages}`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();
  };
  
  // Her sayfada 15 rol
  const chunkedRoles = [];
  const chunkSize = 15;
  
  for (let i = 0; i < roleMappings.length; i += chunkSize) {
    chunkedRoles.push(roleMappings.slice(i, i + chunkSize));
  }
  
  let currentPage = 0;
  const totalPages = chunkedRoles.length;
  
  const sentMessage = await message.channel.send({ 
    embeds: [createEmbed(chunkedRoles[currentPage], currentPage + 1, totalPages)] 
  });
  
  // Eğer birden fazla sayfa varsa reaksiyon ekle
  if (totalPages > 1) {
    await sentMessage.react('⬅️');
    await sentMessage.react('➡️');
    
    const filter = (reaction, user) => {
      return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    const collector = sentMessage.createReactionCollector({ filter, time: 60000 });
    
    collector.on('collect', async (reaction, user) => {
      if (reaction.emoji.name === '⬅️') {
        if (currentPage > 0) {
          currentPage--;
          await sentMessage.edit({ embeds: [createEmbed(chunkedRoles[currentPage], currentPage + 1, totalPages)] });
        }
      } else if (reaction.emoji.name === '➡️') {
        if (currentPage < totalPages - 1) {
          currentPage++;
          await sentMessage.edit({ embeds: [createEmbed(chunkedRoles[currentPage], currentPage + 1, totalPages)] });
        }
      }
      
      try {
        reaction.users.remove(user.id);
      } catch (error) {
        // Yetkisi yoksa reaksiyonu kaldıramaz
      }
    });
    
    collector.on('end', () => {
      sentMessage.reactions.removeAll().catch(error => console.error('Reaksiyonları kaldırırken bir hata oluştu:', error));
    });
  }
};

exports.help = {
  name: "roller",
  kategori: "Kullanıcı",
  açıklama: "Sunucudaki tüm rolleri listeler"
};
