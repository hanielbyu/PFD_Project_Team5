<template>
        <div class="live-chat-support-container">
          <h2>Live Chat Support Instructions</h2>
          <div v-if="currentPage === 1">
            <p>
              Welcome to our Live Chat Support! This guide will help you navigate through the process.
            </p>
            <button @click="nextPage">Next</button>
          </div>
          <div v-else-if="currentPage === 2">
            <p>
                Welcome to our Live Chat Support! To get started, look for the "Need Help?" button at the bottom right corner of the page. It's a round button with a chat icon. Click on it to open the chat interface.
                
            </p>
            <button @click="nextPage">Next</button>
          </div>
          <div v-else-if="currentPage === 3">
            <p>
                You can then type your questions or concerns in the chatbox. The AI will analyze your input and provide helpful responses. Feel free to ask anything related to our products, services, or common issues.
            </p>
            <button @click="nextPage">Next</button>
          </div>
          <!-- Add more steps following the same structure -->
          <div v-else-if="currentPage === 4">
            <p>
              The AI will suggest related categories based on your input.
            </p>
            <button @click="nextPage">Next</button>
          </div>
          <div v-else-if="currentPage === 5">
            <p>
              Choose a category, and the system will categorize your inquiry by urgency (1-5).
            </p>
            <button @click="nextPage">Next</button>
          </div>
          <div v-else-if="currentPage === 6">
            <p>
              You'll be redirected to a technician for live chat support based on urgency.
            </p>
            <button @click="nextPage">Next</button>
          </div>
          <div v-else>
            <p>
              Ready to get started? Feel free to ask your first question!
            </p>
          </div>
          <div class="opaque-background"></div>
        </div>
      </template>
      
      <script>
      export default {
        name: "LiveChatSupport",
        data() {
          return {
            currentPage: 1,
          };
        },
        methods: {
          nextPage() {
            if (this.currentPage < 7) {
              this.currentPage++;
            }
          },
        },
      };
      </script>
      
<style scoped>
.live-chat-support-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Partially opaque white background */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Box shadow for a subtle lift effect */
}

.page-title {
  color: #007bff; /* Blue color for the page title */
}

.instruction-step {
  margin-top: 20px;
  padding: 15px;
  background-color: #f4f4f4; /* Light gray background for each step */
  border-radius: 8px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>