exports.run = async (client, message, args) => {
  if (!args.length) {
    return message.channel.send("Yazmamı istediğin bir mesaj belirtmelisin!");
  }
  
  const text = args.join(" ");
  
  await message.delete().catch(() => {});
  
  message.channel.send(text);
};

exports.help = {
  name: "yaz",
  kategori: "Kullanıcı",
  açıklama: "Bot, yazdığınız mesajı kendi olarak yazar"
};
