Project: Portofolio Pribadi – Modul P1-W08: JSON, Fetch API, dan Async/Await

Nama: Indra Yudhistira
Kelas: X RPL 1
Sekolah: SMKN Takeran
Kode minggu: P1-W08

Link GitHub: https://github.com/xx1ndr/portofolio-p1-w08
Link Vercel: [isi setelah deploy]
Link YouTube: [isi setelah video diunggah sebagai Unlisted]

Pencapaian Praktikum

- Daftar repositori GitHub saya tampil otomatis di halaman Proyek dari endpoint https://api.github.com/users/xx1ndr/repos. Tautannya membuka GitHub di tab baru.
- Status "Memuat..." tampil sebelum data datang. Saya mengujinya dengan throttling Slow 4G di tab Network.
- Fungsi ambilRepo memeriksa response.ok. Bila username sengaja diubah menjadi salah, halaman menampilkan "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti." dan detail error dicatat dengan console.error.
- Data keahlian dan proyek dipindah ke data/keahlian.json dan data/proyek.json. Keduanya dibaca dengan fetch; array lama sudah dihapus dari main.js.
- Tombol filter Semua, HTML, CSS, dan JavaScript tetap berfungsi setelah data proyek dimuat dari JSON. Saat ini ada 3 kartu: 1 CSS dan 2 JavaScript.
- Tantangan: repositori diambil dengan ?per_page=100, diurutkan sendiri berdasarkan updated_at, lalu enam teratas ditampilkan dengan bahasa dan jumlah bintang.

Bukti

1. screenshots/P1W08_IndraYudhistira_01_repo.png — halaman Proyek di alamat vercel.app dengan daftar repositori. [ganti dengan tangkapan layar dari Vercel setelah deploy]
2. screenshots/P1W08_IndraYudhistira_02_network.png — tab Network dengan filter Fetch/XHR, berisi request proyek.json dan repos berstatus 200. [belum diambil]
3. screenshots/P1W08_IndraYudhistira_03_error.png — pesan error saat username sengaja salah, diambil di Live Server.

Video

Judul: [UBIG P1-W08] Fetching Data with JavaScript | Indra Yudhistira – SMKN Takeran

Isi demo: membuka endpoint GitHub di browser, menunjukkan daftar repositori dan status loading dengan Slow 4G, menguji username yang salah, menunjukkan tab Network, lalu menjelaskan fetch, await, response.ok, dan try/catch di main.js serta isi proyek.json.

Catatan

Saat pengujian berulang, GitHub API sempat mengembalikan 403 karena batas 60 permintaan per jam untuk alamat IP yang dipakai bersama. Halaman menunjukkan pesan error ramah seperti yang diuji pada praktik.

Sebelum dikirim

- Isi link Vercel dan YouTube.
- Ambil screenshot 02_network dari DevTools Chrome, lalu ganti screenshot 01 dengan versi vercel.app.
- Unggah video sebagai Unlisted dan masukkan ke playlist Paket 1.
- Kerjakan kuis P1-W08 melalui Google Form paling lambat bersama tenggat laporan, H-1 sebelum pertemuan Minggu 09 pukul 22.00 WIB.
