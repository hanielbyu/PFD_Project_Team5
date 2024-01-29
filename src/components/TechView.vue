<!-- tech.vue -->

<template>
    <div>
      <table class="tech-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Urgency</th>
            <th>Keywords</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="technician in technicians" :key="technician.id">
            <td>{{ technician.userName }}</td>
            <td>{{ technician.urgency }}</td>
            <td>{{ technician.keywords }}</td>
            <td>{{ getTimeString(technician) }}</td>
            <td>
                <a href="" @click="proceedLiveChat('show')" >
                <a-button>Chat</a-button>
                </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  
  
  <style scoped>

    .liveChatPanel{
      margin-top: 40px;
    }
    .tech-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
  
    .tech-table th, .tech-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  
    .tech-table th {
      background-color: #f44336;
      color: white;
    }
  
    .tech-table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  
    .tech-table tr:nth-child(odd) {
      background-color: #fff;
    }
  </style>
  
  <script>
  import {defineComponent, ref} from 'vue';


  export default defineComponent({
    
    methods: {
      getTimeString(technician) {
        if (technician.userName === 'John Doe') {
          return 'Now';
        } else if (technician.userName === 'Jane Smith') {
          return '12:00 PM (Scheduled)';
        } else if (technician.userName === 'Tarry Lim') {
          return '12:30 PM';
        }
        return '';
      }
    },
    data() {
      return {
        technicians: [
          { id: 1, userName: 'John Doe', urgency: 3, keywords: 'Compromised, Scam' },
          { id: 2, userName: 'Jane Smith', urgency: 2, keywords: 'Crash' },
          { id: 3, userName: 'Tarry Lim', urgency: 3, keywords: 'Money, Hacked' },
        ],
      };
    },
    setup(){
      const liveChat = ref('hide');

      const proceedLiveChat = (state) => {
      liveChat.value = state;
    };

      return{
      proceedLiveChat,
      liveChat,
      
    }
    }
  });
  </script>
  