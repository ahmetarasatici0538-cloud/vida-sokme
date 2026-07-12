/*
  Buradaki değerleri kendi hesap bilgilerinle değiştir.

  Kredi kartı bilgisi, CVV, şifre veya ödeme
  sisteminin gizli anahtarını bu dosyaya yazma.
*/

window.VIDA_CONFIG = {
  /*
    AdSense yayıncı kodun.

    Örnek:
    ca-pub-1234567890123456
  */
  adsenseClient:
    "ca-pub-XXXXXXXXXXXXXXXX",

  /*
    AdSense reklam birimi numaraları.
  */
  adsenseTopSlot:
    "1111111111",

  adsenseBottomSlot:
    "2222222222",

  /*
    Güvenli ödeme sağlayıcısında oluşturduğun
    ödeme sayfasının adresi.

    GitHub Pages doğrudan kredi kartı
    ödemesi alamaz.
  */
  paymentUrl: "",

  /*
    Ödeme sonucunu doğrulayan güvenli
    sunucu adresi.
  */
  premiumVerifyEndpoint: "",

  priceLabel: "10 TL",

  /*
    true olursa ödeme yapmadan reklam
    kapatma testi yapılabilir.

    Siteyi yayınlamadan önce false yap.
  */
  allowDemoPremium: false
};
