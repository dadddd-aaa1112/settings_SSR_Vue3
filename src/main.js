import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import createApplicationRouter from '@/router'

const app = createApp(App)
const router = createApplicationRouter()

app.use(router).mount('#app')
