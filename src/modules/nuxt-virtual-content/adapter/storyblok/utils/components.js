
const componentTransforms = {
  StageImage: require('../adapter/components/StageImage'),
  TextImage: require('../adapter/components/TextImage')
};

export async function parseComponent (client, component, options) {
  if (String(component.component) in componentTransforms) {
    return componentTransforms[String(component.component)].default(client, component.data, options);
  } else {
    throw new Error(`component ${component} not found`);
  }

}

export function parseComponents (client, components, options) {
  return Promise.all(components.map(component => { return parseComponent(client, component, options); }));
}

