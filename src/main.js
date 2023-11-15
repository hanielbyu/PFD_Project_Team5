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
import router from './router';


library.add(faMessage)

// const { io } = require("socket.io-client");

const app = createApp(App);

app.use(VueSmoothScroll)
app.use(Antd)

.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app');



