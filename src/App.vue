<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys"
          :style="{ lineHeight: '64px', background: 'rgb(255, 255, 255)'}">
          <div class="menu-items">
            <a-menu-item class="menu-title" key="home">OCBC</a-menu-item>
            <a-menu-item key="faq">FAQ</a-menu-item>
            <a-menu-item key="contact">CONTACT US</a-menu-item>
            <!-- <a-menu-item key="livechatsupport">LiveChatSupport</a-menu-item> -->
            <a-menu-item key="scheduleapppointment">Schedule Appointmennt</a-menu-item>
          </div>
      </a-menu>
    </a-layout-header>
  


    <a-layout-content style="padding: 0 50px">

      <a-breadcrumb style="margin: 30px 0">
      </a-breadcrumb>

      

      
      <div :style="{ minHeight: '280px', 'margin-top': '10px', 'bottom': '0px', 'height': 'calc(100% - 64px)'}">
        <!-- <Home :type=selectedKeys v-if="selectedKeys == 'home' || selectedKeys == 'products'"/> -->
        <Contact v-if="selectedKeys == 'contact'"/>
        <FAQ v-if="selectedKeys == 'faq'"/>
        <HomePage v-if="selectedKeys == 'home'"/>
        <!-- <LiveChatSupport v-if="selectedKeys == 'livechatsupport'"/> -->
        <ScheduleAppointment v-if="selectedKeys == 'scheduleappointment'"/>
      </div>

      

    </a-layout-content>

  <a-layout-footer>
    <a-popover v-model:open="visible" title="Support" trigger="click">
        <template #content>
          <a-card style="width: 400px; height: 400px; max-height: 400px; background-color: azure; overflow-y:auto;">
            <div v-for ="message in arr" :key="message">
              <h3 :class="message.type">{{`${message.message}`}}</h3>
              <div v-for ="content in message.buttons" :key="content">
                <a-button @click=handleMessage(content) class="btn_bot" type="primary" shape="round" :size="size">
                  <h3 :class="content.message">{{`${content.message}`}}</h3>
                </a-button>
                <br/>
              </div>
            </div>

          
            
            <a-button :class="liveChat" type="link" 
            @click="liveChatSupport()"  href="#sec-3" v-smooth-scroll >Proceed to Live Support</a-button>
            <section :class="liveChatCard" id="sec-3">
              <div :class="liveChatCard">
              <a-divider style="height: 5px; background-color: #7cb305" />
              <h1 class="livechattitle"> LIVE CHAT SUPPORT</h1>
              <a-divider style="height: 5px; background-color: #7cb305" />
              <LiveChatSupport/>
              </div>
            </section>
          </a-card>
          <!-- <a-input-group compact :class="liveChatCard">
          </a-input-group> -->
          <a @click="hide">Close</a>
        </template>
        <a-button class="need-button" type="primary">Need Help?
          <font-awesome-icon class="message-icon" :icon="['fas', 'message']" />
        </a-button>
      </a-popover>
      </a-layout-footer>
  </a-layout>
</template>


<script>
// import { message } from "ant-design-vue";
import { defineComponent, ref} from 'vue';
import Contact from './components/ContactUs.vue';
import FAQ from './components/FAQ.vue';
import HomePage from "./components/HomePage.vue";
import LiveChatSupport from "./components/LiveChatSupport.vue";
import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import {onMounted, nextTick, defineExpose } from 'vue';
import ScheduleAppointment from './components/ScheduleAppointment.vue';

export default defineComponent({
  components:{
    Contact,
    FAQ,
    HomePage,
    LiveChatSupport,
    ScheduleAppointment,
},
  setup(){
    // const socket = io();

    let selectedKeys = ref(['home']);

    
    const arr = ref([
    {
      message: "Hi, how may I assist you?",
      type: "chatbot",
      buttons: [
        {
          message: "Credit Card Stolen",
          urgency: 3,
          answer: "We understand the level of urgency on this matter, We will redirect you to our Customer Service Staff"
        },
        {
          message: "Suspicious Transaction",
          urgency: 3,
          answer: "We understand the level of urgency on this matter, We will redirect you to our Customer Service Staff"
        },
        {
          message: "Register for Card",
          urgency: 1,
          answer: "Our FAQ page will have knowledge on this, Click here to view our FAQ page"
        },
        {
          message: "Credit Limit Enquiry",
          urgency: 2,
          answer: "We will redirect you to our Customer Service Staff\
          However, feel free to contact us via Email or call this hotline"
        } 
      ]
    }
    ])

    const textInput = ref('');

    const visible = ref(false);
    const liveChat = ref('hide');
    const liveChatCard = ref('hideLive')

    const hide = () => {
      visible.value = false;
      console.log('check', visible)
    };

    const proceedLiveChat = (state) => {
      liveChat.value = state;
    };

    function handleMessage(message) {
        displayMessages(message)
    }
    function handleMessageLive(message){
        postMessage(message)
    }

    const liveChatSupport = () => {
      liveChatCard.value = 'showLive'
      selectedKeys = 'faq'
    }

    function displayMessages(message) {
      arr.value.push({ message: message.message, type: 'customer' }) 
      var delayInMilliseconds = 1500; //1 second
      setTimeout(function() {
        arr.value.push({ message: message.answer, type: 'chatbot' })
        proceedLiveChat('show')
      }, delayInMilliseconds);
    }

    function postMessage(message){
      arr.value.push({ message: message, type: 'customer' }) 
      textInput.value = ''
    }


    const APP_ID = '452f99a0814b44d29d9a446ec20356fc';
const CHANNEL = 'wdj';
let client = AgoraRTM.createInstance(APP_ID);
let uid = uuidv4();
let text = ref('');
let messagesRef = ref(null);
let messages = ref([]);
let channel;

defineExpose({ messagesRef });

const appendMessage = async (message) => {
  messages.value.push(message);
  await nextTick();
  if(messagesRef.value) messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
};

    onMounted(async () => {
      await client.login({ uid, token: null });
      channel = await client.createChannel(CHANNEL);
      await channel.join();
      channel.on('ChannelMessage', (message, peerId) => {
        appendMessage({
          text: message.text,
          uid: peerId,
        });
      });
    });

    function sendMessage() {
      if (text.value === '') return;
      channel.sendMessage({ text: text.value, type: 'text' });
      appendMessage({
        text: text.value,
        uid,
      });
      text.value = '';
    }

    return{
      handleMessage,
      selectedKeys,
      displayMessages,
      arr,
      hide,
      textInput,
      liveChat,
      liveChatCard,
      liveChatSupport,
      handleMessageLive,
      sendMessage
      // btnContent
    }
  }

})

</script>

<style scoped>


/* Modify the background color */
.navbar-custom {
    background-color: red;
}
.btn_bot{
  width: 200px;
  margin-bottom: 5px;
  margin-top: 5px;
  z-index: 10;
}

.site-layout-content {
  min-height: 500px; 
  padding: 24px;
  background: #fff;
}
.ant-layout-header{
  background: rgb(255, 255, 255);
}
.logotitle{
  color: whitesmoke;
  font-size: 25px;
  font-weight: bold;
}
 .liveChatCard {
  width: 200px;
}

.ant-input-group{
  text-align: right;
  width: 100%;
}

.ant-menu-overflow-item {
  background-color: #000000;
}

.ant-input{
  width: 500px;
  text-align: left;
}

section {
  height: 100vh;
}
.need-button{
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
  padding-left: 80px;
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

.customer {
  text-align: right;
}

.chatbot { 
  text-align: left;
  max-width: 70%;
}

.hide {
  display: none;
}

.hideLive {
  display: none;
}

.live-chat-card {
  width: 200px;
}

.livechattitle{
  text-align: center;
}
.live-chat-card a-divider {
  margin-top: 2px;
  height: 2px;
  background-color: #7cb305;
}

.layout {
  min-height: 110vh;
  background: linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url("https://www.ocbc.com/iwov-resources/sg/ocbc/gbc/img/gateway-page/kv_driving-growth.jpg");;
  background-size: cover; 
  background-position: center;
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

.header{
  color: rgb(242, 8, 8);
  margin: 0 15px;
  font-size: 155px;
  font-weight: bold;
  font-family: 'Your Font Here', sans-serif;
}
</style>
