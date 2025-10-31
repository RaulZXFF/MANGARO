// === Kagurabachi - Lista Capitolelor + Căutare ===
const chapters = [
  { slug: 'CA-1', title: '#001 - Misiunea' },
  { slug: 'CA-2', title: '#002 - Gramezi' },
  { slug: 'CA-3', title: '#003 - Martor ocular' },
  { slug: 'CA-4', title: '#004 - Sabia ascunsă' },
  { slug: 'CA-5', title: '#005 - Ucigașul' },
  { slug: 'CA-6', title: '#006 - Începutul' },
  { slug: 'CA-7', title: '#007 - Răzbunare' },
  { slug: 'CA-8', title: '#008 - Umbra' },
  { slug: 'CA-9', title: '#009 - Tăcerea' },
  { slug: 'CA-10', title: '#010 - Flacăra' },
  { slug: 'CA-11', title: '#011 - Duelul' },
  { slug: 'CA-12', title: '#012 - Trezirea' },
  { slug: 'CA-13', title: '#013 - Secretul' },
  { slug: 'CA-14', title: '#014 - Aliatul' },
  { slug: 'CA-15', title: '#015 - Vânzarea' },
  { slug: 'CA-16', title: '#016 - Vânzătorul' },
  { slug: 'CA-17', title: '#017 - Prețul' },
  { slug: 'CA-18', title: '#018 - Următorul pas' },
  { slug: 'CA-19', title: '#019 - Întâlnirea' },
  { slug: 'CA-20', title: '#020 - Provocarea' },
  { slug: 'CA-21', title: '#021 - Lupta' },
  { slug: 'CA-22', title: '#022 - Victoria' },
  { slug: 'CA-23', title: '#023 - Consecințele' },
  { slug: 'CA-24', title: '#024 - Planul' },
  { slug: 'CA-25', title: '#025 - Pregătirea' },
  { slug: 'CA-26', title: '#026 - Infiltrarea' },
  { slug: 'CA-27', title: '#027 - Descoperirea' },
  { slug: 'CA-28', title: '#028 - Confruntarea' },
  { slug: 'CA-29', title: '#029 - Adevărul' },
  { slug: 'CA-30', title: '#030 - Trădarea' },
  { slug: 'CA-31', title: '#031 - Fuga' },
  { slug: 'CA-32', title: '#032 - Refugiul' },
  { slug: 'CA-33', title: '#033 - Antrenamentul' },
  { slug: 'CA-34', title: '#034 - Maestrul' },
  { slug: 'CA-35', title: '#035 - Lecția' },
  { slug: 'CA-36', title: '#036 - Progresul' },
  { slug: 'CA-37', title: '#037 - Testul' },
  { slug: 'CA-38', title: '#038 - Eșecul' },
  { slug: 'CA-39', title: '#039 - Revenirea' },
  { slug: 'CA-40', title: '#040 - Decizia' },
  { slug: 'CA-41', title: '#041 - Drumul' },
  { slug: 'CA-42', title: '#042 - Destinația' },
  { slug: 'CA-43', title: '#043 - Bătălia' },
  { slug: 'CA-44', title: '#044 - Sacrificiul' },
  { slug: 'CA-45', title: '#045 - Durerea' },
  { slug: 'CA-46', title: '#046 - Vindecarea' },
  { slug: 'CA-47', title: '#047 - Puterea' },
  { slug: 'CA-48', title: '#048 - Ascensiunea' },
  { slug: 'CA-49', title: '#049 - Amenințarea' },
  { slug: 'CA-50', title: '#050 - Pregătirea finală' },
  { slug: 'CA-51', title: '#051 - Asaltul' },
  { slug: 'CA-52', title: '#052 - Inamicul' },
  { slug: 'CA-53', title: '#053 - Lupta supremă' },
  { slug: 'CA-54', title: '#054 - Dezvăluirea' },
  { slug: 'CA-55', title: '#055 - Moștenirea' },
  { slug: 'CA-56', title: '#056 - Trecutul' },
  { slug: 'CA-57', title: '#057 - Originea' },
  { slug: 'CA-58', title: '#058 - Legenda' },
  { slug: 'CA-59', title: '#059 - Chemarea' },
  { slug: 'CA-60', title: '#060 - Răspunsul' },
  { slug: 'CA-61', title: '#061 - Alianța' },
  { slug: 'CA-62', title: '#062 - Strategia' },
  { slug: 'CA-63', title: '#063 - Execuția' },
  { slug: 'CA-64', title: '#064 - Haosul' },
  { slug: 'CA-65', title: '#065 - Salvarea' },
  { slug: 'CA-66', title: '#066 - Reuniunea' },
  { slug: 'CA-67', title: '#067 - Jurământul' },
  { slug: 'CA-68', title: '#068 - Pregătirea războiului' },
  { slug: 'CA-69', title: '#069 - Armata' },
  { slug: 'CA-70', title: '#070 - Invazia' },
  { slug: 'CA-71', title: '#071 - Frontul' },
  { slug: 'CA-72', title: '#072 - Pierderile' },
  { slug: 'CA-73', title: '#073 - Contraatacul' },
  { slug: 'CA-74', title: '#074 - Speranța' },
  { slug: 'CA-75', title: '#075 - Ultima șansă' },
  { slug: 'CA-76', title: '#076 - Decizia finală' },
  { slug: 'CA-77', title: '#077 - Confruntarea supremă' },
  { slug: 'CA-78', title: '#078 - Tăierea' },
  { slug: 'CA-79', title: '#079 - Victoria amară' },
  { slug: 'CA-80', title: '#080 - Pace temporară' },
  { slug: 'CA-81', title: '#081 - Noua amenințare' },
  { slug: 'CA-82', title: '#082 - Umbra din adâncuri' },
  { slug: 'CA-83', title: '#083 - Trezirea antică' },
  { slug: 'CA-84', title: '#084 - Sabia blestemată' },
  { slug: 'CA-85', title: '#085 - Călătoria interzisă' },
  { slug: 'CA-86', title: '#086 - Templul uitat' },
  { slug: 'CA-87', title: '#087 - Gardianul' },
  { slug: 'CA-88', title: '#088 - Proba' },
  { slug: 'CA-89', title: '#089 - Adevărata putere' },
  { slug: 'CA-90', title: '#090 - Moartea și renașterea' },
  { slug: 'CA-91', title: '#091 - Ultimul dușman' },
  { slug: 'CA-92', title: '#092 - Bătălia finală' },
  { slug: 'CA-93', title: '#093 - Sacrificiul suprem' },
  { slug: 'CA-94', title: '#094 - Moștenitorul' },
  { slug: 'CA-95', title: '#095 - Noua eră' },
  { slug: 'CA-96', title: '#096 - Legământul' },
  { slug: 'CA-97', title: '#097 - Viitorul' },
  { slug: 'CA-98', title: '#098 - Kagurabachi' },
];

const listContainer = document.getElementById("chapters-list");
const searchInput = document.getElementById("chapterSearch");
const filterToggle = document.getElementById("filterUnread");

if (listContainer && searchInput && filterToggle) {
  function renderChapters(filter = "", showUnreadOnly = false) {
    const read = JSON.parse(localStorage.getItem("mangaro.readChapters") || "[]");
    const filtered = chapters.filter((c) => {
      const matchesText =
        c.title.toLowerCase().includes(filter.toLowerCase()) ||
        c.slug.toLowerCase().includes(filter.toLowerCase());
      const matchesUnread = showUnreadOnly ? !read.includes(c.slug) : true;
      return matchesText && matchesUnread;
    });

    if (!filtered.length) {
      listContainer.innerHTML = `<p class="no-results">Niciun capitol găsit.</p>`;
      return;
    }

    listContainer.innerHTML = filtered
      .map(
        (c) => `
      <a class="chapter-button ${read.includes(c.slug) ? "read" : ""}" href="./${c.slug}/${c.slug}.html">
        ${c.title}
      </a>`
      )
      .join("");

    // 🔥 Mic efect de fade la schimbarea listei
    listContainer.style.opacity = 0;
    setTimeout(() => {
      listContainer.style.opacity = 1;
    }, 150);
  }

  function refreshList() {
    renderChapters(searchInput.value, filterToggle.checked);
  }

  searchInput.addEventListener("input", refreshList);
  filterToggle.addEventListener("change", refreshList);

  // 🔥 Afișează capitolele imediat la încărcare
  document.addEventListener("DOMContentLoaded", () => {
    renderChapters();

    // ✨ Bonus: efect "smooth inertia" la scroll
    const scroller = document.querySelector(".chapters-box");
    if (scroller) {
      let lastY = 0;
      let ticking = false;
      scroller.addEventListener("scroll", () => {
        lastY = scroller.scrollTop;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            scroller.style.scrollBehavior = "smooth";
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  });
}