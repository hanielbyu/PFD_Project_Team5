<template>
    <div style="margin: auto; padding: 70px 0; height: 100%">
      <a-row type="flex" justify="center">
        <a-col>
          <a-typography-title style="color: #67595E;">CONTACT US</a-typography-title>
        </a-col>
      </a-row>
      <br/><br/><br/>
      <a-row type="flex">
        <a-col :flex="4">
        </a-col>
        <a-col :flex="1">
          <a-typography-title :level="3" style="color: #67595E">ADDRESS</a-typography-title>
          <a-typography-title :level="4" style="color: #67595E">12 Opera Estate, 36 Norma Terrace, Singapore 456649</a-typography-title>
          <a-typography-title :level="3" style="color: #67595E">EMAIL</a-typography-title>
          <a-typography-title :level="4" style="color: #67595E">hello@avira.com</a-typography-title>
          <a-typography-title :level="3" style="color: #67595E">PHONE NUMBER</a-typography-title>
          <a-typography-title :level="4" style="color: #67595E">+65 6372 7349</a-typography-title>
        </a-col>
      </a-row>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    components: {
    //   ContactForm
    },
    setup() {
      
    },
  })
  </script>
  
  <style scoped>
  a-typography-title {
    color: #67595E;
  }
  </style>
  