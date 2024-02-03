<template>
  <div class="live-chat-support-container">
    <h2>Live Chat Support Instructions</h2>

    <div v-if="currentPage === 1">
      <p>
        Thank you for choosing our Live Chat Support! This quick guide will ensure you know exactly how to get the help you need, every step of the way. Let's get started!
      </p>
      <button @click="nextPage">Next</button>
    </div>

    <div v-else-if="currentPage === 2">
      <p>
        To begin, locate the 'Need Help?' button. You'll find it at the bottom right corner of your screen. It’s a round button with a chat icon. Give it a click to open up the chat interface.
      </p>
      <div class="button-container">
        <button @click="prevPage">Prev</button>
        <div class="button-gap"></div>
        <button @click="nextPage">Next</button>
      </div>
    </div>

    <div v-else-if="currentPage === 3">
      <p>
        Now that the chat is open, go ahead and type in any questions or concerns you have in the chatbox. Our AI assistant is here to provide you with immediate, helpful answers. Whether it's about our products, services, or any issues you're facing, don't hesitate to ask.
      </p>
      <div class="button-container">
        <button @click="prevPage">Prev</button>
        <div class="button-gap"></div>
        <button @click="nextPage">Next</button>
      </div>
    </div>

    <div v-else-if="currentPage === 4">
      <p>
        As you interact with our AI, it will suggest categories related to your query. This helps in providing you with the most relevant information and support options.
      </p>
      <div class="button-container">
        <button @click="prevPage">Prev</button>
        <div class="button-gap"></div>
        <button @click="nextPage">Next</button>
      </div>
    </div>

    <div v-else-if="currentPage === 5">
      <p>
        Your questions will be prioritized based on their urgency level, ensuring those with more immediate needs receive attention first.
      </p>
      <div class="button-container">
        <button @click="prevPage">Prev</button>
        <div class="button-gap"></div>
        <button @click="nextPage">Next</button>
      </div>
    </div>

    <div v-else-if="currentPage === 6">
      <p>
        Based on the urgency and category of your inquiry, you'll be promptly connected to a technician for live support. We're here to ensure your concerns are addressed with the utmost attention and care.
      </p>
      <div class="button-container">
        <button @click="prevPage">Prev</button>
        <div class="button-gap"></div>
        <button @click="nextPage">Next</button>
      </div>
    </div>

    <div v-else>
      <p>
        All set! You're now ready to start your first conversation. Feel free to ask your first question whenever you're ready, and let's make your experience as smooth as possible.
      </p>
      <button @click="prevPage">Prev</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "HomePage",
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
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
  

<style scoped>
/* Base styles for body elements to ensure consistency and readability */
body, h1, h2, p, button {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Styling for headings and paragraphs to make them more appealing */
h2 {
  font-size: 24px; /* Slightly reduced for subtlety */
  color: #333; /* Dark grey for contrast */
  margin-bottom: 1rem; /* Space below the heading */
}

p {
  font-size: 16px; /* Comfortable reading size */
  margin-top: 20px; /* Space above paragraphs */
  color: #555; /* Soft black for readability */
  line-height: 1.5; /* Improved line spacing */
}

/* Enhancing the live chat support container */
.live-chat-support-container {
  max-width: 800px; /* Increased width for a larger container */
  margin: 100px auto; /* Centered with more vertical space */
  padding: 30px; /* Increased padding for more internal space */
  background-color: rgba(255, 255, 255, 0.884); /* Slightly transparent white */
  border-radius: 10px; /* Rounded corners for a modern look */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* Refined button styles for better user interaction */
button {
  background-color: #D6001C; /* Vibrant red */
  color: #fff; /* White text for contrast */
  border: none; /* Clean look without border */
  padding: 10px 20px; /* Adequate padding for easy tapping */
  font-size: 14px; /* Readable font size */
  font-weight: 600; /* Medium weight for emphasis */
  border-radius: 5px; /* Slightly rounded corners for a soft look */
  cursor: pointer; /* Cursor indication for interactivity */
  transition: background-color 0.3s, transform 0.2s; /* Smooth transitions for feedback */
}

button:hover {
  background-color: #AA0016; /* Darker shade on hover for feedback */
  transform: scale(1.05); /* Slight increase in size for emphasis */
}

/* Button container for navigation */
.button-container {
  display: flex;
  justify-content: space-between; /* Space out buttons */
  margin-top: 30px; /* Space above the button container */
}

@media (max-width: 768px) {
  .live-chat-support-container {
    width: 90%; /* Responsive width */
    margin: 20px auto; /* Adjusted vertical spacing */
  }

  .button-container {
    flex-direction: column; /* Stack buttons on smaller screens */
  }

  button {
    margin-bottom: 10px; /* Space between stacked buttons */
  }
}
</style>
