<template>
  <a-layout class="layout">
    <a-layout-header v-if="authStore.user">
      <a-menu
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '63px', background: 'rgb(255, 255, 255)'}">
        <div class="menu-items">
          <a-menu-item class="menu-title" key="home">
              <RouterLink to="/" class="nav-item nav-link"><img class="ocbclogo" src="src/assets/OCBC without text.png" /></RouterLink>
          </a-menu-item>
          <a-menu-item class="menu-title" key="faq">
              <RouterLink to="/FAQ" class="nav-item nav-link">FAQ</RouterLink>
          </a-menu-item>
          <a-menu-item v-if="authStore.$state.user.role === 'tech'" class="menu-title" key="support">
              <RouterLink to="/support" class="nav-item nav-link">SUPPORT</RouterLink>
          </a-menu-item>
          <a-menu-item v-if="authStore.$state.user.role === 'tech'" class="menu-title" key="tech">
              <RouterLink to="/tech" class="nav-item nav-link">TECH</RouterLink>
          </a-menu-item>
          <a-menu-item class="menu-title" key="appt">
              <RouterLink to="/schedule-appointment" class="nav-item nav-link">Schedule Appointment</RouterLink>
          </a-menu-item>
          <a-menu-item class="logoutBtn">
              <a @click="authStore.logout()" class="nav-item nav-link">Logout</a>
          </a-menu-item>
        </div>
      </a-menu>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px" >
      <a-breadcrumb style="margin: 30px 0"/>
      <!-- <button @click="checkRole"></button> -->
      <RouterView />
    </a-layout-content>

    <a-layout-footer>
      <ChatBot v-if="authStore.$state.user"/>
    </a-layout-footer>    
  </a-layout>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores';
import ChatBot from './components/ChatBot.vue'

const authStore = useAuthStore();
const authUser = authStore.$state.user;
// const checkRole = () => {
//   console.log(authStore.$state.user.role)
// }
</script>

<style scoped>

/* layout css */
.site-layout-content {
  min-height: 500px; 
  padding: 24px;
  background: #fff;
}

.ant-layout-header{
  background: rgb(255, 255, 255);
}

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}

.layout {
  min-height: 110vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.7)), url("https://www.efinancialcareers.sg/binaries/content/gallery/efinancial-careers/articles/2020/11/ocbc2.jpg");;
  background-size: cover; 
  background-position: center;
}

.logotitle{
  color: whitesmoke;
  font-size: 25px;
  font-weight: bold;
}

/* menu css */
.ant-menu-overflow-item {
  background-color: #000000;
}

.menu-items {
  display: flex;
  justify-content: space-between;
  color: rgb(242, 8, 8);
  margin: 0 15px;
  font-size: 15px;
  font-weight: bold;
  font-family: 'Your Font Here', sans-serif;
}

.menu-title{
  color: rgb(242, 8, 8);
  margin: 0 15px;
  font-size: 15px;
  font-weight: bold;
  font-family: 'Your Font Here', sans-serif;
}

.need-button{
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  background-color: rgb(55, 63, 63);
  border: 2px solid #7fa275;
  border-radius: 10px;
  color: whitesmoke;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  height:80px;
  width:150px;
}

.need-button:hover {
  background-color: rgb(116, 164, 159) 
}

.ocbclogo {
width: 50px;
padding: 10px;
}
</style>