import { createRouter, createWebHistory } from 'vue-router';  

import LoginView from './components/LoginView1.vue'; 
import TechView from './components/TechView.vue';  
import FAQ from './components/FAQ.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/tech', name: 'Tech', component: TechView },
  { path: '/faq', name: 'FAQ', component: FAQ },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;