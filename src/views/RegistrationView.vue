<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password1: Yup.string().required('Password is required'),
    password2: Yup.string().required('Password is required'),
});

// ADD VALIDATION CHECK IF PASSWORD 
async function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password1, password2 } = values;

    if(password1 == password2 && username) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              username: username,
              password: password1,
              role: 'user'
             })
        };
        const response = await fetch("http://localhost:5000/register", requestOptions);
        const data = await response.json();


        console.log('cherafkred', data.status);
        if(data.status == 'ERROR') {
            
        }
        } else {
            return authStore.login(username, password1, password2)
            .catch(error => setErrors({ apiError: error }));
        }
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
                <h2 class="login-title">Registration</h2>
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                    <div class="form-group">
                        <Field name="username" type="text" class="form-control" placeholder="Username" :class="{ 'is-invalid': errors.username }" />
                        <div class="invalid-feedback">{{errors.username}}</div>
                        <i class = 'bx bxs-user'></i>
                    </div>            
                    <div class="form-group">
                        <Field name="password1" type="password" class="form-control" placeholder="Password" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{errors.password}}</div>
                        <i class = 'bx bxs-lock-alt'></i>
                    </div>    
                    
                    <div class="form-group">
                        <Field name="password2" type="password" class="form-control" placeholder="Confirm Password" :class="{ 'is-invalid': errors.password }" />
                        <div class="invalid-feedback">{{errors.password}}</div>
                        <i class = 'bx bxs-lock-alt'></i>
                    </div>

                    <div class="form-group btn-login">
                        <button class="btn btn-primary" :disabled="isSubmitting">
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Create Account</button>
                    </div>
                    <div class="register-link">
                        <p> Already have an account? <a href="/login">Login</a></p>
                    </div>

                    <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>

                </Form>
            </div>
        </div>
    </div>
</template>

<style>
.layout[data-v-7a7a37b1]{
    position:static;
    z-index: -1;
    background-image: url(../assets/shutterstock_593894891.jpg);
    height: 100%;
}

</style>

<style scoped>




body{
    background-color:white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
    font-size: 25px; /* Set the font size */
    font-weight: 400;
    margin-bottom: 60px; /* Adjust margin as needed */
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
    margin-top: 100px;
    height: 100vh;
    padding-top: 50px; /* Add padding to create space from the top */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Card styling */
.card {
    width: 600px;
    height: 500px;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.164); /* Set a translucent white background */
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.233);
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
    font-weight: 400;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: whitesmoke; /* Title color */
}

/* Form and text input styling */
.form-group {
    margin-bottom: 20px;
    border: none;
}

label {
    color: white;
    display: block;
    margin-bottom: 6px;
    font-weight: 400;
    font-size: 15px;
}


.form-group input[name="username"],
.form-group input[name="password1"] {
    width: 100%;
    padding: 8px 14px;  
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px; /* Adjust border-radius as needed */
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* Apply backdrop filter for blur */
    background-color: rgba(255, 255, 255, 0.1); /* Set a translucent white background */
    backdrop-filter: blur(8px); /* Adjust the blur radius as needed */
    -webkit-backdrop-filter: blur(8px); /* For Safari */
    color: whitesmoke;
}

.form-group input[name="password2"] {
    width: 100%;
    padding: 8px 14px;  
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px; /* Adjust border-radius as needed */
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* Apply backdrop filter for blur */
    background-color: rgba(255, 255, 255, 0.1); /* Set a translucent white background */
    backdrop-filter: blur(8px); /* Adjust the blur radius as needed */
    -webkit-backdrop-filter: blur(8px); /* For Safari */
    color: whitesmoke;
}

::placeholder{
    color: rgba(245, 245, 245, 0.767);
}
.invalid-feedback {
    color: rgb(221, 3, 3);
    font-size: 14px;
    font-weight: 200;
    margin-top: 4px;
}

.btn-login button {
    background-color: #ec0000; /* Set the background color to white */
    color: #ffffff; /* Set the text color */
    width: 90%; /* Set the width to 50% of the parent container */
    padding: 12px 0; /* Adjust button padding */
    font-size: 14px; /* Set the font size to 14px */
    border-radius: 20px; /* Add border-radius for a rounded look */
    font-weight: 600;
}

.btn-login button:hover {
    background-color: #800505; /* Set a slightly darker color on hover */
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
    margin-bottom: 70px;
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
    color: white;
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