# 🚀 GradeAI Web Sitesi - Railway Deploy Rehberi

> **Hedef:** Siteyi ücretsiz Railway sunucusuna deploy et, internette canlıya al.

---

## Adım 1: GitHub Repo Oluştur ve Kodu Yükle

### 1.1 GitHub'da Repo Aç
1. [github.com](https://github.com) adresine git ve `ali.utku.ismihan@gmail.com` ile giriş yap
2. Sağ üstte **+** → **New repository**
3. **Repository name:** `grade_ai_website`
4. **Public** seçili kalsın (ücretsiz)
5. **Create repository** butonuna tıkla

### 1.2 Kodu Push Et (Claude Code terminalinde)

```bash
cd C:\Users\UTKU\Documents\kimi\workspace\grade_ai_website
git init
git add .
git commit -m "Initial commit - GradeAI premium landing page"
git branch -M main
git remote add origin https://github.com/KULLANICIADIN/grade_ai_website.git
git push -u origin main
```

> **Not:** `KULLANICIADIN` yerine GitHub kullanıcı adını yaz. Örnek: `git remote add origin https://github.com/utku123/grade_ai_website.git`

---

## Adım 2: Railway'de Deploy Et

### 2.1 Railway Hesabı Aç
1. [railway.app](https://railway.app) adresine git
2. **Start a New Project** → **Deploy from GitHub repo**
3. GitHub hesabını bağla ve `grade_ai_website` repo'sunu seç

### 2.2 Otomatik Deploy
- Railway otomatik olarak `npm install` ve `npm run build` çalıştıracak
- Bekle (1-2 dakika)

### 2.3 Environment Variables Ekle
Railway dashboard'da:
1. Projenin üzerine tıkla
2. **Variables** sekmesine git
3. **New Variable** butonuna tıkla ve şunu ekle:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_APP_URL` | Railway'in verdiği domain (deploy sonrası otomatik oluşur, sonradan güncelle) |

> `PORT` değişkenini EKLEME — Railway kendisi atıyor.

### 2.4 Domain Al
1. Railway dashboard → **Settings** → **Domains**
2. Railway otomatik bir URL verecek: `gradeai-xxx.up.railway.app`
3. İstersen **Custom Domain** ekle (kendi domain'in varsa)

---

## Adım 3: Kontrol Et

Tarayıcıda şu adreslere git:
- `https://gradeai-xxx.up.railway.app` → İngilizce (otomatik)
- `https://gradeai-xxx.up.railway.app/tr` → Türkçe
- `https://gradeai-xxx.up.railway.app/fr` → Fransızca
- `https://gradeai-xxx.up.railway.app/es` → İspanyolca

---

## 🔄 Sonradan Güncelleme (Yeni özellik eklediğinde)

```bash
cd C:\Users\UTKU\Documents\kimi\workspace\grade_ai_website
git add .
git commit -m "Yeni özellik eklendi"
git push origin main
```

Railway otomatik yeniden deploy eder (1-2 dk içinde canlıya geçer).

---

## ⚠️ Önemli Notlar

1. **Ücretsiz Limit:** Railway ücretsiz planı ayda $5 kredi verir. Bu site için aylık $0.5-1 civarı kullanırsın, uzun süre yetebilir.
2. **Sleep Mode:** Ücretsiz planda 7 gün aktiflik sonrası proje "uyku moduna" geçebilir. İlk ziyaretçi geldiğinde 10-20 sn içinde uyanır.
3. **Ödeme:** Railway'e kredi kartı bağlarsan proje hiç uyumaz ($5/ay min).

---

**Hazırlayan:** Kimi AI  
**Tarih:** 2025
