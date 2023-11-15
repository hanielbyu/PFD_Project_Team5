import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faMessage } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
import VueSmoothScroll from 'vue3-smooth-scroll' 
import { createPinia } from 'pinia';
import { router } from './helpers';
// setup fake backend will migrate to nodejs later
import { fakeBackend } from './helpers';

fakeBackend();

library.add(faMessage)

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueSmoothScroll)
app.use(Antd)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
app.mount('#app');



