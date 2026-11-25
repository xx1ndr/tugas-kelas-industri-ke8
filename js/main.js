// 1. Keahlian dari data/keahlian.json (halaman Beranda)
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const skills = await response.json();
    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      item.className = "skill-badge";
      daftarSkill.appendChild(item);
    });
    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}

if (daftarSkill && jumlahSkill) {
  muatKeahlian();
}

// 2. Tema gelap (semua halaman, pilihan tersimpan di localStorage)
const tombolTema = document.querySelector("#tombol-tema");
const kunciTema = "tema";

function terapkanTema(modeGelap) {
  document.body.classList.toggle("gelap", modeGelap);
  if (!tombolTema) return;
  tombolTema.textContent = modeGelap ? "Mode Terang" : "Mode Gelap";
  tombolTema.setAttribute("aria-pressed", modeGelap ? "true" : "false");
}

let temaTersimpan = null;
try {
  temaTersimpan = localStorage.getItem(kunciTema);
} catch {
  // Penyimpanan bisa diblokir; tema tetap memakai nilai bawaan.
}
terapkanTema(temaTersimpan === "gelap");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    const modeGelap = !document.body.classList.contains("gelap");
    terapkanTema(modeGelap);
    try {
      localStorage.setItem(kunciTema, modeGelap ? "gelap" : "terang");
    } catch {
      // Abaikan bila penyimpanan tidak tersedia.
    }
  });
}

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  const batasKarakter = kotakPesan.maxLength || 300;
  hitungKarakter.textContent = `0/${batasKarakter} karakter`;
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/${batasKarakter} karakter`;
  });
}

// 4. Modal kirim pesan (halaman Beranda)
const btnBukaModal = document.querySelector("#btnKontak");
const elemenModal = document.querySelector("#modalkontak");
const btnTutupModal = document.querySelector("#btnTutupModal");

if (btnBukaModal && elemenModal && btnTutupModal) {
  btnBukaModal.addEventListener("click", (event) => {
    event.preventDefault();
    elemenModal.classList.add("show");
  });
  btnTutupModal.addEventListener("click", () => {
    elemenModal.classList.remove("show");
  });
  elemenModal.addEventListener("click", (event) => {
    if (event.target === elemenModal) elemenModal.classList.remove("show");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") elemenModal.classList.remove("show");
  });
}

// 5. Form kontak: hanya demo, tidak mengirim ke server
const formKontak = document.querySelector("#formKontak");
const statusKontak = document.querySelector("#status-kontak");

if (formKontak && statusKontak) {
  formKontak.addEventListener("submit", (event) => {
    event.preventDefault();
    statusKontak.textContent = "Pesan tercatat. Terima kasih sudah menghubungi saya!";
  });
}

// 6. Proyek dari data/proyek.json dan filter (halaman Proyek)
let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
      <p>${item.deskripsi}</p>
    </article>`;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek || !jumlahProyek) return;
  daftarProyek.innerHTML = daftar.map(buatKartu).join("");
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

async function muatProyek() {
  jumlahProyek.textContent = "Memuat proyek...";
  try {
    const response = await fetch("data/proyek.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    proyek = await response.json();
    tampilkanProyek(proyek);
  } catch (error) {
    jumlahProyek.textContent = "Data proyek gagal dimuat.";
    console.error(error);
  }
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);
  if (!tombol) return;
  tombol.addEventListener("click", () => {
    const tombolAktif = document.querySelector(".tombol-filter.aktif");
    if (tombolAktif) tombolAktif.classList.remove("aktif");
    tombol.classList.add("aktif");

    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
    }
  });
}

if (daftarProyek && jumlahProyek) {
  muatProyek();
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}

// 7. Repositori GitHub terbaru (halaman Proyek)
const username = "xx1ndr";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?per_page=100";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  statusRepo.textContent = "Memuat...";
  daftarRepo.innerHTML = "";
  try {
    const response = await fetch(alamatRepo + pilihan);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const repos = await response.json();
    const teratas = repos
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .slice(0, 6);

    daftarRepo.innerHTML = "";
    teratas.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noopener noreferrer";
      tautan.textContent = `${repo.name} (${repo.language || "tanpa bahasa"}, ${repo.stargazers_count} bintang)`;
      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });
    statusRepo.textContent = `${teratas.length} repositori yang terakhir diperbarui:`;
  } catch (error) {
    statusRepo.textContent =
      "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
    console.error(error);
  }
}

if (daftarRepo && statusRepo) {
  ambilRepo();
}
