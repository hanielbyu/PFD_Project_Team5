  <template>
    <div class="appointment-container">
      <header class="aptbooking">Book an Appointment</header>
      <hr>
      <br />
      <input type="text" placeholder="Name"><br><br>
      <input type="text" id="phoneNumber" placeholder="+65 Phone Number" oninput="validateNumber()" required><br><br>
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
      };
    },
    mounted() {
      this.updateTimeSlots();
    },
    methods: {
          updateTimeSlots() {
            const now = new Date();
            now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30); 
            const options = { hour: 'numeric', minute: 'numeric', hour12: true };
            // for loop to generate 30 min interval buttons
            for (let i = 0; i < 10; i++) {
              this.timeSlots.push(now.toLocaleTimeString(undefined, options));
              now.setMinutes(now.getMinutes() + 30);
            }
          },
          selectTime(slot) {
            console.log('Selected time:', slot);
            this.selectedTime = slot;
          },
          selectdate() {
            console.log('Selected Date:', this.dateselected);
          },
          isSelected(slot) {
            return this.selectedTime === slot;
          },
          disabledDate(current) {
            // Disable dates before today
            return current && current < new Date().setHours(0, 0, 0, 0);
          },
          submitAppointment() {
            if (this.selectedTime) {
              console.log('Appointment submitted for time:', this.selectedTime);
              sendSMS();
              this.showModal(); 
            } else {
              console.log('Please select a time slot before submitting.');
            }
          },
      showModal() {
        Modal.confirm({
          title: 'Appointment Booked',
          content: h('div', {}, [
            h('p', `Date: ${this.dateselected ? this.dateselected.format('YYYY-MM-DD') : 'Not selected'}`),
            h('p', `Time: ${this.selectedTime || 'Not selected'}`),
            h('p', `You will sms to confirm your appointment.`),
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
    width: 100%; /* Set the initial width to 100% for one column */
    box-sizing: border-box;
  }

  .button {
    width: 80px;
    margin: 4px; /* Add some margin between buttons for spacing */
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
  .button:hover {
    background-color: #ff4d4f;
    color: #000;
    height: 50px;
  }

  .confirm-button {
    background-color: #ff4d4f;
    color: #000;
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

  .aptbooking{
    font-weight: bold;
    font-size: 20px;
  }
  </style>