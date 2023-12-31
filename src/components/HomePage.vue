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
    <img src="https://i.pinimg.com/564x/65/5f/fe/655ffee238b9cfa3671dedc72c879240.jpg" alt="LIVE CHAT SUPPORT" class="small-image" >
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
.live-chat-support-container {
max-width: 800px;
margin: 0 auto;
padding: 20px;
background-color: rgba(255, 25, 255, 0.9); /* Partially opaque white background */
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

.logo-container {
display: flex;
align-items: center;
max-width: 300px;
}

.ocbclogo {
width: 50px;
padding: 10px;
}

/* Hero Section */

.bg-sm {
  display: none;
}

.hero__bg {
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: auto auto;
  transform: none;
}

.hero__bg-images {
  position: relative;
}


.mockup-img {
  object-fit: contain;
}

.hero__bg-content{
  max-width: 800px;
}

.hero__bg-content h1,
.hero__bg-content p {
  text-align: left;
}

.hero__bg-content h1 {
  line-height: 32px;
  font-size: 1.5rem;
  margin-bottom: 40px;
  font-weight: bold;
}

.hero__bg-content p {
  font-size: 1rem;
  line-height: 28px;
  font-weight: 500;
}
div.hero__bg-content {
background-color: rgba(193, 193, 193, 0.9);
-webkit-backdrop-filter: blur(5px);
backdrop-filter: blur(5px);
padding: 20px;
margin: 30px;
font-weight: bold;
}

header {
background-color: #ef61611c;
max-width: 340px ;
color: rgb(255, 255, 255);
padding: 10px;
}

.logo-container {
display: flex;
align-items: center;
}

.ocbc-logo {
width: 50px;
margin-right: 10px;
}

.title {
font-size: 1.5rem;
margin: 0;
}

/* Add styles for the overlay */
.overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: none;
z-index: 1;
}
.live-chat-support-container {
max-width: 800px;
margin: 20px auto;
padding: 20px;
background-color: rgba(175, 174, 174, 0.9);
border-radius: 10px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
}

.instruction-step {
margin-top: 20px;
padding: 15px;
background-color: #e0e0e0;
border-radius: 8px;
}
button {
background-color: rgb(206, 12, 12);
color: white;
border: none;
padding: 12px 20px;
cursor: pointer;
border-radius: 5px;
font-size: 1rem;
}

button:hover {
background-color: rgb(164, 97, 78)
}
.hero-section {
background-color: rgba(255, 255, 255, 0.1);
padding: 50px 0;
}

.hero__bg-content {
background-color: rgba(255, 255, 255, 0.9);
padding: 20px;
border-radius: 10px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

hr {
  border: 1px solid #2b2b2b; /* Set the color of the line */
  margin: 20px 0; /* Adjust the margin above and below the line */
}

.small-image {
      width: 75%;
      height: auto; 
      padding-left: 12%;
}
.button-container {
  display: flex;
  justify-content: flex-start; /* Align buttons to the left */
  gap: 10px; /* Adjust the gap as needed */
  margin-top: 10px; /* Adjust the top margin as needed */
}

.button-gap {
  flex: 0; /* This creates a flexible space to push the buttons apart */
}
</style>