<template>
    <header>Appointment Booking</header>
    <br>
    <a-space direction="vertical" :size="12">
    <a-date-picker allowClear = ' true' v-model:value="dateselected" :disabled-date="disabledDate" />
  </a-space>
  <br>
  <br>
  <div>Time Slots Available</div><br>
  <div class="content">
    <div class="column">  <a-space wrap>
          <a-button
            v-for="(slot, index) in timeSlots"
            :key="index"
            type="primary"
            class="button"
            :style="{ backgroundColor: isSelected(slot) ? 'blue' : 'white' }"
            @click="selectTime(slot)"
          >
            {{ slot }}
          </a-button>
        </a-space>
    </div>  
</div>
<br>
<a-checkbox v-model:checked="checked">I understand that after scheduling an appointment, I will no longer remain in the current queue.</a-checkbox>
<br><br>
<a-space wrap>
    <a-button @click="showModal">Confirm</a-button>
  </a-space>

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
        this.showModal(); 
        this.selectedTime.clear();
      } else {
        console.log('Please select a time slot before submitting.');
      }
    },
    showModal() {
      Modal.confirm({
        title: 'Schdule Appointment',
        content: h('div', {}, [
          h('p', `Selected Date: ${this.dateselected ? this.dateselected.format('YYYY-MM-DD') : 'Not selected'}`),
          h('p', `Selected Time: ${this.selectedTime || 'Not selected'}`),
        ]),
        onOk: () => {
          if (this.selectedTime && this.dateselected) {
            console.log('OK');
          } else {
            console.log('Error: Please select a time slot.');
            return false;
          }
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
  },
}
</script>

<style scoped>
.content {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 30px; 
    }
.button {
  width: 100%;
  height: 50px;
  color: black;
  text-align: center;
}
.button:selected {
  color: red;
}


@media (max-width: 880px) {
  #button{
    display: flex;
    flex-direction: column;
  }
}
</style>