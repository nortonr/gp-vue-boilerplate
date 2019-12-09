import { getPictureFromAdvancedImage } from '../../utils/asset';

export const IMAGE_BREAKPOINTS = {
  default: [
    412, 232
  ],
  xs: [
    768, 432
  ],
  sm: [
    992, 558
  ],
  md: [
    1200, 675
  ],
  lg: [
    1600, 900
  ],
  xl: [
    1920, 1080
  ]
};

export default async function TextImage (client, data) {
  return {
    disabled: data.disabled,
    component: data.component,
    data: {
      article: {
        headline: {
          overline: data.overline,
          headline: data.headline,
          subline: data.subline
        },
        content: client.storyblok.richTextResolver.render(data.content)
      },
      picture: getPictureFromAdvancedImage(data.image, IMAGE_BREAKPOINTS, 2)
    }
  };
}
