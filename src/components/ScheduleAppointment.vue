<template>
  <div class="appointment-container">
    <header class="aptbooking">Book an Appointment</header>
    <hr>
    <br />
    <input type="text" id="name" placeholder="John Smith"><br><br>
    <input type="text" id="phoneNumber" placeholder="+6585152231" oninput="validateNumber()" required><br><br>
    <a-space direction="vertical" :size="12">
      <a-date-picker allowClear="true" v-model:value="dateselected" :disabled-date="disabledDate" />
    </a-space>
    <br />
    <br />
    <div>Time Slots Available</div>
    <br />
    <div class="content">
      <div class="column">
        <a-space wrap>
          <a-button
            v-for="(slot, index) in timeSlots"
            :key="index"
            type="primary"
            class="button"
            :style="{ backgroundColor: isSelected(slot) ? '#ff4d4f' : '#fff', color: isSelected(slot) ? '#fff' : '#000' }"
            @click="selectTime(slot)"
          >
            {{ slot }}
          </a-button>
        </a-space>
      </div>
    </div><br>
    <p>Your issue</p>
    <a-textarea :rows="3" id="description" placeholder="type here" :maxlength="150" /><br><br>
    <a-checkbox v-model:checked="checked">I understand that after scheduling an appointment, I will no longer remain in the current queue.</a-checkbox><br><br>
    <a-space wrap>
      <a-button @click="submitAppointment" :disabled="!selectedTime || !dateselected || !checked" class="confirm-button">Book Now</a-button>
    </a-space>
  </div>
</template>
<script>
import { Modal } from 'ant-design-vue';
import { h } from 'vue';


export default {
  name: 'ScheduleAppointment',

  
  data() {

    return {
      dateselected: null,
      timeSlots: [],
      selectedTime: null,
      checked: false,
      appointmentTime: null,
    };
  },
  mounted() {
    this.updateTimeSlots();
    this.startCheckingAppointmentTime();
  },
  methods: {
    updateTimeSlots() {
      const now = new Date();
      now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30); 
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      for (let i = 0; i < 10; i++) {
        this.timeSlots.push(now.toLocaleTimeString(undefined, options));
        now.setMinutes(now.getMinutes() + 30);
      }
    },
    selectTime(slot) {
      console.log('Selected time:', slot);
      this.selectedTime = slot;
    },
    isSelected(slot) {
      return this.selectedTime === slot;
    },
    disabledDate(current) {
      return current && current < new Date().setHours(0, 0, 0, 0);
    },
    async submitAppointment() {
      if (this.selectedTime && this.dateselected) {
        console.log('Appointment submitted for time:', this.selectedTime);
        const [hours, minutesPart] = this.selectedTime.split(':');
        const minutes = minutesPart.substring(0, 2);
        const meridian = minutesPart.substring(3);
        const appointmentDate = new Date(this.dateselected);
        appointmentDate.setHours(meridian === 'PM' ? parseInt(hours) + 12 : hours, minutes, 0);
        this.appointmentTime = appointmentDate;
        this.showModal();
        const name = document.getElementById('name').value;
        const desc = document.getElementById('description').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        let message11 = "Dear " + name + ", your appointment is confirmed on " + this.dateselected.format('YYYY-MM-DD') + " at " + this.selectedTime + ". Please do not reply to this SMS.";  
        // POST request using fetch with async/await
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              name: name,
              appointmentDate: appointmentDate,
              description: desc,
              message: message11,
              phone: phoneNumber
             })
        };
        const response = await fetch("http://localhost:5000/sms", requestOptions);
        const data = await response.json();


        
      } 


      else {
        console.log('Please select a time slot before submitting.');
      }
    },
    showModal() {
      Modal.confirm({
        title: 'Appointment Booked',
        content: h('div', {}, [
          h('p', `Date: ${this.dateselected ? this.dateselected.format('YYYY-MM-DD') : 'Not selected'}`),
          h('p', `Time: ${this.selectedTime || 'Not selected'}`),
          h('p', `You will receive an SMS Confimation Shortly.`),
        ]),
        onOk: () => {
          if (this.selectedTime && this.dateselected) {
            console.log('OK');
          } else {
            console.log('Error: Please select a time slot.');
            return false;
          }
        },
        class: 'appointment-modal',
      });
    },
    startCheckingAppointmentTime() {
      setInterval(() => {
        const currentTime = new Date();
        if (this.appointmentTime && currentTime >= this.appointmentTime && currentTime - this.appointmentTime < 1000) {
          this.showAppointmentTimeOverlay();
        }
      }, 1000);
    },
    showAppointmentTimeOverlay() {
      Modal.info({
        title: 'Appointment Reminder',
        content: 'It\'s time for your appointment!',
        class: 'appointment-reminder-modal',
      });
    },
  },
  
};
</script>

<style scoped>
input, .ant-input, .ant-picker-input input {
  border: none; /* Remove border */
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Soft shadow for depth */
  padding: 10px 15px; /* Adequate padding for text */
  margin-bottom: 15px; /* Space between each field */
}

/* Specific adjustments for the Ant Design components like DatePicker and Textarea */
.ant-picker, .ant-input-textarea {
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Consistent shadow effect */
}

/* Hover effects for inputs */
input:hover, .ant-picker:hover, .ant-input:hover, .ant-input-textarea:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.15); /* Slightly more pronounced shadow on hover */
}

/* Focus effects for inputs, using Ant Design's focus class as an example */
input:focus, .ant-picker-focused, .ant-input:focus, .ant-input-textarea:focus {
  outline: none; /* Remove default focus outline */
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); /* Custom focus style to match Ant Design's color scheme */
}



/* Styling for disabled button to match the input style */
button:disabled {
  background-color: #f5f5f5; /* Lighter background for disabled state */
  color: #ccc; /* Dimmed text color */
  cursor: not-allowed; /* Cursor indication for unavailable action */
  border-radius: 20px; /* Consistent rounded corners */
  box-shadow: none; /* Remove shadow for a flat appearance */
}

/* Additional styling for the appointment container and buttons for consistency */
.appointment-container {
  max-width: 800px; /* Increased width for a larger container */
  margin: 20px auto; /* Adjusted to keep the form centered */
  padding: 40px; /* Increased padding for more internal space */
  background: rgb(239 239 239 / 90%); /* Slightly transparent white background */
  border-radius: 20px; /* Rounded corners for a modern look */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}


/* Adjust the hover effect for the time slot buttons for better feedback */
.button:hover {
  background-color: #ff4d4f; /* Reddish tone for hover */
  color: #fff; /* White text for contrast */
  border-color: #ff4d4f; /* Consistent border color with background */
  transform: scale(1.05); /* Slight enlargement for emphasis */
  transition: all 0.3s ease; /* Smooth transition for hover effects */
}

.confirm-button {
  background-color: #c50f11;
    color: #fff;
    width: 200px;
    height: 45px;
}
.confirm-button, .confirm-button:hover {
  border-radius: 20px; /* Rounded corners for consistency */
  transition: all 0.3s ease; /* Smooth transition for hover effects */
}

button:disabled {
  background-color: #ccc;
  color: #fff;
  cursor: not-allowed;
}
.aptbooking {
  font-weight: bold;
  font-size: 20px;
}
/* Style for enabled button */
.confirm-button:not(:disabled) {
  background-color: #ff4d4f; /* Bright red background */
  color: #fff; /* White text */
  border-color: #ff4d4f; /* Match border color to background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Slight shadow for depth */
}

/* Maintain the hover effect for the enabled button for visual feedback */
.confirm-button:not(:disabled):hover {
  background-color: #d43d3f; /* Slightly darker shade of red on hover */
  color: #fff; /* Keep text color white */
  border-color: #d43d3f; /* Match border color to the hover background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* More pronounced shadow on hover */
}


</style>