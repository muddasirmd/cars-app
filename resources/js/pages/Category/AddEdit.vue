<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">

                <div class="card text-center">
                    <div class="card-header d-flex">
                        <h5 class="card-title">
                            {{ $route.params.id ? 'Edit' : 'Add' }} Category
                        </h5>
                    </div>
                    <div class="card-body">
                        <ul class="text-danger">
                            <li v-if="error" class="text-start">{{ error }}</li>
                            <li v-if="v$.name.$error" class="text-start"> {{  v$.name.$errors[0].$message }}</li>
                        </ul>

                        <form @submit.prevent="submitForm">
                            <div class="form-group d-flex justify-content-center">
                                <div class="my-auto mx-4"><label for="name">Name:</label></div>
                                
                                <div><input type="text" class="form-control" id="name" v-model="form.name"></div>
                            </div>

                            <button type="submit" class="btn btn-primary m-2">{{ $route.params.id ? 'Update' : 'Save'}}</button>
                            <router-link :to="{ name: 'CategoryList' }" class="btn btn-secondary my-2">Back</router-link>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default ({
    setup() {

        let error = ref('')
        let router = useRouter()
        let route = useRoute()
        let store = useStore()
        let form = ref({ name: '' })

        if (route.params.id) {
            form.value = store.getters.getCategories.filter(category => category.id == route.params.id)[0]
        }

        // Validation Rules
        const rules = computed(() => {
        return {
            name: { required: helpers.withMessage('Name field is required', required), },
        }
        })
        const v$ = useValidate(rules,  form.value)

        const submitForm = async () => {
             // Validate Request
            v$.value.$validate()
            if(v$.value.$errors.length == 0){

                // Edit Record if id exists in url otherwise add new record
                if (route.params.id) {
                    await axios.put('/api/categories/' + route.params.id, form.value).then(res => {

                        if (res.data) {
                            store.dispatch('updateCategory', res.data)
                            // Redirect to Category List Page
                            router.push({ name: 'CategoryList' })
                        }
                    }).catch(err => {
                        error.value = err
                    })
                } else {
                    await axios.post('/api/categories', form.value).then(res => {

                        if (res.data) {
                            store.dispatch('updateCategory', res.data)
                            // Redirect to Category List Page
                            router.push({ name: 'CategoryList' })
                        }
                    }).catch(err => {
                        console.log(err)
                        error.value = err
                    })
                }
        }

        }


        return {
            form,
            error,
            submitForm,
            v$
        }
    },
})
</script>
