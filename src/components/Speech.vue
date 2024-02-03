<template>
      <a-button
        id="button"
        @click="onMicToggle"
        :class="isListening ? 'active' : 'inactive'"
        shape="circle"
        type="primary"
      >
      <font-awesome-icon :icon="['fas', 'microphone']"/>
      </a-button>
  
</template>

<script>
export default {
  data() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return {
      recognition: new SpeechRecognition(),
      text: "",
      isFinal: false,
      isListening: false,
    };
  },

  methods: {
    // ボタンクリック時の実行
    onMicToggle() {
      if (this.isListening) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    },
    stopCommand(result) {
      // if (result[0].transcript.includes("stop")) {
      //   this.recognition.stop();
      // }
    },
    removeAllText() {
      return (this.text = "");
    },
  },

  mounted() {
    this.recognition.lang = "en-US";
    // this.recognition.lang = "en-US";
    // 自分で停止するまで継続的に取得する
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    // 1. 録音スタート
    this.recognition.onstart = () => {
      console.log("started");
      this.isListening = true;
    };
    // 2. 録音ストップ
    this.recognition.onend = () => {
      console.log("stoped");
      this.isListening = false;
    };
    //　 3. 録音時のデータ取得
    this.recognition.onresult = (event) => {
      for (const res of event.results) {
        const result = res;
        if (result.isFinal) {
          // 4. 音声で録音をストップする
          this.stopCommand(result);
        }
      }
      // 5. 取得した録音を文章に変換
      const text = Array.from(event.results)
        .map((res) => res[0])
        .map((res) => res.transcript)
        .join(".   ");
      this.text = text;
      this.$emit('set-child-data', this.text)
      const allNotesRemoveRegex = /Delete All/;

      const allNotesRemoveMatch = allNotesRemoveRegex.test(this.text);

      // 全部削除

      if (allNotesRemoveMatch) {
        this.removeAllText();
        this.recognition.stop();
      }
    };
  },
};
</script>

<style scoped>
#button{
  width: 20px;
  position: absolute;
  right: 10px;
  top: 5px;
  background-color: rgb(43, 43, 43);
}

.active {
  background-color: #ff0d0d !important;
  color: #fff;
  
  box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  font-weight: normal;
  font-family: sans-serif;
  text-decoration: none !important;
  transition: all 300ms ease-in-out;
}

@-webkit-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@-moz-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@-ms-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}
</style>