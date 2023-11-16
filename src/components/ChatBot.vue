<template>
  <a-popover v-model:open="visible" title="Customer Enquiry" trigger="click">
    <template #content>
      <a-card style="width: 400px; height: 500px; max-height: 500px; background-color: azure; overflow-y:auto;">
        <div v-for ="message in arr" :key="message">
          <a-card :class="message.type">
            <h3 :class="message.type">{{`${message.message}`}}</h3>
          </a-card>
          <a-card class="button-message-card">
            <div v-for ="content in message.buttons" :key="content">
              <a-button @click=handleMessage(content) class="btn_bot" type="primary" shape="round" :size="size">
                <h3 :class="content.message">{{`${content.message}`}}</h3>
              </a-button>
              <br/>
            </div>
          </a-card>
        </div>
        
        <a-button :class="liveChat" type="link" 
          @click="liveChatSupport()"  href="#sec-3" v-smooth-scroll >Proceed to Live Support</a-button>
        <a-button :class="faqPage" type="link" >
          <RouterLink to="/FAQ" class="nav-item nav-link">View FAQ Page</RouterLink></a-button>
        <section :class="liveChatCard" id="sec-3">
          <div :class="liveChatCard">
          <a-divider style="height: 5px; background-color: #7cb305" />
          <h1 class="livechattitle"> LIVE CHAT SUPPORT</h1>
          <a-divider style="height: 5px; background-color: #7cb305" />
          <LiveChatSupport/>
          </div>
        </section>
      </a-card>
      <a @click="hide">Close</a>
    </template>
    <a-button class="need-button" type="primary">Need Help?</a-button>
  </a-popover>
</template>

<script>
import { defineComponent, ref} from 'vue';
import LiveChatSupport from "./LiveChatSupport.vue";
export default defineComponent({
  components:{
    LiveChatSupport
},
  setup(){
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
    const role = ref('tech');
    const visible = ref(false);
    const faqPage = ref('hide');
    const liveChat = ref('hide');
    const liveChatCard = ref('hideLive')

    const hide = () => {
      visible.value = false;
      console.log('check', visible)
    };

    const proceedLiveChat = (state) => {
      liveChat.value = state;
    };

    const proceedFAQ = (state) => {
      faqPage.value = state;
    }

    function handleMessage(message) {
        displayMessages(message)
    }
    function handleMessageLive(message){
        postMessage(message)
    }

    const liveChatSupport = () => {
      liveChatCard.value = 'showLive'
    }
    
    function displayMessages(message) {
      arr.value.push({ message: message.message, type: 'customer' }) 
      var delayInMilliseconds = 1500; //1 second
      setTimeout(function() {
        arr.value.push({ message: message.answer, type: 'chatbot' })
        if (message.urgency == 1){
          proceedFAQ('show')
        }
        else{
          proceedLiveChat('show')
          proceedFAQ('show')
        }    
      }, delayInMilliseconds);
    }

    function postMessage(message){
      arr.value.push({ message: message, type: 'customer' }) 
      textInput.value = ''
    }

    return{
      handleMessage,
      role,
      displayMessages,
      arr,
      hide,
      textInput,
      liveChat,
      liveChatCard,
      liveChatSupport,
      faqPage,
      handleMessageLive,
      // btnContent
    }
  }

})
</script>

<style scoped>


/* Modify the background color */


.button-message-card{
  max-width: 250px;
  background-color:  rgb(255, 255, 255);
}

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
  background-color: rgb(179, 34, 34);
  box-shadow: 5px 5px 7px 0px #0000003f;
  transition: all 0.5s;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  border: solid 3px black;
  color: whitesmoke;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  height:80px;
  width:150px;
  z-index: 1;
}
.need-button::before{
  content: "";
    position: absolute;
    background-color: rgb(214, 53, 53);
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0px;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
    transition: all 0.8s;
}

.need-button:hover::before{
  transform: scaleX(1);
}
.need-button:hover {
  background-color: rgb(255, 255, 255);
  border: solid 3px rgb(255, 255, 255);
  color: black;

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
  margin-top: 15px;
  margin-bottom: 15px;
  float: right;
  max-width: 250px;
  background: rgb(255, 241, 228);
  text-align: right;
}

.chatbot { 
  clear: both;
  max-width: 250px;
  background-color: rgb(255, 255, 255);
  text-align: left;
  margin-bottom: 10px;
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
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.7)), url("https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iv2VYtHhrIF4/v0/1200x800.jpg");;
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