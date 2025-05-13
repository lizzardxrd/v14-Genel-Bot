# Discord.js v14 Genel Bot

Bu bot, Türkçe olarak geliştirilmiş kapsamlı bir Discord botudur. İçerisinde kullanıcı, moderasyon ve sahip komutları dahil birçok özellik barındırır. Yardım menüsü, **select menu (açılır menü)** ile kategorilere ayrılmıştır. Botun ayarları tamamen `config.json` dosyasından yapılır.

## Özellikler

- Gelişmiş yardım menüsü (select menu)
- Kapsamlı kullanıcı komutları
- Moderasyon araçları (nuke, ban, kick vb.)
- Sahip komutları (duyuru, reboot, sunucu listesi)
- Dinamik dönen bot durumu
- Komutlar otomatik olarak komutlar klasöründen yüklenir

## Gereksinimler

- Node.js v18 veya üzeri
- Discord.js v14

## Kurulum

### 1. Depoyu klonlayın veya indirin:

```bash
git clone https://github.com/kendi-repo/bot-adi.git
cd bot-adi

2. Gerekli paketleri kurun:

npm install

3. config.json dosyasını düzenleyin:

{
  "token": "BOT_TOKENİNİZİ_BURAYA_YAZIN",
  "prefix": "!",
  "sahip": "SAHİP_DISCORD_ID",
}

token: Botunuzun tokeni (Discord Developer Portal üzerinden alınır).

prefix: Komut ön eki, örneğin !ban.

sahip: Sahip(ler)in kullanıcı ID'si. Liste olabilir.

durumlar: Botun dönen durumları.

sürüm: Bot sürüm bilgisi.


4. Botu başlatın:

node index.js

Botunuz başarıyla çalışacaktır!

Komut Kategorileri

Kullanıcı: avatar, yaz, embed, sunucu-bilgi, vs.

Moderasyon: ban, kick, nuke, sil, vs.

Sahip: reboot, duyur, sürüm, istatistik


Katkı

Geliştirme yapmak isterseniz, fork'layabilir ve pull request gönderebilirsiniz.