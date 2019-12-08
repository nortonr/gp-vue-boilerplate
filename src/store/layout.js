
export const state = () => ({
  preventScrolling: false,
  toggleDirection: false,
  data: {}
});

export const mutations = {
  data (state, value) {
    state.data = value;
  },
  preventScrolling (state, value) {
    state.preventScrolling = Boolean(value);
  },
  toggleDirection (state, value) {
    state.toggleDirection = Boolean(value);
  }
};

export const getters = {
  data (state) {
    return state.data;
  },
  preventScrolling (state) {
    return state.preventScrolling;
  },
  toggleDirection (state) {
    return state.toggleDirection;
  }
};

export const actions = {
  setData (context, value) {
    context.commit('data', value);
  },
  toggleDirection (context, value) {
    context.commit('toggleDirection', value);
  },
  togglePreventScrolling (context, preventScrolling) {
    let toggle = !context.getters.preventScrolling;
    if (preventScrolling !== undefined) {
      toggle = preventScrolling;
    }
    context.commit('preventScrolling', toggle);
  }
};
