import { createStore } from 'vuex'

interface Item {
  name: string;
  price: number;
  quantity: number;
  articles: [];
}

export default createStore({
  state: {
    user: null,
    restaurant: null,
    panier: [] as Item[]
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    restaurant: (state) => {
      return state.restaurant;
    },
    panier: (state) => {
      return state.panier;
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    restaurant(state, restaurant) {
      state.restaurant = restaurant;
    },
    panier(state, panier) {
      const index = state.panier.findIndex(item => item.name === panier.name);
      if (index !== -1) {
        state.panier[index].quantity++;
      } else {
        state.panier.push({
          ...panier,
          quantity: 1
        });
      }
    },

    removeFromPanier(state, panier) {
      const index = state.panier.findIndex(item => item.name === panier.name);
      if (index !== -1) {
        state.panier.splice(index, 1);
      }
    },
    clearPanier(state) {
      state.panier = [];
    },
  },
  actions: {
    user(context, user) {
      context.commit('user', user);
    },
    restaurant(context, restaurant) {
      context.commit('restaurant', restaurant);
    },
    panier(context, panier) {
      context.commit('panier', panier);
    },
    clearPanier(context) {
      context.commit("clearPanier");
    },
  },
  modules: {
  }
})
