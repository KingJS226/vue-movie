import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchString: '',
    searchResult: {},
    currentPage: 1
  },
  mutations: {
    updateSearchString(state, value) {
      state.searchString = value;
    },
    updateSearchResult(state, result) {
      state.searchResult = result;
    },
    updateCurrentPage(state, page) {
      state.currentPage = page;
    }
  },
  actions: {
    updateSearch(store, payload) {
      store.commit("updateSearchString", payload.searchString);
      store.commit("updateSearchResult", payload.searchResult);
      store.commit("updateCurrentPage", payload.page);
    }
  }
})
