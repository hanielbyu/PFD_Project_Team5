<!-- <template>
  <a-popover v-model:open="visible" title="Customer Enquiry" trigger="click">
    <template #content>
      <a-card style="width: 400px; height: 500px; max-height: 500px; background-color: azure; overflow-y:auto;">
        <div v-for ="message in arr" :key="message">
          <a-card :class="message.type">
            <h3 :class="message.type">{{`${message.message}`}}</h3>
          </a-card>
          <a-card class="button-message-card">
            <div v-for ="content in message.buttons" :key="content">
              <a-button @click=handleMessage(content) :disabled='isDisabled' class="btn_bot" type="primary" shape="round" :size="size">
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
</template> -->

<template>
  <a-popover v-model:open="visible" title="Customer Enquiry" trigger="click">
    <template #content>
      <a-card class="card-container" style="display: flex; flex-direction: column; justify-content: flex-end; flex-wrap: wrap; width: 400px; height: 500px; max-height: 500px; background-color: rgb(243, 238, 238); overflow-y:auto;">
        <!-- Loop through each message and use the 'type' to determine the styling -->


        <div v-for="(message, index) in arr" :key="index" :class="message.type === 'user' ? 'chat-message' : message.type">
          <p>{{ message.message }}</p>
        </div>
      

                  <!-- User input area -->
        <div class="user-input" style="min-width: 320px;">
          <input
            v-model="textInput"
            type="text"
            placeholder="Type your enquiry here..."
            @keyup.enter="processInput"
            class="input-box"
          />
          <button @click="processInput" class="send-button">Send</button>
        </div>

        <a-button type="link" :class="liveChat"
          @click="liveChatSupport()"  href="#sec-3" v-smooth-scroll>Proceed to Live Support</a-button>
        
        <!-- Button for FAQ Page, only visible if a message has been sent -->
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
  
    const textInput = ref(''); // This ref holds the user's input
    const arr = ref([]); // This ref holds the array of chat messages
    const showLiveChatButton = ref(false); // Flag to control the display of the live chat 
    const messageSent = ref(false); // Flag to track if a message has been sent
    const liveChatCard = ref('hideLive'); // Flag to control the display of the live chat card

    const role = ref('tech');
    const visible = ref(false);
    const faqPage = ref('hide');
    const liveChat = ref('hide');
    const isDisabled = ref(false);


    const processInput = () => {
      const input = textInput.value.trim().toLowerCase(); // Trim and convert to lowercase
      console.log("Input received:", input); // Log the trimmed input for debugging

     // Define the responses based on key phrases and urgency levels
     const responses = {
        'credit card stolen': { message: 'We understand the level of urgency on this matter. We will redirect you to our Customer Service Staff', urgency: 3 },
        'suspicious transaction': { message: 'We understand the level of urgency on this matter. We will redirect you to our Customer Service Staff', urgency: 3 },
        'register for card': { message: 'Our FAQ page will have knowledge on this. Click here to view our FAQ page', urgency: 1 },
        'credit limit enquiry': { message: 'Please view our FAQ page for information on credit limits or contact customer service for further assistance.', urgency: 1 },
        'reset my password': { message: 'Our FAQ page will have knowledge on this. Click the link below to view our FAQ page. \
        However if you need any assistance, feel free to contact our Customer Service Staff via the Link below.', urgency: 2 },
        'checking account balance': { message: 'Information about checking your account balance can be found on our FAQ page.', urgency: 1 },
        'Hello': { message: 'Hi there! Im Tommy, your Chatbot :) How can i help you today?', urgency: -1},
        'hi': { message: 'Hi there! Im Tommy, your Chatbot :) How can i help you today?', urgency: -1},
        'help me': { message: 'It is my pleasure! How can i help you today?', urgency: -1},
        // ... other key phrases and urgency levels
      };

    // Default urgency level
    let urgencyLevel = 0;
    let responseMessage;
    let showLiveChatForOther = false;
  
    // Check if the input matches any key phrase
    for (const phrase in responses) {
      if (input.includes(phrase)) {
        const response = responses[phrase];
        // Display user's input in the chat messages
        arr.value.push({ message: input, type: 'user' });
        var delayInMilliseconds = 1500; //1 second
        urgencyLevel = response.urgency; // Set the urgency level
        responseMessage = response.message; 
        setTimeout(function() {
          arr.value.push({ message: response.message, type: 'chatbot' }); // Push the response to the chat messages array
      }, delayInMilliseconds);
        break;
      }
      
    }

    // Display the live chat button based on urgency level
    showLiveChatButton.value = urgencyLevel >= 2;

    // Check if there's no match, ask the user to rephrase their enquiry and show live chat button
    if (urgencyLevel == 0) {
      // Display user's input in the chat messages
      arr.value.push({ message: input, type: 'user' });
      responseMessage = "I'm not sure how to help with that. Would you like to rephrase your enquiry or talk to our Customer Service Staff?";
      setTimeout(function() {
        arr.value.push({ message: responseMessage, type: 'chatbot' });
        proceedLiveChat('show')
        proceedFAQ('show')
      },1600)
    }
    else if(urgencyLevel == 1){
      setTimeout(function() {
        proceedFAQ('show')
      },1600)
    }
    else if (urgencyLevel == 2){
      setTimeout(function() {
        proceedLiveChat('show')
        proceedFAQ('show')
      },1600)
    }
    else if (urgencyLevel == 3){
      setTimeout(function()   {
        proceedLiveChat('show')
        proceedFAQ('show')
      },1600)
    }else{
    }

      showLiveChatButton.value = showLiveChatButton.value || showLiveChatForOther;
      textInput.value = ''; // Clear the input field after processing
      messageSent.value = true; // Set messageSent flag to true after sending a message
    };

  
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
        isDisabled.value = true;
        displayMessages(message)
    }
    function handleMessageLive(message){
        postMessage(message)
    }

    const liveChatSupport = () => {
      liveChatCard.value = 'showLive'
    }
    

    function postMessage(message){
      arr.value.push({ message: message, type: 'customer' }) 
      textInput.value = ''
    }

    return{
      handleMessage,
      role,
      arr,
      hide,
      textInput,
      liveChat,
      liveChatCard,
      liveChatSupport,
      faqPage,
      handleMessageLive,
      isDisabled,
      processInput,
      messageSent,
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


.card-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.need-button{
  background-color: rgb(179, 34, 34);
  box-shadow: 5px 5px 7px 0px #0000003f;
  transition: all 0.5s;
  position: fixed;
  bottom: 50px;
  right: 80px;
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
  max-width: 250px;
  float: right;
  max-width: 250px;
  background: rgb(255, 241, 228);
  text-align: right;
}

.chatbot { 
  clear: both;
  max-width: 250px;
  text-align: left;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
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



/* Jaden */
/* Container for the chat interface */
.chat-container {
  width: 400px;
  max-height: 500px;
  background-color: white; /* Set the background color to white */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
/* Chat messages area */
.chat-messages {
  padding: 20px;
  overflow-y: auto;
  max-height: 300px; /* Adjust the maximum height as needed */
  
}

.chat-message{
  max-width: 250px;

  text-align: right;
  padding: 10px;
  float: right;
}

/* Style for user's messages */
.user-message {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
  
}

.user-bubble {
  background-color: #ff3b3b; /* Red background for user's messages */
  color: #ffffff; /* White text color for user's messages */
  border-radius: 15px;
  padding: 10px 15px;
  max-width: 250px;
}

/* Style for chatbot's messages */
.chatbot-message {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
}

.chatbot-bubble {
  background-color: #ffffff; /* White background for chatbot's messages */
  color: #ff3b3b; /* Red text color for chatbot's messages */
  border-radius: 15px;
  padding: 10px 15px;
  max-width: 70%;
}

/* User input area */
.user-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #dddddd; /* Light gray border on top of the input area */
}

.input-box {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 25px;
  background-color: #ffffff; /* White background for user input */
  color: #000000; 
  outline: none;
}

.send-button {
  background-color: #ff3b3b; /* Red send button background */
  color: #ffffff; /* White text color for send button */
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.send-button:hover {
  background-color: #ff5656; /* Darker red on hover */
}
.chat-message {
  border-radius: 10px; /* Add rounded corners to messages */
  background-color: white; /* Set background to white */
  text-align: right; /* Align user messages to the right */
  margin-bottom: 10px; /* Add margin to messages */
  padding: 10px; /* Add padding to messages */
}

.user-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #dddddd; /* Light gray border on top of the input area */
  position: sticky;
  bottom: 0; /* Stick the input area to the bottom */
  background-color: white; /* White background for user input area */
}
</style>

<!-- <style scoped>


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
  background-color: rgb(197, 25, 25);
  box-shadow: 5px 5px 7px 0px #0000003f;
  transition: all 0.5s;
  position: fixed;
  bottom: 50px;
  right: 80px;
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
    position: absolute;
    background-color: rgb(179, 34, 34);
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0px;
    z-index: -1;
    transform: scaleX(0);
}

.need-button:hover::before{
  transform: scaleX(1);
  color: white !important;
}
.need-button:hover {
  background-color: rgb(179, 34, 34);
  border: solid 3px rgb(255, 255, 255);
  color: white !important;

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
</style> -->