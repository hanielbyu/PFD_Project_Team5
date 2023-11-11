import { defineComponent, ref } from "vue";

export default defineComponent({
components: {
Contact,
FAQ,
HomePage,
LiveChatSupport,
},
setup() {
// const socket = io();
let selectedKeys = ref(['home']);

const arr = ref([
{
message: "Hi, how may I assist you?",
type: "chatbot",
buttons: [
{
message: "Credit Card Stolen",
urgency: 3,
answer: "We understand the level of urgency on this matter, We will redirect you to our Customer Service Staff",
margin
} - bottom, 10, px,
]
},
{
message: "Suspicious Transaction",
urgency: 3,
answer: "We understand the level of urgency on this matter, We will redirect you to our Customer Service Staff"
},
{
message: "Register for Card",
urgency: 1,
answer: "Our FAQ page will have knowledge on this, Click here to view our FAQ page"
},
{
message: "Credit Limit Enquiry",
urgency: 2,
answer: "We will redirect you to our Customer Service Staff\
          However, feel free to contact us via Email or call this hotline"
}
]);
}
});
