<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;

    return authStore.login(username, password)
        .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
    <div>
        <!-- <div class="alert alert-info">
            Username: test<br />
            Password: test
        </div> -->
        <h2>Login</h2>

        <div class="container">
            <div class="card">
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                    <div class="form-group">
                        <label>Username</label>
                        <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                        <div class="invalid-feedback">{{errors.username}}</div>
                    </div>            
                    <div class="form-group">
                        <label>Password</label>
                        <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{errors.password}}</div>
                    </div>            
                    <div class="form-group btn-login">
                        <button class="btn btn-primary" :disabled="isSubmitting">
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Login</button>
                    </div>
                    <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
                </Form>
            </div>
        </div>
    </div>
</template>


<style scoped>

body {
    background-color: #f4f4f4; /* or use a subtle gradient */
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}


.alert {
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
}

.alert-danger {
    background-color: #ffcccc;
    color: #cc0000;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-container {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Container to position the card higher and center it horizontally */
.container {
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Position items at the start (top) of the container */
    height: 100vh;
    padding-top: 50px; /* Add padding to create space from the top */
    font-family: 'Arial', sans-serif; /* Change font to Arial */
}

/* Card styling */
.card {
    width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adjust the shadow as needed */
    font-size: 18px; /* Increase font size */
}

/* Login title */
h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: #fff; /* Title color */
}

/* Form and text input styling */
.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: 400;
    font-size: 15px;
}

.form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
}

.invalid-feedback {
    color: red;
    font-size: 14px;
    margin-top: 4px;
}

.btn-login{
    text-align: center;
}

/* Login button styling */
button {
    padding: 12px 0; /* Adjust button padding */
    font-size: 15px; /* Increase button font size */
    border: none;
    border-radius: 4px;
    background-color: #ff3333; /* Red button color */
    color: #fff;
    cursor: pointer;
    width: 30%; /* Make the button 30% wide */
    margin: 0 auto; /* Center the button horizontally */
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}


</style>