import {createRouter, createWebHistory} from 'vue-router';

import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Dashboard from './pages/Dashboard.vue'
import CategoryList from './pages/Category/List.vue'
import CategoryAddEdit from './pages/Category/AddEdit.vue'
import CarList from './pages/Car/List.vue'
import CarAddEdit from './pages/Car/AddEdit.vue'

import store from './store/index'

const routes = [
    {
        path: '/',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
            requiresAuth: true
        }
    },
    /**
     * Authentication Routes
     */
    {
        path: '/login',
        component: Login,
        name: 'Login',
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'Register',
        meta: {
            requiresAuth: false
        }
    },
    /**
     * Categories Routes
     */ 
    {
        path: '/categories',
        component: CategoryList,
        name: 'CategoryList',
        meta: {
            requiresAuth: true
        }
    },    
    {
        path: '/category',
        component: CategoryAddEdit,
        name: 'CategoryAdd',
        meta: {
            requiresAuth: true
        }
    },    
    {
        path: '/category/:id',
        component: CategoryAddEdit,
        name: 'CategoryEdit',
        meta: {
            requiresAuth: true
        }
    },

    /**
     * Cars Routes
     */
    {
        path: '/cars',
        component: CarList,
        name: 'CarList',
        meta: {
            requiresAuth: true
        }
    },    
    {
        path: '/car',
        component: CarAddEdit,
        name: 'CarAdd',
        meta: {
            requiresAuth: true
        }
    },    
    {
        path: '/car/:id',
        component: CarAddEdit,
        name: 'CarEdit',
        meta: {
            requiresAuth: true
        }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// If authentication requires and token in not set then redirect to Login Page
// Else if authentication requires and token is set then redirect to Dashboard
router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && !store.getters.getToken){
        return { name : 'Login'}
    }    
    // if(to.meta.requiresAuth == false && localStorage.getItem('token')){
    //     return { name : 'Dashboard'}
    // }
})
export default router;