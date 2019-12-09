const STORYBLOK_HOST = '//a.storyblok.com/';

function getResizeUrl (path, width, height) {
  return `https://img2.storyblok.com/${width + 'x' + height}/${path}`;
}

export function getPictureFromAdvancedImage ({ image, alt_tag, caption }, breakpoints, density = 1) {
  const path = image.replace(STORYBLOK_HOST, '');
  const sources = Object.keys(breakpoints).map(breakpoint => {
    const size = breakpoints[String(breakpoint)];
    const srcset = [];
    for (let i = 1; i <= density; i++) {
      srcset.push(getResizeUrl(path, size[0] * i, size[1] * i) + ` ${i}x`);
    }
    return {
      media: breakpoint,
      srcset: srcset.join(', ')
    };
  });
  return {
    sources,
    alt: alt_tag,
    title: caption
  };

}
