<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" :to="{name: 'Dashboard'}">Car App</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100">
          <li v-if="$store.getters.getToken" class="nav-item active">
            <router-link class="nav-link" :to="{name: 'Dashboard'}">Dashboard</router-link>
          </li>          
          <li v-if="$store.getters.getToken" class="nav-item">
            <router-link class="nav-link" :to="{name: 'CategoryList'}">Categories</router-link>
          </li>          
          <li v-if="$store.getters.getToken" class="nav-item">
            <router-link class="nav-link" :to="{name: 'CarList'}">Cars</router-link>
          </li>
          <li v-if="$store.getters.getToken" class="nav-item mx-auto">
            <label class="navbar-text text-white text-capitalize ">{{ $store.getters.getUser }}</label>
          </li>
          <li v-if="!$store.getters.getToken" class="nav-item">
            <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
          </li>
          <li v-if="!$store.getters.getToken" class="nav-item">
            <router-link class="nav-link" :to="{name : 'Register'}">Register</router-link>
          </li>
          <li v-if="$store.getters.getToken" class="nav-item" style="margin-left: auto;">
            <button class="nav-link" @click="logout">Logout</button>
          </li>          

        </ul>

      </div>
    </nav>
    
    <router-view></router-view>
</template>

<script>

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default({
    setup() {
       
        const router = useRouter()
        const store = useStore()

        function logout(){
            // store.dispatch('removeToken', null)
            store.dispatch('clearData')
            router.push({name:'Login'})
        }

        return {
            logout
        }
    },
})
</script>
