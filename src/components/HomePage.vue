<template>
  <header>
    <div class="logo-container">
      <h1 class="title">WELCOME TO OCBC</h1>
    </div>
</header>
<div class="overlay" id="overlay"></div>


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
    <div class="button-container">
      <button @click="prevPage">Prev</button>
      <div class="button-gap"></div>
      <button @click="nextPage">Next</button>
    </div>
  </div>
  <div v-else-if="currentPage === 3">
    <p>
      You can then type your questions or concerns in the chatbox. The AI will analyze your input and provide helpful responses. Feel free to ask anything related to our products, services, or common issues.
    </p>
    <div class="button-container">
      <button @click="prevPage">Prev</button>
      <div class="button-gap"></div>
      <button @click="nextPage">Next</button>
    </div>
  </div>

  <div v-else-if="currentPage === 4">
    <p>
      The AI will suggest related categories based on your input.
    </p>
    <div class="button-container">
      <button @click="prevPage">Prev</button>
      <div class="button-gap"></div>
      <button @click="nextPage">Next</button>
    </div>
  </div>
  <div v-else-if="currentPage === 5">
    <p>
      Choose a category, and the system will categorize your inquiry by urgency (1-5).
    </p>
    <div class="button-container">
      <button @click="prevPage">Prev</button>
      <div class="button-gap"></div>
      <button @click="nextPage">Next</button>
    </div>
  </div>

  <div v-else-if="currentPage === 6">
    <p>
      You'll be redirected to a technician for live chat support based on urgency.
    </p>
    <div class="button-container">
      <button @click="prevPage">Prev</button>
      <div class="button-gap"></div>
      <button @click="nextPage">Next</button>
    </div>
  </div>
    <div v-else>
      <p>
        Ready to get started? Feel free to ask your first question!
      </p>
      <button @click="prevPage">Prev</button>
    </div>
    <div class="opaque-background"></div>
  </div>

<hr>

<section class="hero-section">
<div class="hero__bg">
    <div class="hero__bg-content">
        <h1>About Live Chat Support</h1>

        <p class="p-lead">OCBC is excited to introduce Live Chat Support, a new feature designed to make your banking experience even more convenient and efficient. With Live Chat Support, you can now connect with our dedicated support team in real-time, right from the comfort of your digital space.</p>
        <hr>
        <p> Experience personalized assistance tailored to your specific needs. Our knowledgeable support agents are here to help you with account inquiries, transaction assistance, and any other banking-related questions you may have. Enjoy the benefits of quick, efficient, and personalized support with OCBC's Live Chat Support.</p>
    </div>
</div>
</section>
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
/* General Styles */
body, h1, h2, p, button {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Header Styles */
.header {
  background-color: #D6001C; /* Slightly darker red for better contrast */
  padding: 1rem 0;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.logo-container .title {
  color: white;
  font-size: 2rem; /* Increase size for impact */
  font-weight: 700; /* Bold font weight */
}

/* Overlay Styles */
.overlay {
  /* Assuming this is used for a modal or similar component */
}

/* Live Chat Support Container */
.live-chat-support-container {
  max-width: 700px; /* Slightly wider for better spacing */
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border: none; /* Removing border */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Buttons */
button {
  background-color: #D6001C;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  outline: none; /* Remove outline for a clean design */
  margin: 0.5rem; /* Uniform margin for buttons */
}

button:hover, button:focus {
  background-color: #AA0016; /* Darken button on hover/focus for interaction */
}

/* Hero Section */
.hero-section {
  background-color: #f4f4f4; /* Soft background color for the hero section */
  padding: 2rem 0;
}

.hero__bg-content {
  padding: 2rem;
  background-color: transparent; /* Make it consistent with the section background */
  text-align: center; /* Center align the text */
}

.hero__bg-content h1,
.hero__bg-content p {
  color: #333;
}

.hero__bg-content h1 {
  margin-bottom: 1rem;
}

/* Additional global styles */
p {
  line-height: 1.6; /* Improve readability */
}

.hr {
  max-width: 700px;
  margin: 1rem auto;
  border-top: 1px solid #ddd; /* Subtle line for separation */
}

/* Button Container */
.button-container {
  display: flex;
  justify-content: center; /* Center buttons */
  gap: 1rem; /* Space between buttons */
}

.button-gap {
  display: none; /* Remove if using gap */
}

/* Footer styles if you have a footer */
footer {
  text-align: center;
  padding: 1rem 0;
  background-color: #D6001C;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .live-chat-support-container,
  .hr {
    width: 90%;
    margin: 1rem auto;
  }

  .hero-section {
    padding: 1rem;
  }

  .button-container {
    flex-direction: column; /* Stack buttons on smaller screens */
  }

  button {
    width: 100%; /* Full-width buttons on smaller screens */
  }
}
</style>

