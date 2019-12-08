export const actions = {
  nuxtServerInit: async function ({ dispatch }, { $getVirtualContentLayout }) {
    dispatch('layout/setData', await $getVirtualContentLayout());
  }
};
