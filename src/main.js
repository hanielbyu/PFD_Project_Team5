import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSmoothScroll from 'vue3-smooth-scroll' 
import { createPinia } from 'pinia';
import { router } from './helpers';
// setup fake backend will migrate to nodejs later
import { fakeBackend } from './helpers';
import {faMicrophone, faPhone } from '@fortawesome/free-solid-svg-icons'


fakeBackend();

library.add(faMicrophone)
library.add(faPhone)

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueSmoothScroll)
app.use(Antd)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
app.mount('#app');



