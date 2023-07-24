<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="mt-4">
                <div class="card text-center">
                    <div class="card-header d-flex">
                        <h5 class="card-title mt-auto">Cars</h5>

                        <router-link class="btn btn-primary" style="margin-left: auto;" :to="{ name: 'CarAdd' }">Add
                            Car</router-link>
                    </div>
                    <div class="card-body">
                        <div class="d-flex">
                            <div>
                                <span>Search field:</span>
                                <select v-model="searchField">
                                    <option>make</option>
                                    <option>model</option>
                                    <option>year</option>
                                    <option>category</option>
                                    <option>registration_no</option>
                                </select>
                            </div>
                            <div class="mx-3">
                                <span>Search value: </span>
                                <input type="text" v-model="searchValue">
                            </div>
                        </div>

                        <div class="mt-3">
                            <EasyDataTable alternating buttons-pagination show-index :rows-per-page="10" :headers="headers"
                                :items="$store.getters.getCars" :search-field="searchField" :search-value="searchValue">
                                <template #item-operation="item">
                                    <router-link class="btn btn-primary m-2"
                                        :to="{ name: 'CarEdit', params: { id: item.id } }">Edit</router-link>
                                    <button class="btn btn-danger" @click="deleteCar(item.id)">Delete</button>
                                </template>
                            </EasyDataTable>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default ({
    setup() {
        let store = useStore();
        let error = ref("");
        let cars = ref(store.getters.getCars);

        const deleteCar = (id) => {
            if (confirm("Are you sure you want to delete this car?")) {
                axios.delete("api/cars/" + id).then(res => {
                    store.dispatch("removeCar", id);
                }).catch(err => {
                    error.value = err;
                });
            }
        };

        /**
         * Datatable
         */
        const searchField = ref("");
        const searchValue = ref("");
        const headers = ref([
            { text: "Make", value: "make" },
            { text: "Category", value: "category.name" },
            { text: "Model", value: "model" },
            { text: "Color", value: "color", sortable: true },
            { text: "Year", value: "year", sortable: true },
            { text: "Registration No.", value: "registration_no", sortable: true },
            { text: "Operation", value: "operation" },
        ]);

        return {
            error,
            cars,
            deleteCar,
            headers,
            searchField,
            searchValue
        };
    },
})
</script>