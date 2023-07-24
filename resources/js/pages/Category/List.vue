<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="mt-4">
                <div class="card text-center">
                    <div class="card-header d-flex">
                        <h5 class="card-title mt-auto">Categories</h5>
                        <router-link class="btn btn-primary" style="margin-left: auto;" :to="{ name: 'CategoryAdd' }">Add Category</router-link>
                    </div>
                    <div class="card-body">
                        <div class="d-flex">
                            <div>
                                <span>Search field:</span>
                                <select v-model="searchField">
                                    <option>name</option>
                                </select>
                            </div>
                            <div class="mx-3">
                                <span>Search value: </span>
                                <input type="text" v-model="searchValue">
                            </div>
                        </div>

                        <div class="mt-3">
                            <EasyDataTable 
                            alternating 
                            buttons-pagination 
                            show-index 
                            :rows-per-page="10" 
                            :headers="headers"
                            :items="$store.getters.getCategories" 
                            :search-field="searchField" 
                            :search-value="searchValue">
                                <template #item-operation="item">
                                    <router-link class="btn btn-primary m-2"
                                            :to="{ name: 'CategoryEdit', params: { id: item.id } }">Edit</router-link>
                                        <button class="btn btn-danger" @click="deleteCategory(item.id)">Delete</button>
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
        let categories = ref(store.getters.getCategories);

        const deleteCategory = (id) => {
            if (confirm("Are you sure you want to delete this category?")) {
                axios.delete("api/categories/" + id).then(res => {
                    store.dispatch("removeCategory", id);
                }).catch(err => {
                    error.value = err;
                });
            }
        };

        /**
        * Datatable
        */
        const searchField = ref("name");
        const searchValue = ref("");
        const headers = ref([
            { text: "Name", value: "name", width: 1000 },
            { text: "Operation", value: "operation" },
        ]);


        return {
            error,
            categories,
            deleteCategory,
            searchField,
            searchValue,
            headers,

        };
    },
})
</script>