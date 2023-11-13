<template>
  <div class="panel">
    <div class="messages" ref="messagesRef">
      <div class="inner">
        <div
          :key="index"
          v-for="(message, index) in messages"
          class="message" >
          <div v-if="message.uid === uid" class="user-self">
            <div class="text-self">{{ message.text }}</div>
          </div>
          <div v-else class="user-them">
            <div class="text-them">{{ message.text }}</div>
          </div>
        </div>
      </div>
    </div>
    <form class="chatbox-form" @submit.prevent="sendMessage">
      <input class="text-input" v-model="text" />
      <button class="text-button" >+</button>
    </form>
  </div>
</template>


<script setup>
import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted, nextTick, defineExpose } from 'vue';

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
  console.log('BELONGS TO LIVECHATSUPPORT')
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
  console.log('check text', text)
  channel.sendMessage({ text: text.value, type: 'text' });
  appendMessage({
    text: text.value,
    uid,
  });
  text.value = '';
}
</script>

<style>
body {
  margin: 0;
  height: 400px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
  max-width: 400px;
  height: 450px;
  background: rgba(255, 255, 255, 0.7);
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
  text-align: left;
}
.text-self{
  text-align: right;
}
.user-self {
  color: green;
}
.user-them {
  color: red;

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
  padding: 6px 10px;
  position: absolute;
  right: 0px;
  bottom: 0px;

  font-size: 24px;
}
</style>
