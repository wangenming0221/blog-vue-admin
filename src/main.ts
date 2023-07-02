import { createApp, Directive } from 'vue'
import * as directive from "@/directive"
import '@/assets/scss/style.scss'
import App from './App.vue'
import router from '@/routers/index'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
Object.keys(directive).forEach((key) => {
    app.directive(key, (directive as { [key: string]: Directive })[key]);
});
app.use(router);
app.use(pinia);
app.use(Antd);
app.mount('#app');
