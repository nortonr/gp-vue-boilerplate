export default async function Text (client, data) {
  console.log(data, client.storyblok);
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
      }
    }
  };
}
