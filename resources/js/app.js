import './bootstrap';

import { createApp } from 'vue';
import router from './router';
import store from './store/index';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue3-easy-data-table/dist/style.css';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import App from "./components/App.vue"

createApp(App)
.use(router)
.use(store)
.component('EasyDataTable', Vue3EasyDataTable)
.mount("#app")