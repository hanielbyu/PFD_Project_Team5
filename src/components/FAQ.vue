<template>
  <div class="faq-container">
    <h2>Frequently Asked Questions</h2>
    <ul class="faq-list">
      <li v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <template v-if="faq.steps">
          <a-collapse :default-active-key="[]" accordion>
            <a-collapse-panel :header="faq.question" :key="index">
              <div class="answer">
                <p>{{ faq.answer }}</p>
                <ol>
                  <li v-for="(step, stepIndex) in faq.steps" :key="stepIndex">{{ step }}</li>
                </ol>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </template>
        <template v-else>
          <div class="question">{{ faq.question }}</div>
          <div class="answer">
            <p>{{ faq.answer }} <a href="./HomePage.vue">contact our support team</a> for further assistance.</p>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FAQ",
  data() {
    return {
      faqs: [
        {
          question: "How do I reset my password?",
          answer: "To reset your password, please follow the steps below:",
          steps: [
            "Go to the login page.",
            "Click on the 'Forgot Password' link.",
            "Enter your registered email address and follow the instructions sent to your inbox.",
          ],
        },
        {
        question: "How can I check my account balance?",
        answer: "You can check your account balance through various methods. Here's how:",
        steps: [
          "Log in to your online banking account.",
          "Navigate to the 'Account Summary' or 'Balances' section.",
          "Your current account balance should be displayed on the screen.",
          "For mobile banking, open the mobile app and follow similar steps.",
          "Alternatively, visit an ATM and use your debit card to check your balance.",
        ],
      },
      {
        question: "What should I do if my debit card is lost or stolen?",
        answer: "If your debit card is lost or stolen, take the following steps to secure your account:",
        steps: [
          "Contact our customer support immediately to report the lost or stolen card.",
          "Provide necessary information, such as your account details and any recent transactions.",
          "Our team will block the lost card to prevent unauthorized transactions.",
          "You may request a replacement card, and it will be sent to your registered address.",
        ],
      },
      {
        question: "How can I dispute a transaction on my account?",
        answer: "If you need to dispute a transaction on your account, follow these steps:",
        steps: [
          "Log in to your online banking account and go to the 'Transaction History' or 'Account Activity' section.",
          "Locate the transaction you want to dispute and gather relevant details.",
          "Contact our customer support and provide information about the disputed transaction.",
          "Our team will guide you through the dispute resolution process and may ask for additional documentation.",
        ],
      },
        {
          question: "If none of these questions answer my enquiry, what should I do?",
          answer: "If none of the provided questions address your specific enquiry, please feel free to",
        },
        // Add more FAQs following the same structure
        
      ],
      activeKey: [], // Set activeKey to an empty array
    };
  },
};
</script>

<style scoped>
h2, .question, .answer {
  color: #333;
}

.faq-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
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
  font-size: 18px;
}

.answer {
  margin-top: 10px;
  font-size: 16px;
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
