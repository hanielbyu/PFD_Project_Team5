import { createRouter, createWebHistory } from 'vue-router';  
import HomePage from './components/HomePage.vue';
import LoginView from './components/LoginView1.vue'; 
import TechView from './components/TechView.vue';  
import FAQ from './components/FAQ.vue';
import ScheduleAppointment from './components/ScheduleAppointment.vue';
import LiveChatSupport from './components/LiveChatSupport.vue';
import SupportLine from './components/SupportLine.vue';
import ContactUs from './components/ContactUs.vue';

const routes = [
  {  
    name:"HomePage", 
    component: HomePage,
    path: "/HomePage" 
  },
  {  
    name:"LoginView", 
    component: LoginView, 
    path: "/login",
  },
  { 
    name: "TechView", 
    component: TechView, 
    path: "/tech",
  },
  { 
    name: "ScheduleAppointment", 
    component: ScheduleAppointment, 
    path: "/schedule", 
  },
  {
    name: "LiveChatSupport", 
    component: LiveChatSupport, 
    path: "/livechat", 
  },
  {
    name: "ContactUs", 
    component: ContactUs, 
    path: "/contact", 
  },
  {
    name: "SupportLine", 
    component: SupportLine, 
    path: "/support", 
  },
  {
    name: "FAQ", 
    component: FAQ, 
    path: "/faq", 
  },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
