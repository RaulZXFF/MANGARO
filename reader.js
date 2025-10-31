(function () {
  if (!window._reader) return;

  const config = window._reader;
  const basePath = config.basePath || './images/';
  const total = config.totalPages || 1;
  const prefix = config.filePrefix || '';
  const ext = config.fileExtension || '.png';

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

  const verticalPreferenceKey = 'mangaro.verticalMode';
  const rememberPreferenceKey = 'mangaro.rememberProgress';
  const zoomPreferenceKey = 'mangaro.readerZoom';
  const themePreferenceKey = 'mangaro.readerTheme';
  const storedPageKey = `${location.pathname}_page`;
  const readChaptersKey = 'mangaro.readChapters';
  const themeOptions = ['theme-dark', 'theme-light', 'theme-sepia', 'theme-sunset'];

  const imgEl = document.getElementById('reader-img');
  const readerWrap = document.querySelector('.reader-wrap');
  if (!imgEl || !readerWrap) return;

  const pageIndicator = document.getElementById('page-indicator');
  const slider = document.getElementById('page-slider');
  const toggleBtn = document.getElementById('toggle-mode');

  let verticalStage = readerWrap.querySelector('.reader-vertical');
  if (!verticalStage) {
    verticalStage = document.createElement('div');
    verticalStage.className = 'reader-vertical';
    readerWrap.appendChild(verticalStage);
  }
  verticalStage.hidden = true;
  verticalStage.innerHTML = '';

  let progressBar = document.querySelector('.read-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'read-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);
  }

  const verticalCache = new Map();

  let verticalMode = storage.getItem(verticalPreferenceKey) === 'true';
  let rememberProgress = storage.getItem(rememberPreferenceKey) !== 'false';

  const storedZoomValue = parseFloat(storage.getItem(zoomPreferenceKey));
  let zoom = Number.isFinite(storedZoomValue) ? storedZoomValue : 1;

  let theme = storage.getItem(themePreferenceKey) || 'theme-dark';
  if (!themeOptions.includes(theme)) {
    theme = 'theme-dark';
  }

  const storedPageValue = rememberProgress
    ? parseInt(storage.getItem(storedPageKey), 10)
    : NaN;
  let page = Number.isInteger(storedPageValue) ? storedPageValue : 1;
  page = Math.min(total, Math.max(1, page));

  function clampZoom(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 1;
    const rounded = Math.round(numeric * 100) / 100;
    return Math.min(1.8, Math.max(0.6, rounded));
  }

  function emitReaderState() {
    document.dispatchEvent(
      new CustomEvent('mangaro:reader-state', {
        detail: { page, total, verticalMode, rememberProgress, zoom, theme },
      })
    );
  }

  function updateProgress() {
    if (!verticalMode) {
      progressBar.style.width = '0%';
      return;
    }
    const maxScroll = readerWrap.scrollHeight - readerWrap.clientHeight;
    if (maxScroll <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const ratio = Math.min(1, Math.max(0, readerWrap.scrollTop / maxScroll));
    progressBar.style.width = `${ratio * 100}%`;
  }

  function setPageIndicator() {
    if (pageIndicator) {
      pageIndicator.textContent = `${page} / ${total}`;
    }
    if (slider) {
      slider.value = total - page + 1;
    }
  }

  function storePage() {
    if (rememberProgress) {
      storage.setItem(storedPageKey, String(page));
    } else {
      storage.removeItem(storedPageKey);
    }
  }

  function preloadPrevious() {
    const prev = page - 1;
    if (prev >= 1) {
      const preloadImage = new Image();
      preloadImage.src = `${basePath}${prefix}${prev}${ext}`;
    }
  }

  function renderVerticalSlices() {
    if (!verticalMode) return;

    const naturalWidth = imgEl.naturalWidth;
    const naturalHeight = imgEl.naturalHeight;
    if (!naturalWidth || !naturalHeight) return;

    const cached = verticalCache.get(page);
    let sliceData = cached;

    if (!sliceData) {
      const isDoublePage = naturalWidth / naturalHeight > 1.15;
      const slices = [];

      if (isDoublePage) {
        const halfWidth = Math.floor(naturalWidth / 2) || naturalWidth;
        const halves = [
          { side: 'right', label: 'Pagina din dreapta', sx: naturalWidth - halfWidth },
          { side: 'left', label: 'Pagina din stânga', sx: 0 },
        ];

        halves.forEach((half) => {
          const canvas = document.createElement('canvas');
          canvas.width = halfWidth;
          canvas.height = naturalHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(
              imgEl,
              half.sx,
              0,
              halfWidth,
              naturalHeight,
              0,
              0,
              halfWidth,
              naturalHeight
            );
          }
          slices.push({
            side: half.side,
            label: half.label,
            url: canvas.toDataURL('image/png'),
          });
        });
      } else {
        const canvas = document.createElement('canvas');
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(imgEl, 0, 0, naturalWidth, naturalHeight, 0, 0, naturalWidth, naturalHeight);
        }
        slices.push({
          side: 'single',
          label: 'Pagina completă',
          url: canvas.toDataURL('image/png'),
        });
      }

      sliceData = { slices, isDoublePage };
      verticalCache.set(page, sliceData);
    }

    const { slices, isDoublePage } = sliceData;

    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'reader-vertical__page';

    const baseIndex = (page - 1) * 2;

    slices.forEach((slice, index) => {
      const figure = document.createElement('figure');
      figure.className = 'reader-vertical__slice';
      if (slice.side) {
        figure.dataset.side = slice.side;
      }

      const image = document.createElement('img');
      image.src = slice.url;
      const logicalPage = isDoublePage
        ? baseIndex + (slice.side === 'right' ? 1 : 2)
        : baseIndex + index + 1;
      const altSuffix = Number.isFinite(logicalPage) ? ` - pagina ${logicalPage}` : '';
      image.alt = `${slice.label}${altSuffix}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      figure.appendChild(image);

      const caption = document.createElement('figcaption');
      caption.className = 'reader-vertical__label';
      caption.textContent = slice.label;
      figure.appendChild(caption);

      pageWrapper.appendChild(figure);
    });

    verticalStage.innerHTML = '';
    verticalStage.appendChild(pageWrapper);
    readerWrap.scrollTop = 0;
    updateProgress();
  }

  function update(newPage, opts = {}) {
    const nextPage = Math.min(total, Math.max(1, newPage));
    page = nextPage;
    verticalStage.innerHTML = '';
    imgEl.src = `${basePath}${prefix}${page}${ext}`;
    setPageIndicator();
    storePage();
    readerWrap.scrollTop = 0;

    if (!opts.silent) {
      emitReaderState();
    }

    if (page === total) {
      const slug = window.location.pathname.match(/CA-\d+/)?.[0] || null;
      if (slug) {
        const read = JSON.parse(storage.getItem(readChaptersKey) || '[]');
        if (!read.includes(slug)) {
          read.push(slug);
          storage.setItem(readChaptersKey, JSON.stringify(read));
        }
      }
      document.dispatchEvent(
        new CustomEvent('mangaro:chapter-read', {
          detail: { slug },
        })
      );
    }
  }

  function setVerticalMode(nextValue, opts = {}) {
    verticalMode = Boolean(nextValue);
    document.body.classList.toggle('vertical-mode', verticalMode);
    imgEl.classList.toggle('is-hidden', verticalMode);
    verticalStage.hidden = !verticalMode;
    if (toggleBtn) {
      toggleBtn.textContent = verticalMode ? 'Mod Orizontal' : 'Mod Vertical';
    }
    storage.setItem(verticalPreferenceKey, verticalMode ? 'true' : 'false');
    if (verticalMode) {
      renderVerticalSlices();
    } else {
      verticalStage.innerHTML = '';
      readerWrap.scrollTop = 0;
    }
    updateProgress();
    if (!opts.silent) {
      document.dispatchEvent(
        new CustomEvent('mangaro:vertical-change', {
          detail: { enabled: verticalMode },
        })
      );
      emitReaderState();
    }
  }

  function toggleVerticalMode() {
    setVerticalMode(!verticalMode);
  }

  function setRememberProgress(nextValue, opts = {}) {
    rememberProgress = Boolean(nextValue);
    storage.setItem(
      rememberPreferenceKey,
      rememberProgress ? 'true' : 'false'
    );
    storePage();
    if (!opts.silent) {
      document.dispatchEvent(
        new CustomEvent('mangaro:remember-change', {
          detail: { enabled: rememberProgress },
        })
      );
      emitReaderState();
    }
  }

  function setZoom(nextValue, opts = {}) {
    zoom = clampZoom(nextValue);
    document.documentElement.style.setProperty('--reader-zoom', zoom);
    storage.setItem(zoomPreferenceKey, String(zoom));
    if (!opts.silent) {
      document.dispatchEvent(
        new CustomEvent('mangaro:zoom-change', { detail: { zoom } })
      );
      emitReaderState();
    }
    if (verticalMode) {
      renderVerticalSlices();
    }
  }

  function setTheme(nextTheme, opts = {}) {
    const selectedTheme = themeOptions.includes(nextTheme)
      ? nextTheme
      : 'theme-dark';
    themeOptions.forEach((name) => document.body.classList.remove(name));
    document.body.classList.add(selectedTheme);
    theme = selectedTheme;
    storage.setItem(themePreferenceKey, theme);
    if (!opts.silent) {
      document.dispatchEvent(
        new CustomEvent('mangaro:theme-change', { detail: { theme } })
      );
      emitReaderState();
    }
  }

  function go(delta) {
    update(page + delta);
  }

  function goTo(pageNumber) {
    update(pageNumber);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      go(-1);
    } else if (event.key === 'ArrowRight') {
      go(1);
    }
  });

  imgEl.addEventListener('click', (event) => {
    const rect = imgEl.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    if (relativeX < rect.width / 2) {
      go(1);
    } else {
      go(-1);
    }
  });

  readerWrap.addEventListener('scroll', updateProgress);

  imgEl.addEventListener('load', () => {
    preloadPrevious();
    if (verticalMode) {
      renderVerticalSlices();
    }
    updateProgress();
  });

  if (slider) {
    slider.min = 1;
    slider.max = total;
    slider.step = 1;
    slider.value = total - page + 1;
    slider.addEventListener('input', () => {
      const visualValue = parseInt(slider.value, 10);
      goTo(total - visualValue + 1);
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleVerticalMode);
  }

  setTheme(theme, { silent: true });
  setZoom(zoom, { silent: true });
  setVerticalMode(verticalMode, { silent: true });
  setRememberProgress(rememberProgress, { silent: true });
  update(page, { silent: true });
  emitReaderState();
  document.dispatchEvent(
    new CustomEvent('mangaro:vertical-change', {
      detail: { enabled: verticalMode },
    })
  );
  document.dispatchEvent(
    new CustomEvent('mangaro:remember-change', {
      detail: { enabled: rememberProgress },
    })
  );

  window.readerControls = {
    toggleVerticalMode,
    setVerticalMode,
    goToPage: goTo,
    goToFirst: () => goTo(1),
    goToLast: () => goTo(total),
    getState: () => ({ page, total, verticalMode, rememberProgress, zoom, theme }),
    setRememberProgress,
    setZoom,
    setTheme,
    themeOptions: () => [...themeOptions],
  };
})();
