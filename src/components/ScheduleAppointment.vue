<template>
  <div class="appointment-container">
    <header class="aptbooking">Book an Appointment</header>
    <hr>
    <br />
    <div>Full Name</div>
    <input type="text" placeholder="John Smith" id="name"><br><br>
    <div>Phone Number</div>
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
    <a-textarea :rows="3" placeholder="type here" :maxlength="150" /><br><br>
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
        let message11 = "Dear " + name + ", your appointment is confirmed on " + this.dateselected.format('YYYY-MM-DD') + " at " + this.selectedTime + ". PLease do not reply to this SMS.";
        // POST request using fetch with async/await
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message11 })
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
          h('p', Date: ${this.dateselected ? this.dateselected.format('YYYY-MM-DD') : 'Not selected'}),
          h('p', Time: ${this.selectedTime || 'Not selected'}),
          h('p', You will sms to confirm your appointment.),
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
.appointment-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
.column {
  width: 100%;
  box-sizing: border-box;
}
.button {
  width: 80px;
  margin: 4px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.button:hover {
  background-color: #d44e51;
    color: #fff;
    width: 100px;
    height: 45px;
}
.confirm-button {
  background-color: #c50f11;
    color: #fff;
    width: 200px;
    height: 45px;
}
.confirm-button:hover {
  background-color: #fff;
  color: #000;
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

</style>