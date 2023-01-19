import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/auth/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');