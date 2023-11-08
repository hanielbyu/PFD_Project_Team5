<template>
  <div class="faq-container">
    <h2>Frequently Asked Questions</h2>
    <ul class="faq-list">
      <li class="faq-item">
        <div class="question">How do I reset my password?</div>
        <div class="answer">
          To reset your password, please follow these steps:
          <ol>
            <li>Go to the login page.</li>
            <li>Click on the "Forgot Password" link.</li>
            <li>Enter your registered email address and follow the instructions sent to your inbox.</li>
          </ol>
        </div>
      </li>

      <!-- Add more FAQ items following the same structure -->
      
      <li class="faq-item">
        <div class="question">If none of these questions answer my enquiry, what should I do?</div>
        <div class="answer">
          If none of the provided questions address your specific enquiry, please feel free to <a href="#">contact our support team</a> for further assistance.
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FAQ",
};
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-list {
  list-style: none;
  padding: 0;
}

.faq-item {
  margin-bottom: 20px;
}

.question {
  font-weight: bold;
}

.answer {
  margin-top: 5px;
}

.answer ol {
  list-style-type: decimal;
  margin: 0;
  padding-left: 20px;
}

.answer a {
  color: #007bff;
  text-decoration: underline;
}
</style>
