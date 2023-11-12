<template>
    <header>Appointment Booking</header>
    <br>
    <a-space direction="vertical" :size="12">
    <a-date-picker v-model:value="value1" :disabled-date="disabledDate" />
  </a-space>
  <br>
  <br>
  <div>Time Slots Available</div><br>
  <div class="content">
    <div class="column"><a-space wrap>
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
    <a-button type="primary">Submit</a-button>
  </a-space>



</template>

<script>
export default {
  data() {
    return {
      value1: null,
      timeSlots: [],
      selectedTime: null,
      checked: false,
    };
  },
  mounted() {
    this.updateTimeSlots(); // Set initial time slots
  },
  methods: {
    updateTimeSlots() {
      const now = new Date();
      now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15); // Round up to the nearest 15 minutes
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };

      // Generate 8 time slots with 15-minute intervals
      for (let i = 0; i < 8; i++) {
        this.timeSlots.push(now.toLocaleTimeString(undefined, options));
        now.setMinutes(now.getMinutes() + 15);
      }
    },
    selectTime(slot) {
      console.log('Selected time:', slot);
      this.selectedTime = slot;
      // You can add more logic here for handling the selected time
    },
    isSelected(slot) {
      return this.selectedTime === slot;
    },
    disabledDate(current) {
      // Disable dates before today
      return new Date() >= current && current;
    },
  },
};
</script>

<style scoped>
.button {
  width: 100%;
  height: 50px;
  color: black;
  margin-bottom: 10px;
}

.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

@media (max-width: 880px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>