import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "@trimbleinc/modus-bootstrap/dist/modus.css"
import "@trimble-oss/modus-icons/dist/modus-solid/fonts/modus-icons.css"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) 
app.use(router)


app.mount('#app')
