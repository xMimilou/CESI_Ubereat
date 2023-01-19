// create store for account data and know if user is logged in or not with a boolean and try jwt token to get user data
// if user is logged in, we can get user data from store
// if user is not logged in, we can get user data from store but it will be null


import axios from 'axios';
import {createStore} from 'vuex';

const account = createStore({
    namespaced: true,
    state: {
        user: null,
        loggedIn: false,
        role: null,
        token: null
    },
    mutations: {
        setLoggedIn(state, value: string) {
            state.loggedIn = value;
        },
        setToken(state, value: string) {
            state.token = value;
        },
        setUser(state, value: string) {
            state.user = value;
        },
        setRole(state, value: string) {
            state.role = value;
        }

    },
    actions: {
        async login({ commit }, { username, password }) {
            const { data } = await axios.post('http://localhost/auth/login', { username, password });
            commit('setLoggedIn', true);
            commit('setUser', data.username);
            commit('setRole', data.role);
            commit('saveToken',data.token);
        },
        async logout({ commit }) {
            commit('setLoggedIn', false);
            commit('setUser', null);
            commit('setRole', null);
            commit('setToken', null);
            localStorage.removeItem('token');
        },
        async connectFromGetUser({ commit }, {username, jwt, role}) {
            // if jwt is valid and user is found, we can connect user
            // axios request get tokenCheckup with header auth-token token if status is 200 => user is connected
            // if 401 => user is not connected
            const { data } = await axios.get('http://localhost/auth/tokenCheckup', { headers: { 'auth-token' : jwt } });
            if (data.status === 200) {
                commit('setLoggedIn', true);
                commit('saveToken',data.token);
                commit('setUser', username);
                commit('setRole', role);

            }
        },
        saveToken({ commit }, token) {
            commit('setToken', token);
            localStorage.setItem('token', token);
        }
    }    
});

export default account;