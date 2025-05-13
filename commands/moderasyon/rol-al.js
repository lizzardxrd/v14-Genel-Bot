const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
    return message.channel.send("Bu komutu kullanmak için **Rolleri Yönet** yetkisine sahip olman gerekiyor!");
  }
  
  if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
    return message.channel.send("Rolleri yönetme yetkim yok!");
  }
  
  if (!args[0] || !args[1]) {
    return message.channel.send("Bir kullanıcı ve rol belirtmelisin! Örnek: `!rol-al @kullanıcı @rol`");
  }
  
  const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  if (!target) {
    return message.channel.send("Geçerli bir kullanıcı belirtmelisin!");
  }
  
  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' ').toLowerCase());
  
  if (!role) {
    return message.channel.send("Geçerli bir rol belirtmelisin!");
  }
  
  if (role.position >= message.guild.members.me.roles.highest.position) {
    return message.channel.send("Bu rol benim en yüksek rolümden daha yüksek, bu rolü alamam!");
  }
  
  if (role.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) {
    return message.channel.send("Bu rol senin en yüksek rolünden daha yüksek veya aynı seviyede, bu rolü alamazsın!");
  }
  
  if (!target.roles.cache.has(role.id)) {
    return message.channel.send(`${target} kullanıcısının ${role} rolü zaten yok!`);
  }
  
  try {
    await target.roles.remove(role, `${message.author.tag} tarafından alındı`);
    
    const embed = new EmbedBuilder()
      .setTitle("✅ Rol Alındı")
      .setColor("Red")
      .addFields(
        { name: 'Kullanıcı', value: `${target} (${target.id})`, inline: false },
        { name: 'Alınan Rol', value: `${role} (${role.id})`, inline: false },
        { name: 'İşlemi Yapan', value: `${message.author} (${message.author.id})`, inline: false }
      )
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    message.channel.send(`Rol alınırken bir hata oluştu: ${error.message}`);
  }
};

exports.help = {
  name: "rol-al",
  kategori: "Moderasyon",
  açıklama: "Kullanıcıdan rol alır"
};
