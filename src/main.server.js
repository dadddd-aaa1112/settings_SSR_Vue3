import App from './App.vue'
import { createSSRApp } from 'vue'
import './assets/tailwind.css'
import createApplicationRouter from '@/router'

const router = createApplicationRouter()

const app = createSSRApp(App)

app.use(router).mount('#app')

export default App
