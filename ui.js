(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const storage = (() => {
      if (window.__mangaroStorage) {
        return window.__mangaroStorage;
      }
      try {
        const probeKey = '__mangaro_probe__';
        window.localStorage.setItem(probeKey, '1');
        window.localStorage.removeItem(probeKey);
        window.__mangaroStorage = window.localStorage;
      } catch (error) {
        const memory = new Map();
        window.__mangaroStorage = {
          getItem: (key) => (memory.has(key) ? memory.get(key) : null),
          setItem: (key, value) => {
            memory.set(key, String(value));
          },
          removeItem: (key) => {
            memory.delete(key);
          },
        };
      }
      return window.__mangaroStorage;
    })();

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
    menuToggle.setAttribute("aria-controls", "slideMenu");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Deschide meniul de citire");
    menuToggle.innerHTML = `
      <span class="menu-toggle__icon" aria-hidden="true"></span>
      <span class="menu-toggle__label">MENIU</span>
    `;
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
      { href: `${seriesBasePath}index.html`, label: "Lista capitolelor" },
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
        <button type="button" class="slide-menu__close" aria-label="Închide meniul">&times;</button>
      </div>
      <div class="slide-menu__body">
        <section class="slide-menu__settings">
          <h4>Setări cititor</h4>
          <div class="reader-setting">
            <span class="reader-setting__label">Mod de citire</span>
            <div class="reader-setting__group" role="group" aria-label="Mod de citire">
              <button type="button" class="reader-setting__pill" data-orientation="horizontal" aria-pressed="false">Orizontal</button>
              <button type="button" class="reader-setting__pill" data-orientation="vertical" aria-pressed="false">Vertical</button>
            </div>
          </div>
          <div class="reader-setting">
            <span class="reader-setting__label">Zoom</span>
            <input type="range" min="0.6" max="1.8" step="0.05" value="1" id="readerZoom" class="reader-setting__range" aria-label="Zoom">
            <div class="reader-setting__value" id="readerZoomValue">100%</div>
          </div>
          <div class="reader-setting">
            <span class="reader-setting__label">Temă</span>
            <div class="reader-setting__group" role="group" aria-label="Selectează tema">
              <button type="button" class="reader-setting__pill" data-theme="theme-dark" aria-pressed="false">Întunecat</button>
              <button type="button" class="reader-setting__pill" data-theme="theme-light" aria-pressed="false">Luminos</button>
              <button type="button" class="reader-setting__pill" data-theme="theme-sepia" aria-pressed="false">Sepia</button>
              <button type="button" class="reader-setting__pill" data-theme="theme-sunset" aria-pressed="false">Apus</button>
            </div>
          </div>
          <div class="reader-setting">
            <label class="setting-toggle">
              <input type="checkbox" id="rememberProgress">
              <span>Reține progresul</span>
            </label>
          </div>
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
      menuToggle.classList.add("open");
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }
    function closeMenu() {
      slideMenu.classList.remove("open");
      menuOverlay.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
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
      const expanded = chaptersToggle.classList.toggle("is-open");
      chaptersToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      chaptersList.hidden = !expanded;
    });

    slideMenu.querySelectorAll(".slide-menu__link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // === Stare capitole citite ===
    const readChaptersKey = "mangaro.readChapters";
    const chapterLinks = Array.from(
      slideMenu.querySelectorAll(".slide-menu__link[data-slug]")
    );

    function applyReadStatus() {
      const read = JSON.parse(storage.getItem(readChaptersKey) || "[]");
      chapterLinks.forEach((link) => {
        if (!link.dataset.slug) return;
        link.classList.toggle("read", read.includes(link.dataset.slug));
      });
    }

    applyReadStatus();
    document.addEventListener("mangaro:chapter-read", applyReadStatus);

    // === Integrare controale cititor ===
    const orientationButtons = slideMenu.querySelectorAll(
      "[data-orientation]"
    );
    const themeButtons = slideMenu.querySelectorAll("[data-theme]");
    const zoomControl = document.getElementById("readerZoom");
    const zoomValue = document.getElementById("readerZoomValue");
    const rememberToggle = document.getElementById("rememberProgress");

    let controls = window.readerControls || null;

    function ensureControls() {
      if (!controls && window.readerControls) {
        controls = window.readerControls;
      }
      return controls;
    }

    function formatZoom(value) {
      return `${Math.round(value * 100)}%`;
    }

    function syncState(state) {
      if (!state) return;
      const { verticalMode, theme, zoom, rememberProgress } = state;

      orientationButtons.forEach((button) => {
        const isVertical = button.dataset.orientation === "vertical";
        const active = isVertical ? verticalMode : !verticalMode;
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      themeButtons.forEach((button) => {
        const active = button.dataset.theme === theme;
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (zoomControl) {
        const clamped = Math.min(1.8, Math.max(0.6, Number(zoom) || 1));
        const steps = Math.round((clamped - 0.6) / 0.05);
        const normalized = Number((0.6 + steps * 0.05).toFixed(2));
        zoomControl.value = normalized.toFixed(2);
        if (zoomValue) {
          zoomValue.textContent = formatZoom(normalized);
        }
      }

      if (rememberToggle) {
        rememberToggle.checked = Boolean(rememberProgress);
      }
    }

    const readyControls = ensureControls();
    if (readyControls) {
      syncState(readyControls.getState());
    }

    document.addEventListener("mangaro:reader-state", (event) => {
      syncState(event.detail);
    });

    orientationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const isVertical = button.dataset.orientation === "vertical";
        const ctrl = ensureControls();
        if (ctrl) {
          ctrl.setVerticalMode(isVertical);
        }
      });
    });

    themeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const ctrl = ensureControls();
        if (ctrl) {
          ctrl.setTheme(button.dataset.theme);
        }
      });
    });

    if (zoomControl) {
      zoomControl.addEventListener("input", () => {
        const rawValue = Math.min(
          1.8,
          Math.max(0.6, parseFloat(zoomControl.value) || 1)
        );
        const steps = Math.round((rawValue - 0.6) / 0.05);
        const normalized = Number((0.6 + steps * 0.05).toFixed(2));
        zoomControl.value = normalized.toFixed(2);
        if (zoomValue) {
          zoomValue.textContent = formatZoom(normalized);
        }
        const ctrl = ensureControls();
        if (ctrl) {
          ctrl.setZoom(normalized);
        }
      });

      zoomControl.addEventListener("dblclick", () => {
        zoomControl.value = "1.00";
        if (zoomValue) {
          zoomValue.textContent = formatZoom(1);
        }
        const ctrl = ensureControls();
        if (ctrl) {
          ctrl.setZoom(1);
        }
      });
    }

    if (rememberToggle) {
      rememberToggle.addEventListener("change", (event) => {
        const ctrl = ensureControls();
        if (ctrl) {
          ctrl.setRememberProgress(event.target.checked);
        }
      });
    }

    // === Toggle animații ===
    const animationsToggle = document.getElementById("toggleAnimations");
    const animationsEnabled = storage.getItem("mangaro.animations") !== "false";
    if (!animationsEnabled) document.body.classList.add("no-animations");
    if (animationsToggle) {
      animationsToggle.checked = animationsEnabled;
      animationsToggle.addEventListener("change", (e) => {
        const enabled = e.target.checked;
        storage.setItem("mangaro.animations", enabled);
        document.body.classList.toggle("no-animations", !enabled);
      });
    }
  });
})();