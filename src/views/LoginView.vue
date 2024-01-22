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


        <div class="container">
            
            <div class="card">
                <h2 class="login-title">Login</h2>
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                    <div class="form-group">
                        <Field name="username" type="text" class="form-control" placeholder="Username" :class="{ 'is-invalid': errors.username }" />
                        <div class="invalid-feedback">{{errors.username}}</div>
                        <i class = 'bx bxs-user'></i>
                    </div>            
                    <div class="form-group">
                        <Field name="password" type="password" class="form-control" placeholder="Password" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{errors.password}}</div>
                        <i class = 'bx bxs-lock-alt'></i>
                    </div>            

                    <div class="remember-forgot">
                        <label><input type="checkbox"> Remember me</label>
                        <a href="#">Forgot password?</a>

                    </div>

                    <div class="form-group btn-login">
                        <button class="btn btn-primary" :disabled="isSubmitting">
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Login</button>
                    </div>
                    <div class="register-link">
                        <p> Don't have an account? <a href="#">Register</a></p>
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
    font-family: 'Amatic SC', cursive;
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

.login-title {
    text-align: center; /* Center the title */
    font-size: 30px; /* Set the font size */
    font-weight: 800;
    margin-bottom: 20px; /* Adjust margin as needed */
    /* Add any additional styles as needed */
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
    font-family: 'Amatic SC', cursive;
}

/* Card styling */
.card {
    width: 400px;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.2); /* Set a translucent white background */
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    text-align: center;

    /* Apply the backdrop filter for blur */
    backdrop-filter: blur(8px); /* Adjust the blur radius as needed */
    -webkit-backdrop-filter: blur(8px); /* For Safari */
}



/* Login title */
h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 900;
    font-family: 'Amatic SC', cursive;
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


.form-group input[name="username"],
.form-group input[name="password"] {
    width: 100%;
    padding: 8px 14px;
    border: 1px solid #ccc;
    border-radius: 20px; /* Adjust border-radius as needed */
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Amatic SC', cursive;
    /* Apply backdrop filter for blur */
    background-color: rgba(255, 255, 255, 0.1); /* Set a translucent white background */
    backdrop-filter: blur(8px); /* Adjust the blur radius as needed */
    -webkit-backdrop-filter: blur(8px); /* For Safari */
}

.invalid-feedback {
    color: red;
    font-size: 14px;
    margin-top: 4px;
}

.btn-login button {
    background-color: #fff; /* Set the background color to white */
    color: #333; /* Set the text color */
    width: 90%; /* Set the width to 50% of the parent container */
    padding: 12px 0; /* Adjust button padding */
    font-size: 14px; /* Set the font size to 14px */
    border: 1px solid #ccc; /* Add a border for better visibility */
    border-radius: 20px; /* Add border-radius for a rounded look */
    font-weight: 700;
}

.btn-login button:hover {
    background-color: #f2f2f2; /* Set a slightly darker color on hover */
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
.remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.remember-forgot label {
    margin: 0; /* Remove default margin */
}

.remember-forgot a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
}

.remember-forgot a:hover {
    text-decoration: underline;
}

.register-link {
    font-size: 14px; /* Adjust the font size as needed */
    margin-top: 10px; /* Add some top margin for spacing */
}

.register-link a {
    text-decoration: none;
    font-weight: 600;
}

.register-link a:hover {
    text-decoration: underline;
}


</style>