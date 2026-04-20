# Project: A4 Şablon Düzenleyici

## Overview

2 sayfalık A4 formatında, görsel ve metin bloklarından oluşan düzenlenebilir bir şablon aracı. Başlık ve soru metinleri tıklanarak düzenlenebilir, görseller yüklenebilir, tüm içerik localStorage'a kaydedilir ve PDF olarak yazdırılabilir.

<phase number="1" title="Modern & Minimal Yeniden Tasarım">

Mevcut Framer bileşeni, Refine projesine tamamen yeni bir Modern & Minimal tasarımla aktarılır.

#### Key Features

- Temiz beyaz/gri ton paleti, sade tipografi ve ince border çizgileri
- Tıklanarak düzenlenebilir başlık alanı
- Her blokta düzenlenebilir metin + görsel yükleme alanı
- 2 sayfalı A4 düzeni (1. sayfada 4 blok, 2. sayfada 6 blok)
- LocalStorage ile otomatik kayıt
- "Yazdır" butonu ile A4 PDF çıktısı

#### Tasks

- [x] Yeni Modern & Minimal tasarımla A4 şablon bileşenini oluştur (EditableText, ImageUploader, LocalStorage, Print)
- [x] Ana sayfaya (/) bileşeni entegre et ve önizlenebilir hale getir

#### Notes

- Data source: LocalStorage (mock default data ile başlar)
- Stil: Beyaz arka plan, zinc/slate renk skalası, Inter/system-ui font, ince border, subtle gölgeler
- Yazdır butonu ekranda görünür, baskıda gizlenir
- Framer'a özel `addPropertyControls` kaldırılacak, saf React bileşenine dönüştürülecek
- Mevcut renk paleti (#FAF8F5, #EAE5DC vb.) tamamen yenilenecek
- Başlık düzenlenebilir olacak (contentEditable)
- Storage key: "refine-template-v1"

</phase>
