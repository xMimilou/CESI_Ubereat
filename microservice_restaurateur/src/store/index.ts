import { createStore } from 'vuex';
import {Product, Article, Order} from '@/utils/interfaces';

import { 
  getArticles, getOrders, getMenus,
  postArticle, postMenu,
  deleteOrder, deleteMenu, 
  validateOrder, refuseOrder 
} from '@/utils/helpers';

import { deleteArticle as deleteProduct } from '@/utils/helpers';
import { updateArticle as updateProduct } from '@/utils/helpers';



interface State {
  products: Product[];
  orders: Order[];
  menus: Product[]
}

const state: State = {
  products: [],
  orders: [],
  menus: []
};

const mutations = {
  /* ------------------ Articles ------------- */
  setProducts(state: State, products: Product[]) {
    state.products = products;
  },
  addProduct(state: State, product: Product) {
    state.products.push(product);
  },
  deleteProduct(state: State, id: string) {
    state.products = state.products.filter((product) => product._id !== id);
  },
  updateProduct(state: State, product: Product) {
    const index = state.products.findIndex((p) => p._id === product._id);
    if (index !== -1) {
      state.products.splice(index, 1, product);
    }
  },

  /* ------------------ Menus --------------- */
  setMenus(state: State, menus: Product[]) {
    state.menus = menus;
  },

  addMenu(state: State, menu: Product) {
    state.products.push(menu);
  },

  deleteMenu(state: State, id: string) {
    state.menus = state.menus.filter((product) => product._id !== id);
  },

  /* ------------------ Orders --------------- */
  setOrders(state: State, orders: Order[]) {
    state.orders = orders;
  },
  deleteOrder(state: State, id: string) {
    state.orders = state.orders.filter((order) => order._id !== id);
  },
  updateOrder(state: State, order: Order) {
    const index = state.orders.findIndex((p) => p._id === order._id);
    if (index !== -1) {
      state.orders.splice(index, 1, order);
    }
  },
};

const actions = {
  /* ------------------ Articles -------------- */
  async fetchProducts({ commit }: any) {
    const articles = await getArticles();
    commit('setProducts', articles);
    console.log(articles);
  },

  async createProduct({ commit }: any, product: Article) {
    console.log(product.price);
    const response = await postArticle(product);
    console.log(response);
    commit('addProduct', response);
  },

  async deleteProduct({ commit }: any, id: any) {
    await deleteProduct(id);
    commit('deleteProduct', id);
  },

  async updateProduct({ commit }: any, product: Article) {
    const response = await updateProduct(product);
    // commit('updateProduct', response.data);
    console.log(response);
  },

  /* ------------------ Menus -------------- */
  async fetchMenus({ commit }: any) {
    const menus = await getMenus();
    commit('setMenus', menus);
    console.log(menus);
  },

  async createMenu({ commit }: any, menu: any) {
    console.log(`From createMenu action: ${menu.name}`);
    const response = await postMenu(menu);
    console.log(response);
    // commit('addMenu', response);
  },

  async deleteMenu({ commit }: any, id: any) {
    await deleteMenu(id);
    commit('deleteMenu', id);
  },

  /* ------------------ Orders -------------- */
  async fetchOrders({ commit }: any) {
    const orders = await getOrders();
    console.log('Hello depuis action fetchOrder')
    commit('setOrders', orders);
    console.log(orders);
  },

  async deleteOrder({ commit }: any, id: any) {
    await deleteOrder(id);
    commit('deleteOrder', id);
  },

  async validateOrder({ commit }: any, id: any) {
    const response = await validateOrder(id);
    commit('updateOrder', response.data);
  },

  async refuseOrder({ commit }: any, id: any) {
    const response = await refuseOrder(id);
    commit('updateOrder', response.data);
  },
};

const store = createStore({
  state,
  mutations,
  actions,
});

export default store;

