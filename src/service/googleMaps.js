import loadScript from 'load-script';
import { timer, fromEventPattern, ReplaySubject } from 'rxjs';
import { debounce, map } from 'rxjs/operators';

const CALLBACK_VAR = 'googleMapInitCallback';
const URL_GOOGLE_MAP_API = '//maps.googleapis.com/maps/api/js?v=3.39&libraries=geometry';
let api = null;

class GoogleMaps {
  constructor () {
    this.map = null;
    this.change = new ReplaySubject(1);
  }

  setup (el, config) {
    return load()
      .then((google) => {
        this.map = new google.maps.Map(el, config);
        fromEvent(this.map, 'bounds_changed')
          .pipe(
            debounce(() => timer(350)),
            map(() => [
              this.map.getBounds(),
              this.map.getZoom()
            ])
          ).subscribe(val => this.change.next(val));
        return this;
      });
  }

  destroy () {
    console.log('destroy something');
  }
}

function fromEvent (node, event) {
  return fromEventPattern(
    function (handler) {
      node.addListener(event, handler);
    },
    function (handler, listener) {
      global.google.maps.event.removeListener(listener);
    }
  );
}

export default new GoogleMaps();

function load () {
  const key = '';
  const url = `${URL_GOOGLE_MAP_API}&key=${key}&callback=${CALLBACK_VAR}`;
  if (!api) {
    api = loadAPI(url);
  }
  return api;
}

function loadAPI (url) {
  return new Promise((resolve) => {
    global[String(CALLBACK_VAR)] = resolve;
    loadScript(url, function (err, script) {
      if (err) {
        throw err;
      }
    });
  })
    .then(() => global.google);
}
