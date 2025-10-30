(function () {
  const pathParts = window.location.pathname
    .replace(/\/+$/, '')
    .split('/')
    .filter(Boolean);
  const repoSegment = 'mangaro';
  const repoIndex = pathParts.indexOf(repoSegment);
  const siteParts = repoIndex !== -1 ? pathParts.slice(repoIndex + 1) : pathParts;
  const defaultSeriesSlug = 'Kagurabachi';
  const fileName = siteParts[siteParts.length - 1] || '';
  const depth = fileName.includes('.')
    ? Math.max(siteParts.length - 1, 0)
    : siteParts.length;
  const rootPrefix = depth > 0 ? '../'.repeat(depth) : './';
  const firstSegment = siteParts[0] || '';
  const seriesSlug =
    firstSegment && !firstSegment.includes('.') ? firstSegment : defaultSeriesSlug;
  const seriesBasePath = `${rootPrefix}${seriesSlug}/`;

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

  const menuToggle = document.createElement('button');
  menuToggle.type = 'button';
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-controls', 'slideMenu');
  menuToggle.setAttribute('aria-label', 'Deschide meniul principal');
  menuToggle.innerHTML = `
    <span class="menu-toggle__icon" aria-hidden="true"></span>
    <span class="menu-toggle__label">MENIU</span>
  `;
  document.body.appendChild(menuToggle);

  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  document.body.appendChild(menuOverlay);

  const slideMenu = document.createElement('nav');
  slideMenu.className = 'slide-menu';
  slideMenu.id = 'slideMenu';
  slideMenu.setAttribute('aria-hidden', 'true');
  slideMenu.setAttribute('tabindex', '-1');

  const staticLinks = [
    { href: `${rootPrefix}index.html`, label: 'Pagina principală' },
    { href: `${seriesBasePath}index.html`, label: 'Lista capitolelor' },
  ];

  const normalizedCurrentPath = new URL(
    window.location.pathname,
    window.location.origin
  )
    .pathname.replace(/index\.html$/, '')
    .replace(/\/$/, '/');

  const staticItems = staticLinks
    .map(({ href, label }) => {
      const normalizedHref = new URL(href, window.location.href).pathname
        .replace(/index\.html$/, '')
        .replace(/\/$/, '/');
      const isActive = normalizedCurrentPath === normalizedHref;
      return `<li><a class="slide-menu__link${
        isActive ? ' is-active' : ''
      }" href="${href}">${label}</a></li>`;
    })
    .join('');

  const currentChapterMatch = window.location.pathname.match(/CA-\d+/);

  const chapterItems = chapters
    .map(({ slug, title }) => {
      const href = `${seriesBasePath}${slug}/${slug}.html`;
      const isActive = currentChapterMatch && currentChapterMatch[0] === slug;
      return `<li><a class="slide-menu__link${
        isActive ? ' is-active' : ''
      }" href="${href}" data-slug="${slug}">${title}</a></li>`;
    })
    .join('');

  const chaptersMarkup = chapterItems
    ? `<div class="chapters-list" data-element="chapters-list" aria-hidden="true" hidden>
        <ul class="slide-menu__section">
          ${chapterItems}
        </ul>
      </div>`
    : `<p class="slide-menu__message">Capitolele vor fi disponibile în curând.</p>`;

  slideMenu.innerHTML = `
    <div class="slide-menu__header">
      <h3>MENIU</h3>
      <button type="button" class="slide-menu__close" aria-label="Închide meniul">&times;</button>
    </div>
    <div class="slide-menu__body">
      <section class="slide-menu__settings" aria-label="Setări cititor">
        <h4 class="slide-menu__settings-title">Setări cititor</h4>
        <div class="reader-setting">
          <span class="reader-setting__label">Memorează progresul</span>
          <label class="toggle-switch">
            <input type="checkbox" data-setting="remember-progress" checked>
          </label>
        </div>
        <div class="reader-setting">
          <span class="reader-setting__label">Navigare rapidă</span>
          <div class="reader-setting__actions">
            <button type="button" class="reader-setting__button" data-action="goto-first">Prima</button>
            <button type="button" class="reader-setting__button" data-action="goto-last">Ultima</button>
          </div>
        </div>
      </section>
      <section>
        <ul class="slide-menu__section">
          ${staticItems}
        </ul>
      </section>
      <section class="chapters-block">
        <button type="button" class="chapters-toggle" data-action="toggle-chapters" aria-expanded="false">
          Capitole
        </button>
        ${chaptersMarkup}
      </section>
    </div>
  `;

  document.body.appendChild(slideMenu);

  const closeButton = slideMenu.querySelector('.slide-menu__close');
  const chaptersToggle = slideMenu.querySelector('[data-action="toggle-chapters"]');
  const chaptersContainer = slideMenu.querySelector('[data-element="chapters-list"]');
  const verticalToggle = slideMenu.querySelector('[data-setting="vertical-mode"]');
  const rememberToggle = slideMenu.querySelector('[data-setting="remember-progress"]');
  const gotoFirst = slideMenu.querySelector('[data-action="goto-first"]');
  const gotoLast = slideMenu.querySelector('[data-action="goto-last"]');

  const preferenceKeys = {
    vertical: 'mangaro.verticalMode',
    remember: 'mangaro.rememberProgress',
  };

  const storedVertical = localStorage.getItem(preferenceKeys.vertical) === 'true';
  const storedRemember = localStorage.getItem(preferenceKeys.remember) !== 'false';

  if (verticalToggle) {
    verticalToggle.checked = storedVertical;
  }
  if (rememberToggle) {
    rememberToggle.checked = storedRemember;
  }

  function openMenu() {
    slideMenu.classList.add('open');
    menuOverlay.classList.add('open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    slideMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    slideMenu.focus();
  }

  function closeMenu() {
    slideMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    slideMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', () => {
    if (slideMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuOverlay.addEventListener('click', closeMenu);
  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && slideMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  slideMenu.addEventListener('click', (event) => {
    const link = event.target.closest('.slide-menu__link');
    if (link) {
      closeMenu();
    }
  });

  if (chaptersToggle && chaptersContainer) {
    const shouldOpen = Boolean(currentChapterMatch);
    if (shouldOpen) {
      chaptersContainer.hidden = false;
      chaptersContainer.setAttribute('aria-hidden', 'false');
      chaptersToggle.setAttribute('aria-expanded', 'true');
      chaptersToggle.classList.add('is-open');
    }

    chaptersToggle.addEventListener('click', () => {
      const expanded = chaptersToggle.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      chaptersToggle.setAttribute('aria-expanded', String(next));
      chaptersToggle.classList.toggle('is-open', next);
      chaptersContainer.hidden = !next;
      chaptersContainer.setAttribute('aria-hidden', String(!next));
    });
  }

  if (verticalToggle) {
    verticalToggle.addEventListener('change', () => {
      const enabled = verticalToggle.checked;
      localStorage.setItem(
        preferenceKeys.vertical,
        enabled ? 'true' : 'false'
      );
      if (window.readerControls && typeof window.readerControls.setVerticalMode === 'function') {
        window.readerControls.setVerticalMode(enabled);
      } else if (document.querySelector('.reader-wrap')) {
        document.body.classList.toggle('vertical-mode', enabled);
        document.dispatchEvent(
          new CustomEvent('mangaro:vertical-change', { detail: { enabled } })
        );
      }
    });
  }

  if (rememberToggle) {
    rememberToggle.addEventListener('change', () => {
      const enabled = rememberToggle.checked;
      localStorage.setItem(
        preferenceKeys.remember,
        enabled ? 'true' : 'false'
      );
      if (
        window.readerControls &&
        typeof window.readerControls.setRememberProgress === 'function'
      ) {
        window.readerControls.setRememberProgress(enabled);
      } else {
        document.dispatchEvent(
          new CustomEvent('mangaro:remember-change', { detail: { enabled } })
        );
      }
    });
  }

  document.addEventListener('mangaro:vertical-change', (event) => {
    if (verticalToggle && typeof event.detail?.enabled === 'boolean') {
      verticalToggle.checked = event.detail.enabled;
    }
  });

  document.addEventListener('mangaro:remember-change', (event) => {
    if (rememberToggle && typeof event.detail?.enabled === 'boolean') {
      rememberToggle.checked = event.detail.enabled;
    }
  });

  const readerAvailable = Boolean(
    window.readerControls && typeof window.readerControls.goToFirst === 'function'
  );

  function setReaderActionState(enabled) {
    [gotoFirst, gotoLast].forEach((button) => {
      if (!button) return;
      if (enabled) {
        button.removeAttribute('disabled');
      } else {
        button.setAttribute('disabled', 'true');
      }
    });
  }

  setReaderActionState(readerAvailable);

  if (gotoFirst) {
    gotoFirst.addEventListener('click', () => {
      if (window.readerControls?.goToFirst) {
        window.readerControls.goToFirst();
      }
    });
  }

  if (gotoLast) {
    gotoLast.addEventListener('click', () => {
      if (window.readerControls?.goToLast) {
        window.readerControls.goToLast();
      }
    });
  }

  document.addEventListener('mangaro:reader-state', () => {
    const hasReader = Boolean(
      window.readerControls && typeof window.readerControls.goToFirst === 'function'
    );
    setReaderActionState(hasReader);
  });
})();
