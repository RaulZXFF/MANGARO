(function () {
  if (!window._reader) return;

  const config = window._reader;
  const basePath = config.basePath || './images/';
  const total = config.totalPages || 1;
  const prefix = config.filePrefix || '';
  const ext = config.fileExtension || '.png';

  const verticalPreferenceKey = 'mangaro.verticalMode';
  const rememberPreferenceKey = 'mangaro.rememberProgress';
  const storedPageKey = `${location.pathname}_page`;

  const imgEl = document.getElementById('reader-img');
  if (!imgEl) return;

  const pageIndicator = document.getElementById('page-indicator');
  const slider = document.getElementById('page-slider');
  const toggleBtn = document.getElementById('toggle-mode');

  let verticalMode = localStorage.getItem(verticalPreferenceKey) === 'true';
  let rememberProgress = localStorage.getItem(rememberPreferenceKey) !== 'false';

  const storedPageValue = rememberProgress
    ? parseInt(localStorage.getItem(storedPageKey), 10)
    : NaN;
  let page = Number.isInteger(storedPageValue) ? storedPageValue : total;
  if (page < 1) page = 1;
  if (page > total) page = total;

  function emitReaderState() {
    document.dispatchEvent(
      new CustomEvent('mangaro:reader-state', {
        detail: { page, total, verticalMode, rememberProgress },
      })
    );
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
      localStorage.setItem(storedPageKey, String(page));
    } else {
      localStorage.removeItem(storedPageKey);
    }
  }

  function update(newPage, opts = {}) {
    const nextPage = Math.min(total, Math.max(1, newPage));
    page = nextPage;
    imgEl.src = basePath + prefix + page + ext;
    setPageIndicator();
    storePage();
    if (!opts.silent) {
      emitReaderState();
    }
  }

  function preloadPrevious() {
    const prev = page - 1;
    if (prev >= 1) {
      const preloadImage = new Image();
      preloadImage.src = basePath + prefix + prev + ext;
    }
  }

  function setVerticalMode(nextValue, opts = {}) {
    verticalMode = Boolean(nextValue);
    document.body.classList.toggle('vertical-mode', verticalMode);
    if (toggleBtn) {
      toggleBtn.textContent = verticalMode ? 'Mod Orizontal' : 'Mod Vertical';
    }
    imgEl.style.objectFit = verticalMode ? 'none' : 'contain';
    localStorage.setItem(verticalPreferenceKey, verticalMode ? 'true' : 'false');
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
    localStorage.setItem(
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

  function go(delta) {
    update(page + delta);
  }

  function goTo(pageNumber) {
    update(pageNumber);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      go(1);
    } else if (event.key === 'ArrowRight') {
      go(-1);
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

  imgEl.addEventListener('load', preloadPrevious);

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
    getState: () => ({ page, total, verticalMode, rememberProgress }),
    setRememberProgress,
  };
})();