import { createApp } from 'vue'
import { createPinia } from 'pinia'
import store from './stores/index'
import App from './App.vue'
import router from './router'

// import accounts store

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'

const vuetify = createVuetify({
    components,
    directives,
  })
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)

app.use(vuetify).mount('#app')
