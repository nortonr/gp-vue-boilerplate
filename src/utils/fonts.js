export function loadFonts () {
  var preloads = [];
  if (navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g')) {
    preloads = document.querySelectorAll('link[rel=\'delay-prefetch\'][data-required=\'true\']');
  } else {
    preloads = document.querySelectorAll('link[rel=\'delay-prefetch\']');
  }

  if (linkFeatureDetection()) {
    prefetchFonts(Array.from(preloads));
  } else {
    // not support link rel prefetch
    const classList = Array.from(preloads).reduce((result, preload) => result.concat(getRegisteredFontClasses(preload.dataset)), []);
    document.documentElement.classList.add(...classList);
  }
}

function linkFeatureDetection () {
  const link = document.createElement('link');
  if ('relList' in link) {
    return link.relList.supports('prefetch');
  }
  return false;
}

function prefetchFonts (preloads, classList = [], readyClassList) {
  let range = preloads.splice(0, Math.min(2, preloads.length));
  (global.requestIdleCallback || global.setTimeout)(() => {
    if (readyClassList) {
      document.documentElement.classList.add(...classList.flat());
    }
    if (range.length) {
      Promise.all(range.map((item) => {
        return prefetchFont(item);
      }))
        .then((list) => {
          prefetchFonts(preloads, list, list.concat(readyClassList));
          return;
        })
        .catch((e) => {
          throw e;
        });
    } else {
      document.documentElement.classList.add(...readyClassList.flat());
    }
  });
}

function prefetchFont (item) {
  return new Promise((resolve, reject) => {
    item.onload = resolve;
    item.onerror = reject;
    item.rel = 'prefetch';
  })
    .then((e) => {
      return e.target.dataset;
    })
    .then((options) => {
      return getRegisteredFontClasses(options);
    })
    .catch((e) => {
      throw e;
    });
}

function getRegisteredFontClasses (options) {
  return [
    `font_${options.set}`,
    `font_${options.set}_${options.weight}`
  ];
}
