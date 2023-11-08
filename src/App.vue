<template>
  <a-layout class="layout">
    <nav class="navbar navbar-expand-lg navbar-custom p-4">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">OCBC</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Account</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Get Help</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 30px 0">
      </a-breadcrumb>

      <a-popover v-model:open="visible" title="Support" trigger="click">
        <template #content>
          <a-card style="width: 250px; height: 300px; background-color: azure; overflow-y:auto;">
            <div v-for ="message in arr" :key="message">
              <h3 :class="message.type">{{`${message.message}`}}</h3>
              <div v-for ="content in message.buttons" :key="content">
                <a-button @click=handleMessage(content) class="btn_bot" type="primary" shape="round" :size="size">
                  <h3 :class="content.message">{{`${content.message}`}}</h3>
                </a-button>
                <br/>
              </div>
              

            </div>
            <a-button :class="liveChat" type="link" @click="liveChatSupport()">Proceed to Live Support</a-button>

            <div :class="liveChatCard">
              <a-divider style="height: 2px; background-color: #7cb305" />
              <h1> LIVE CHAT SUPPORT</h1>
            </div>
          </a-card>
          <div>

            <a-input-group compact :class="liveChatCard">
              <a-input v-model:value="value19" style="width: calc(100% - 200px)" @pressEnter="handleMessage(value19)"/>
              <a-button type="primary" @click="handleMessage(value19)">Submit</a-button>
            </a-input-group>

          </div>
          <a @click="hide">Close</a>
        </template>
        <a-button class="need-button" type="primary">Need Help?
          <font-awesome-icon class="message-icon" :icon="['fas', 'message']" />
        </a-button>
      </a-popover>

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
// import { message } from "ant-design-vue";
import { defineComponent, ref } from "vue";


export default defineComponent({
  components:{Chat},
  setup(){
    // const socket = io();
    
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
    // const btnContent = ref([
    //     {
    //       message: "Credit Card Stolen"
    //     },
    //     {
    //       message: "Suspicious Transaction"
    //     },
    //     {
    //       message: "Register for Card"
    //     },
    //     {
    //       message: "Credit Limit Enquiry"
    //     } 
    //   ])

    const value19 = ref('');

    const visible = ref(false);
    const liveChat = ref('hide');
    const liveChatCard = ref('hideLive')

    const hide = () => {
      visible.value = false;
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
      arr.value.push({ message: message.message, type: 'customer' }) 
      value19.value = ''

    }





    // [
    //   {
    //     message: "",
    //     type: "",
          // buttons: [
          //   {
          //     message: ""
          //   },
          //   {

          //   }
          // ]

    //   },
    //   {
    //     message: "",
    //     type: "",

    //   }
    // ]

    return{
      handleMessage,
      displayMessages,
      arr,
      hide,
      value19,
      liveChat,
      liveChatCard,
      liveChatSupport,
      handleMessageLive
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
}
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
}

.hide {
  display: none;
}

.hideLive {
  display: none;
}
</style>
