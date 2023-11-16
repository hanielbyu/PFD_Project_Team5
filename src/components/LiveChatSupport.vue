<template>
  <div class="panel">
    <div class="messages" ref="messagesRef">
      <div class="inner">
        <div v-if="role == 'tech'">
          <h5 v-if="role == 'tech'">Keywords: Compromised, Scam</h5>
          <h5 v-if="role == 'tech'">Time: 12:00pm </h5>
        </div>
        <h5>Waiting for Customer Service Staff to assist you</h5>
        
    
        <div 
          :key="index"
          v-for="(message, index) in messages"
          class="message" >
          <div v-if="message.uid === 'center'" class="user-center">
            <div class="text-center">{{ message.text }}</div>
          </div>
          <div v-else-if="message.uid === uid" class="user-self">
            <div class="text-self">{{ message.text }}</div>
          </div>
          <div v-else class="user-them">
            <div class="text-them">{{ message.text }}</div>
          </div>
        </div>
        
      </div>
    </div>
    <a-button v-if="authStore.$state.user.role === 'tech' && !startState" type="primary" @click="startChat">Start Chat</a-button>
    <form v-else class="chatbox-form" @submit.prevent="sendMessage">
      <div class="suggested-texts">
        <!-- Add predefined suggestions -->
        <span @click="setText('Thank You!')">Thank You</span>
        <span @click="setText('Hi there!')">Hi there</span>
        <!-- Add more suggestions as needed -->

      </div>
      <input class="text-input" v-model="text" />
      <Speech v-on:set-child-data="speech2text"/>
      <button class="text-button" >+</button>
    </form>
  </div>
</template>


<script setup>
import { useAuthStore } from '@/stores';
import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted, nextTick, defineExpose } from 'vue';
import Speech from './Speech.vue';

const authStore = useAuthStore();

const APP_ID = '8a2667e467284e6e975d1ca95176477c';
const CHANNEL = 'han';
let role = ref('tech') // Get role from store
let client = AgoraRTM.createInstance(APP_ID);
let uid = uuidv4();
let text = ref('');
let messagesRef = ref(null);
let messages = ref([]);
let channel;
let startState = ref(false);

const appendMessage = async (message) => {
  console.log('BELONGS TO LIVECHATSUPPORT', message)
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

defineExpose({ messagesRef });

function sendMessage() {
  if (text.value === '') return;
  console.log('check text', text)
  channel.sendMessage({ text: text.value, type: 'text' });
  appendMessage({
    text: text.value,
    uid,
  });
  text.value = '';
}
function startChat(){
  startState.value = true
  let text = 'Customer Service has entered the chat';
  messages.value.push({text: text, uid: 'center' });
  channel.sendMessage({ text: text, type: 'text' });
}
function setText(suggestion) {
  text.value = suggestion;
}

function speech2text(voice){
  text.value = voice;
}

</script>

<style>
body {
  margin: 0;
  height: 400px;
}

h5{
  color: rgb(156, 156, 156);
}




.panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
  max-width: 800px;
  height: 450px;
  background:whitesmoke;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.messages {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: white;
}
.inner {
  padding: 10px;
}
.message {
  text-align: right;
  margin-bottom: 6px;
}
.text-them{
  font-size: 16px;
  text-align: left;
  max-width: 70%;
}
.text-self{
  font-size: 16px;
  text-align: right;
  
}
.user-self {
  color: rgb(71, 148, 0);
}
.user-them {
  color: rgb(170, 6, 6);
}
.chatbox-form {
  position: relative;
  display: flex;

}
.text-input {
  width: 100%;
  border: none;
  height: 40px;
  padding: 8px;
  border-top: 1px solid #999;
  border-radius: 0px;
  outline: none;
}

.text-button {
  border: none;
  outline: none;
  background: rgb(58, 58, 58);
  color: white;
  padding: 1px 10px;
  position: absolute;
  right: 0px;
  bottom: 10px;

  font-size: 24px;
}
.suggested-texts {
  display: flex;
  margin-bottom: 10px;
}

.suggested-texts span {
  cursor: pointer;
  padding: 8px 12px;
  background-color: #313030; /* Grey color */
  color: white;
  border-radius: 5px;
  margin-right: 5px; /* No spacing between buttons */
}

.chatbox-form {
  position: relative;
  display: flex;
  flex-direction: column; /* Adjust to column layout */
}

div .ant-card-bordered{
  background-color: rgb(255, 174, 174);
}

.text-input {
  width: 100%;
  border: none;
  height: 40px;
  padding: 8px;
  border-top: 1px solid #999;
  border-radius: 5px;
  outline: none;
  margin-bottom: 10px;
}

</style>