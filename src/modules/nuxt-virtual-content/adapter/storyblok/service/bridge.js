
let ready, bridge;
export default function getBridge ({ accessToken }) {
  if (ready) {
    return ready;
  }
  bridge = new Bridge({ accessToken });
  return ready = bridge.ready;
}

const BRIDGE_SCRIPT = 'https://app.storyblok.com/f/storyblok-latest.js';
class Bridge {
  constructor({ accessToken }) {

    if (!this.isEditMode())
      return this.ready = Promise.resolve();

    this.accessToken = accessToken;
    this.ready = this.loadScript(BRIDGE_SCRIPT).catch(err => {
      throw err;
    });

  }

  on (events, cb, options) {
    options = options || {};
    options.accessToken = this.accessToken;

    return this.ready().then(storyblok => {
      storyblok.init(options);
      addEvent(storyblok, events, cb);
      return storyblok;
    }).catch(err => {
      throw err;
    });

  }

  loadScript (src) {
    return new Promise(resolve => {
      var script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.onerror = () => {
        throw new Error('Failed to load' + src);
      };
      script.onload = () => {
        resolve(window.storyblok);
      };
      document.getElementsByTagName('head').appendChild(script);
    });
  }

  isEditMode () {
    return window.location == window.parent.location;
  }

}

function addEvent (storyblok, events, cb) {
  storyblok.on(events, event => {
    if (event.action == 'input') {
      event.story.content = storyblok.proxy.addComments(event.story.content, event.story.id);
    }
    cb(event);
  });
  return storyblok;
}
