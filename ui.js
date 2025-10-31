(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // === Rulează doar pe paginile de capitol ===
    const isReaderPage = /CA-\d+/.test(window.location.pathname);
    if (!isReaderPage) return;

    // === Încarcă lista de capitole din series-index.js ===
    if (typeof chapters === "undefined" || !Array.isArray(chapters)) {
      console.warn("⚠️ Lista de capitole nu este disponibilă. Verifică series-index.js");
      return;
    }

    // === Calculează adâncimea și calea corectă ===
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const repoIndex = pathParts.indexOf("mangaro");
    const siteParts = repoIndex !== -1 ? pathParts.slice(repoIndex + 1) : pathParts;
    const depth = siteParts.length - 2; // ex: Kagurabachi/CA-1/CA-1.html
    const rootPrefix = depth > 0 ? "../".repeat(depth) : "./";
    const seriesSlug = siteParts[0] || "Kagurabachi";
    const seriesBasePath = `${rootPrefix}${seriesSlug}/`;

    // === Creează meniul ===
    const menuToggle = document.createElement("button");
    menuToggle.type = "button";
    menuToggle.className = "menu-toggle";
    menuToggle.innerHTML = `<span class="menu-toggle__label">MENIU</span>`;
    document.body.appendChild(menuToggle);

    const menuOverlay = document.createElement("div");
    menuOverlay.className = "menu-overlay";
    document.body.appendChild(menuOverlay);

    const slideMenu = document.createElement("nav");
    slideMenu.className = "slide-menu";
    slideMenu.id = "slideMenu";

    // === Linkuri statice ===
    const staticLinks = [
      { href: `${rootPrefix}index.html`, label: "Pagina principală" },
      { href: `../${seriesBasePath}index.html`, label: "Lista capitolelor" },
    ];

    const staticItems = staticLinks
      .map(({ href, label }) => `<li><a class="slide-menu__link" href="${href}">${label}</a></li>`)
      .join("");

    // === Capitolul curent ===
    const currentChapterMatch = window.location.pathname.match(/CA-\d+/);

    // === Creează lista capitolelor din series-index.js ===
    const chapterItems = chapters
      .map(({ slug, title }) => {
        const href = `${seriesBasePath}${slug}/${slug}.html`;
        const isActive = currentChapterMatch && currentChapterMatch[0] === slug;
        return `<li><a class="slide-menu__link${isActive ? " is-active" : ""}" href="${href}" data-slug="${slug}">${title}</a></li>`;
      })
      .join("");

    slideMenu.innerHTML = `
      <div class="slide-menu__header">
        <h3>MENIU</h3>
        <button type="button" class="slide-menu__close">&times;</button>
      </div>
      <div class="slide-menu__body">
        <section class="slide-menu__settings">
          <h4>Setări cititor</h4>
          <div class="reader-setting">
            <label class="setting-toggle">
              <input type="checkbox" id="toggleAnimations">
              <span>Activează animațiile</span>
            </label>
          </div>
        </section>
        <section>
          <ul class="slide-menu__section">${staticItems}</ul>
        </section>
        <section class="chapters-block">
          <button type="button" class="chapters-toggle" aria-expanded="false">Capitole</button>
          <div class="chapters-list" hidden>
            <ul class="slide-menu__section">${chapterItems}</ul>
          </div>
        </section>
      </div>
    `;
    document.body.appendChild(slideMenu);

    // === Funcții deschidere/închidere ===
    const closeButton = slideMenu.querySelector(".slide-menu__close");
    const chaptersToggle = slideMenu.querySelector(".chapters-toggle");
    const chaptersList = slideMenu.querySelector(".chapters-list");

    function openMenu() {
      slideMenu.classList.add("open");
      menuOverlay.classList.add("open");
      document.body.classList.add("menu-open");
    }
    function closeMenu() {
      slideMenu.classList.remove("open");
      menuOverlay.classList.remove("open");
      document.body.classList.remove("menu-open");
    }

    menuToggle.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    menuOverlay.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // === Expand capitole ===
    chaptersToggle.addEventListener("click", () => {
      const expanded = chaptersToggle.getAttribute("aria-expanded") === "true";
      chaptersToggle.setAttribute("aria-expanded", !expanded);
      chaptersList.hidden = expanded;
    });

    // === Toggle animații ===
    const animationsToggle = document.getElementById("toggleAnimations");
    const animationsEnabled = localStorage.getItem("mangaro.animations") !== "false";
    if (!animationsEnabled) document.body.classList.add("no-animations");
    animationsToggle.checked = animationsEnabled;
    animationsToggle.addEventListener("change", (e) => {
      const enabled = e.target.checked;
      localStorage.setItem("mangaro.animations", enabled);
      document.body.classList.toggle("no-animations", !enabled);
    });
  });
})();
