<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo"><h1 class="logotitle">OCBC</h1></div>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 30px 0">
      </a-breadcrumb>

      <a-button type="primary" class="button-text">
        <span class="button-content">Need Help?  
        <font-awesome-icon class="message-icon" :icon="['fas', 'message']" />
      </span>
      </a-button>

      <div class="chatbox"><Chat :chat="arr" :onSend="handleMessage" /></div>
      <div :style="{ background: 'rgb(180, 180, 180)', padding: '24px', minHeight: '280px' }">Content</div>

    </a-layout-content>
    <a-layout-footer style="text-align: center">
      footer
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { Chat } from "@chat-ui/vue3";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components:{Chat},
  setup(){
    const arr = ref([])

    function handleMessage(message) {
        displayMessages(message)
        console.log(message)
    }

    function displayMessages(message) {
      arr.value.push({ message: message, type: 'person' })
    }

    return{
      handleMessage,
      displayMessages,
      arr
    }
  }

})

</script>

<style scoped>
.site-layout-content {
  min-height: 500px; 
  padding: 24px;
  background: #fff;
}
.ant-layout-header{
  background: rgb(186, 11, 11);
}
.logotitle{
  color: whitesmoke;
  font-size: 25px;
  font-weight: bold;
}


section {
  height: 100vh;
}
button{
  position:absolute;
  right:    0;
  bottom:   0;
  margin: 70px 70px;
  padding: 35px 40px;
  background-color: rgb(55, 63, 63);
  line-height: 0px;
}
.button-content{
  padding-right: 20px;
}
.message-icon{
  position: absolute;
  color: whitesmoke;
  font-size: 25px;
  display: block;
  padding-left: 119px;
  transform: translateY(-35%); /* Center horizontally */
}
 .button-text{
  font-size: 20px;
  font-weight: bold;
  font-family:inherit;
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
</style>
