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
              <RouterLink to="/schedule-appointment" class="nav-item nav-link">APPOINTMENT</RouterLink>
          </a-menu-item>
          <a-menu-item class="menu-title" key="inst">
              <RouterLink to="/instruct" class="nav-item nav-link">INSTRUCTIONS</RouterLink>
          </a-menu-item>
          <a-menu-item class="menu-title" key="video">
              <RouterLink to="/video" class="nav-item nav-link">VIDEOCHAT</RouterLink>
          </a-menu-item>
          <a-menu-item class="logoutBtn">
              <a @click="authStore.logout()" class="nav-item nav-link">LOGOUT</a>
          </a-menu-item>
        </div>
      </a-menu>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px" >
      <a-breadcrumb style="margin: 30px 0"/>
      <RouterView />
    </a-layout-content>

    <a-layout-footer>
      <ChatBot v-if="authStore.$state.user && authStore.$state.user.role ==='user'"/>
    </a-layout-footer>    
  </a-layout>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores';
import ChatBot from './components/ChatBot.vue'

const authStore = useAuthStore();
</script>

<style scoped>


/* layout css */
.site-layout-content {
  min-height: 500px; 
  padding: 24px;

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
  background-color: white;
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
  color: rgb(255, 0, 0);
  margin: 0 15px;
  font-size: 18.5px;
  font-weight: 650;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.menu-title{
  color: rgb(242, 8, 8);
  margin: 0 15px;
  font-size: 15px;
  font-weight: bold;
  font-family: 'Your Font Here', sans-serif;
}

.need-button{
  background-color: var(--bgOrange);
  width: fit-content;
  color: white;
  padding: 0.8rem 2.3rem;
  box-shadow: 5px 5px 7px 0px #0000003f;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.5s;
  font-weight: 500;
  border: solid 3px transparent;
  position: relative;
  z-index: 1;
  transform: scaleX(1);
}
.need-button::before {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0px;
    transform: scaleX(-1);
    transform-origin: left;
    transition: all 0.8s;
}
.need-button:hover { 
    color: white !important;

}
.ocbclogo {
width: 50px;
padding: 10px;
}
</style>