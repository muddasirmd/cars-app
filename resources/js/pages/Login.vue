<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">

                <h2>Login</h2>

                <p class="text-danger" v-if="error"> {{ error }}</p>
                <p class="text-danger" v-if="v$.email.$error"> {{  v$.email.$errors[0].$message }}</p>
                <p class="text-danger" v-if="v$.password.$error"> {{  v$.password.$errors[0].$message }}</p>

                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email Address:</label>
                        <input type="email" class="form-control" id="email" v-model="form.email" >
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" v-model="form.password" >
                    </div>
                    <button type="submit" class="btn btn-primary my-2">Login</button>
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
import { required, email, helpers } from '@vuelidate/validators'

export default ({
    setup() {

        let router = useRouter()
        let store = useStore()
        let error = ref('')

        let form = ref({
            email: '',
            password: ''
        })
        // Validation Rules
        const rules = computed(() => {
        return {
            email: { required: helpers.withMessage('Email is required', required), },
            password: { required: helpers.withMessage('Password is required', required), },
        }
        })

        const v$ = useValidate(rules,  form.value)

        const login = async() => {
 
            // Validate Request
            v$.value.$validate()
            if(v$.value.$errors.length == 0){
                await axios.post('api/login', form.value).then(res => {
                if(res.data.success){
                    // Store Token and User data in the store
                    store.dispatch('setToken', res.data.data.token)
                    store.dispatch('setUser', res.data.data.name)
                    store.dispatch('fetchCategories')
                    store.dispatch('fetchCars')
                    // Redirect to Dashboard Page after login
                    router.push({name: 'Dashboard'})
                }else{
                    error.value = res.data.message
                }
            }).catch(err => {
                error.value = err
            })
            }
        }

        return {
            form,
            error,
            login,
            v$
        }
    },
})
</script>
