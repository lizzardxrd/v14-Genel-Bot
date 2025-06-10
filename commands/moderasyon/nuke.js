const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
    return message.channel.send("Bu komutu kullanmak için **Kanalları Yönet** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
    return message.channel.send("Kanalları yönetme yetkim yok!");
  }
  
  const channel = message.channel;
  
  
  const confirmEmbed = new EmbedBuilder()
    .setTitle("⚠️ Kanal Nukelenecek")
    .setDescription(`**${channel.name}** kanalını nukelemek istediğinize emin misiniz? Bu işlem geri alınamaz ve tüm mesajlar silinecektir.`)
    .setColor("Red")
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  const confirmMessage = await message.channel.send({ embeds: [confirmEmbed] });
  
  
  await confirmMessage.react('✅');
  await confirmMessage.react('❌');
  
  
  const filter = (reaction, user) => {
    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  
  
  const collector = confirmMessage.createReactionCollector({ filter, time: 30000, max: 1 });
  
  collector.on('collect', async (reaction, user) => {
    if (reaction.emoji.name === '✅') {
      try {
        
        const position = channel.position;
        const permissions = channel.permissionOverwrites.cache;
        
        
        await channel.delete(`${message.author.tag} tarafından nukelendi`);
        
        
        const newChannel = await message.guild.channels.create({
          name: channel.name,
          type: channel.type,
          parent: channel.parent,
          topic: channel.topic,
          nsfw: channel.nsfw,
          bitrate: channel.bitrate,
          userLimit: channel.userLimit,
          position: position,
          permissionOverwrites: permissions
        });
        
        
        const nukeGif = 'https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif';
        
        const nukeEmbed = new EmbedBuilder()
          .setTitle("💥 Kanal Nukelendi!")
          .setDescription(`Bu kanal ${message.author} tarafından nukelendi.`)
          .setImage(nukeGif)
          .setColor("Red")
          .setTimestamp();
        
        newChannel.send({ embeds: [nukeEmbed] });
      } catch (error) {
        message.author.send(`Kanal nukelenirken bir hata oluştu: ${error.message}`).catch(() => {});
      }
    } else {
      confirmMessage.delete().catch(() => {});
      message.channel.send("Nuke işlemi iptal edildi.").then(msg => {
        setTimeout(() => {
          msg.delete().catch(() => {});
        }, 5000);
      });
    }
  });
  
  collector.on('end', collected => {
    if (collected.size === 0) {
      confirmMessage.delete().catch(() => {});
      message.channel.send("Nuke işlemi zaman aşımına uğradı.").then(msg => {
        setTimeout(() => {
          msg.delete().catch(() => {});
        }, 5000);
      });
    }
  });
};

exports.help = {
  name: "nuke",
  kategori: "Moderasyon",
  açıklama: "Komutun yazıldığı kanalı siler ve aynısını yeniden oluşturur"
};
