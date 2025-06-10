const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
  const length = args[0] ? parseInt(args[0]) : 16;
  
  if (isNaN(length) || length < 4 || length > 100) {
    return message.channel.send("Şifre uzunluğu 4 ile 100 arasında olmalıdır!");
  }
  
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = lowercase + uppercase + numbers + symbols;
  
  let password = '';
  
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  
  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  
  const embed = new EmbedBuilder()
    .setTitle("🔒 Rastgele Şifre Oluşturuldu")
    .setDescription(`Şifreniz aşağıdadır. Bu şifreyi kimseyle paylaşmayın!`)
    .addFields({ name: 'Şifre', value: `\`${password}\``, inline: false })
    .setColor("Blue")
    .setFooter({ text: `${message.author.tag} tarafından oluşturuldu | Uzunluk: ${length}`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();
  
  try {
    await message.author.send({ embeds: [embed] });
    message.reply("Şifreniz özel mesaj olarak gönderildi! 📧");
  } catch (error) {
    message.reply("Özel mesaj gönderemiyorum. Lütfen DM'lerinizin açık olduğundan emin olun.");
  }
};

exports.help = {
  name: "şifre",
  kategori: "Kullanıcı",
  açıklama: "Rastgele şifre üretir"
};
