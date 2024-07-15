import { createApp } from 'vue'
import App from './App.vue'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import routes from '@/routes'
import '@/styles/global.css'
const app = createApp(App)
app.use(routes)
app.mount('#app')
