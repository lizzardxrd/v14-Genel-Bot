const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
    return message.channel.send("Bu komutu kullanmak için **Kanalları Yönet** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
    return message.channel.send("Kanalları yönetme yetkim yok!");
  }
  
  const channel = message.mentions.channels.first() || message.channel;
  
  const currentPermissions = channel.permissionsFor(message.guild.roles.everyone);
  const isLocked = !currentPermissions.has(PermissionFlagsBits.SendMessages);
  
  const embed = new EmbedBuilder()
    .setColor(isLocked ? "Green" : "Red")
    .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  try {
    if (isLocked) {
      
      await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: true
      });
      
      embed
        .setTitle("🔓 Kanal Kilidi Açıldı")
        .setDescription(`${channel} kanalının kilidi ${message.author} tarafından açıldı.`);
    } else {
      
      await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: false
      });
      
      embed
        .setTitle("🔒 Kanal Kilitlendi")
        .setDescription(`${channel} kanalı ${message.author} tarafından kilitlendi.`);
    }
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send(`Kanal ${isLocked ? 'açılırken' : 'kilitlenirken'} bir hata oluştu: ${error.message}`);
  }
};

exports.help = {
  name: "kilit",
  kategori: "Moderasyon",
  açıklama: "Kanalı kilitler veya açar"
};
