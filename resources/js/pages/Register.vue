<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">

                <h2>Register</h2>

                <ul class="text-danger" v-if="errors">
                    <li v-for="(error, key) in errors" :key="key">{{ error[0] }}</li>
                </ul>
                <p class="text-danger" v-if="v$.email.$error"> {{  v$.email.$errors[0].$message }}</p>
                <p class="text-danger" v-if="v$.password.$error"> {{  v$.password.$errors[0].$message }}</p>
                <p class="text-danger" v-if="v$.confirm_password.$error"> {{  v$.confirm_password.$errors[0].$message }}</p>

                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" id="name" v-model="form.name">
                    </div>                    
                    <div class="form-group">
                        <label for="email">Email Address:</label>
                        <input type="email" class="form-control" id="email" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" v-model="form.password">
                    </div>                    
                    <div class="form-group">
                        <label for="confirm_password">Confirm Password:</label>
                        <input type="password" class="form-control" id="confirm_password" v-model="form.confirm_password">
                    </div>
                    <button type="submit" class="btn btn-primary my-2">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useValidate from '@vuelidate/core'
import { required, email, sameAs , helpers } from '@vuelidate/validators'

export default ({
    setup() {

        let errors = ref('')
        let router = useRouter()
        let store = useStore()

        let form = ref({
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        })
        // Validation Rules
        const rules = computed(() => {
        return {
            email: { required: helpers.withMessage('Email is required', required), },
            password: { required: helpers.withMessage('Password is required', required), },
            confirm_password: { required: helpers.withMessage('Confirm Password is required', required),
                                sameAs: sameAs(form.value.password)},
        }
        })

        const v$ = useValidate(rules,  form.value)

        const register = async() => {
            
            // Validate Request
            v$.value.$validate()
            if(v$.value.$errors.length == 0){
                await axios.post('api/register', form.value).then(res => {
                    if(res.data.success){
                        // Store Token and User data in the store
                        store.dispatch('setToken', res.data.data.token)
                        store.dispatch('setUser', res.data.data.name)
                        // Redirect to Dashboard Page after Registration
                        router.push({name: 'Dashboard'})
                    }else{
                        errors.value = res.data.message
                    }
                }).catch(err => {
                    errors.value = err
                })
        }
        }


        return {
            form,
            errors,
            register,
            v$
        }
    },
})
</script>
