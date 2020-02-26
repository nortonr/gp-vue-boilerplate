const content = {
  keyA: 'value a',
  'content-default': {
    a: 1,
    b: 2
  },
  'content-special': {
    a: 88,
    b: 99
  }
};

const shortcut = new Map(Object.entries({
  keyA: 'a'
}));

class Entry {
  constructor (k, v) {
    this.key = k;
    this.value = v.get(k);
  }

  get (key) {
    return new Entry(key, new Map(Object.entries(this.value)));
  }

  getShortcut () {
    return shortcut.get(this.key);
  }

  valueOf () {
    return this.value;
  }

  toString () {
    return this.value;
  }
}

export default {
  get (key) {
    return new Entry(key, new Map(Object.entries(content)));
  }
};
