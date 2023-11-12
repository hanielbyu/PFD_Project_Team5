import { createRouter, createWebHistory } from 'vue-router';  
import LoginView from './components/LoginView.vue'; 
import TechView from './components/TechView.vue';  

const routes = [
  { path: '/', components: LoginView },
  { path: '/tech', name: 'Tech', components: TechView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;