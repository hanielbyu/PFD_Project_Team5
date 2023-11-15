<template>
  <div>
    <form name="login-form" class="login-form" @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" class="form-control" />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" />
      </div>

      <button v-on:click ="login">Login</button>

    </form>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: 'LoginView1',
  data() {
    return {
        username: '',
        password: '',
    };
  },
  methods: {
    async login() { 
      let result = axios.get(
        'http://localhost:3000/roles?username=$(this.username)&password=$(this.password)'
      )

      if(result.status==200 && result.data.length>0)
      {
      localStorage.setItem("user-info",JSON.stringify(result.data[0]))
      this.$router.push({name:"FAQ"})
    }
      console.warn(result)
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.btn {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
}

.form-text {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}
</style>