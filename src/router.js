import { createRouter, createWebHistory } from 'vue-router';  
import LoginView from './components/LoginView1.vue'; 
import TechView from './components/TechView.vue';  
import FAQ from './components/FAQ.vue';
import ScheduleAppointment from './components/ScheduleAppointment.vue';
import SupportLine from './components/SupportLine.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/faq', name: 'FAQ', component: FAQ },
  { path: '/tech', name: 'Tech', component: TechView },
  { path: '/ScheduleAppointment', name: 'Appointment', component: ScheduleAppointment },
  { path: '/SupportLine', name: 'Support', component: SupportLine },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;