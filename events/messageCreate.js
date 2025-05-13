module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  const prefix = client.config.prefix;
  
  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  const cmd = client.commands.get(command);
  
  if (!cmd) return;
  
  if (cmd.help.kategori === "Sahip" && message.author.id !== client.config.ownerID) {
    return message.reply("Bu komutu sadece bot sahibi kullanabilir.");
  }
  
  if (cmd.help.kategori === "Moderasyon") {
    const permissions = message.member.permissions;
    if (!permissions.has("ManageMessages") && !permissions.has("Administrator")) {
      return message.reply("Bu komutu kullanmak için gerekli yetkilere sahip değilsiniz.");
    }
  }
  
  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.error(e);
    message.reply("Komut çalıştırılırken bir hata oluştu.");
  }
};
