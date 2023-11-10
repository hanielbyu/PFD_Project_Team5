<template>
  <form name="login-form" class="login-form">
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="input.username" class="form-control" />
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="input.password" class="form-control" />
    </div>

    <button class="btn btn-outline-dark" type="submit">Login</button>

    <div class="form-text">
      <p>Username is: {{ input.username }}</p>
      <p>Password is: {{ input.password }}</p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
    };
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