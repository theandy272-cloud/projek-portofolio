# Andi Wahyudi — Portfolio Website

Portofolio personal modern untuk **Andi Wahyudi**, seorang *Math Teacher* dari Cirebon, Indonesia.
Dibangun dengan HTML, CSS, dan JavaScript murni (tanpa framework, tanpa build step) — ringan, cepat, dan siap production.

> _"Matematika Untuk Indonesia."_

---

## ✨ Fitur

- **Dark modern developer theme** dengan background gradient beranimasi
- **Glassmorphism** pada seluruh card dan form
- **Animated particles** (canvas) dengan garis penghubung yang halus
- **Hero section** dengan efek **typewriter**, badge "Available for opportunities", kartu profil floating, dan tombol CTA
- **Floating UI effects** & **soft glowing accents**
- **Scroll reveal** animations (IntersectionObserver) dengan efek bertahap
- **Animated counters** pada statistik
- **Navigasi sticky** dengan active-link highlighting dan smooth scroll
- **Responsive** penuh: Desktop, Tablet, dan Mobile (termasuk menu hamburger)
- Menghormati `prefers-reduced-motion` untuk aksesibilitas

---

## 📁 Struktur Folder

```
projek portofolio/
├── index.html              # Halaman utama (single-page) — markup production
├── readme.md
├── assets/                 # Gambar, avatar, resume
│   ├── avatar.svg          # Placeholder avatar / favicon
│   └── README.txt          # Panduan menaruh foto & resume
├── css/
│   ├── base.css            # Design tokens, reset, background, typografi
│   ├── components.css      # Komponen reusable (navbar, button, glass, badge, form)
│   ├── sections.css        # Styling tiap section (hero, about, skills, dst.)
│   └── responsive.css      # Breakpoint tablet & mobile
├── js/
│   ├── particles.js        # Animasi partikel canvas
│   └── main.js             # Typewriter, scroll reveal, counter, menu, form
├── components/             # Partial markup reusable (navbar, hero, footer)
│   ├── navbar.html
│   ├── hero.html
│   └── footer.html
└── pages/
    └── home.html           # Dokumentasi komposisi halaman
```

> Catatan: Markup final berjalan dari `index.html` agar situs bekerja tanpa build step.
> File di `/components` dan `/pages` berfungsi sebagai partial reusable dan dokumentasi struktur — jaga agar tetap sinkron saat mengedit.

---

## 🚀 Menjalankan

Cukup buka `index.html` di browser. Atau jalankan static server dari root project:

```bash
# Python 3
python -m http.server 5500

# atau Node
npx serve .
```

Lalu buka `http://localhost:5500`.

---

## 🎨 Kustomisasi

- **Warna & tema** → ubah variabel CSS di bagian atas `css/base.css` (`:root`).
- **Teks typewriter** → ubah array `words` di `js/main.js`.
- **Foto profil** → ganti placeholder `.profile-card__photo` dengan `<img src="assets/profile.jpg">`.
- **Resume** → taruh `assets/andi-wahyudi-resume.pdf` (tombol di hero sudah menautkannya).
- **Konten** (project, pengalaman, statistik) → edit langsung di `index.html`.

---

## 📇 Data Personal

| | |
|---|---|
| Nama | Andi Wahyudi |
| Peran | Math Teacher |
| Tagline | "Matematika Untuk Indonesia." |
| Lokasi | Cirebon, Indonesia |
| Email | theandy272@gmail.com |
| Telepon | 085188334852 |
| Portofolio | www.Andiwahyudi.dev |
| GitHub | github.com/Andiwahyudidev |
| LinkedIn | linkedin.com/in/andiwahyudidev |
| Twitter / X | x.com/andiwahyudidev |

---

## 🧩 Tech Stack

- **HTML5** — struktur semantik
- **CSS3** — custom properties, grid, flexbox, backdrop-filter, keyframe animations
- **Vanilla JavaScript** — IntersectionObserver, Canvas API, tanpa dependency

---

© Andi Wahyudi. Dibuat dengan ❤️ untuk pendidikan matematika Indonesia.
