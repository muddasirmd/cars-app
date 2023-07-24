<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">

                <div class="card text-center">
                    <div class="card-header d-flex">
                        <h5 class="card-title">{{ $route.params.id ? 'Edit' : 'Add' }} Car</h5>
                    </div>
                    <div class="card-body">
                         <ul class="text-danger">
                            <li v-if="error" class="text-start">{{ error }}</li>
                            <li v-if="v$.year.$error" class="text-start"> {{  v$.year.$errors[0].$message }}</li>
                            <li v-if="v$.category_id.$error" class="text-start"> {{  v$.category_id.$errors[0].$message }}</li>
                        </ul>
                    
                        <form @submit.prevent="submitForm">
                            <div class="form-group d-flex justify-content-center my-2">
                                <div class="my-auto col-6"><label for="category">Category:</label></div>
                                <div class="col-6">
                                    <select class="form-control" v-model="form.category_id">
                                        <option disabled value="">Please select one</option>
                                        <option v-for="category in $store.getters.getCategories" :key="category.name"
                                            :value="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group d-flex justify-content-center my-2">
                                <div class="my-auto col-6"><label for="name">Make:</label></div>
                                <div class="col-6"><input type="text" class="form-control" id="name" v-model="form.make"></div>
                            </div>
                            <div class="form-group d-flex justify-content-center my-2">
                                <div class="my-auto col-6"><label for="name">Model:</label></div>
                                <div class="col-6"><input type="text" class="form-control" id="name" v-model="form.model"></div>
                            </div>
                            <div class="form-group d-flex justify-content-center my-2">
                                <div class="my-auto col-6"><label for="name">Color:</label></div>
                                <div class="col-6"><input type="text" class="form-control" id="name" v-model="form.color"></div>
                            </div>
                            <div class="form-group d-flex justify-content-center my-2">
                                <div class="my-auto col-6"><label for="name">Year:</label></div>
                                <div class="col-6"><input type="text" class="form-control" id="name" v-model="form.year"></div>
                            </div>
                            <div class="form-group d-flex justify-content-center my-2">
                                <div class="my-auto col-6"><label for="name">Registration No.:</label></div>
                                <div class="col-6"><input type="text" class="form-control" id="name" v-model="form.registration_no"></div>
                            </div>
                            <div class="form-group my-2">
                                <button type="submit" class="btn btn-primary ">{{ $route.params.id ? 'Update' : 'Save'
                                }}</button>
                                <router-link :to="{ name: 'CarList' }" class="btn btn-secondary m-2">Back</router-link>
                            </div>

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
import { required, numeric, helpers } from '@vuelidate/validators'

export default ({
    setup() {

        let error = ref('')
        let router = useRouter()
        let route = useRoute()
        let store = useStore()
        let form = ref({ make: '', category_id: '', model: '', year: '', registration_no: '' })
        
        // Populate form values in case of Edit
        if (route.params.id) {
            form.value = store.getters.getCars.filter(car => car.id == route.params.id)[0]
        }

        // Validation Rules
        const rules = computed(() => {
        return {
            category_id: { required: helpers.withMessage('Select a category', required), },
            year: { numeric: helpers.withMessage('Enter a valid year value', numeric), },
        }
        })
        const v$ = useValidate(rules,  form.value)

        const submitForm = async () => {

             // Validate Request
            v$.value.$validate()
            if(v$.value.$errors.length == 0){
                // Edit Record if id exists in url otherwise add new record
                if (route.params.id) {
                    await axios.put('/api/cars/' + route.params.id, form.value).then(res => {

                        if (res.data) {
                            store.dispatch('updateCar', res.data)
                            // Redirect to Car List Page
                            router.push({ name: 'CarList' })
                        }
                    }).catch(err => {
                        console.log(err)
                        error.value = err
                    })
                }
                 else {
                    await axios.post('/api/cars', form.value).then(res => {

                        if (res.data) {
                            store.dispatch('updateCar', res.data)
                            // Redirect to Car List Page
                            router.push({ name: 'CarList' })
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
