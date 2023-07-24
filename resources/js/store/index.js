import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
    state:{
        token: localStorage.getItem('token'),
        user: null,
        categories: JSON.parse(localStorage.getItem('categories')),
        cars: JSON.parse(localStorage.getItem('cars')),
    },
    getters:{
        getToken: (state) => {
            return state.token
        },
        getUser: (state) => {
            return state.user
        },
        getCategories: (state) => {
            return state.categories
        },
        getCars: (state) => {
            return state.cars
        }
    },
    mutations:{
        updateToken: (state, payload) => {
            state.token = payload
            localStorage.setItem('token', payload)
        },
        updateUser: (state, payload) => {
            state.user = payload
        },
        deleteData: (state) => {
            state.token = null
            state.categories = null
            localStorage.removeItem('token')
            localStorage.removeItem('categories')
            localStorage.removeItem('cars')
        },
        /**
         * Category Mutations
         */
        addCategory: (state, payload) => {
            // Add to Store and localstorage
            state.categories = payload
            localStorage.setItem('categories', JSON.stringify(payload))
        },
        editCategory: (state, payload) => {
            // Update category in store (and localstorage) if it exists otherwise add it to the array
            if(state.categories.filter(category => category.id == payload.id).length > 0){
                state.categories.filter(category => {
                    if(category.id == payload.id){
                        category = payload
                    }
                })
            }else{
                state.categories.push(payload)
            }
            localStorage.setItem('categories', JSON.stringify(state.categories))
 
        },
        deleteCategory: (state, id) => {
            // Delete category from both store and localstorage
            state.categories = state.categories.filter(category => category.id != id)
            localStorage.setItem('categories', JSON.stringify(state.categories))
        },
       /**
         * Car Mutations
         */
        addCar: (state, payload) => {
            // Add to Store and localstorage
            state.cars = payload
            localStorage.setItem('cars', JSON.stringify(payload))
        },
        editCar: (state, payload) => {
            // Update Car in store (and localstorage) if it exists otherwise add it to the array
            if(state.cars.filter(car => car.id == payload.id).length > 0){
                state.cars.filter(car => {
                    if(car.id == payload.id){
                        car = payload
                    }
                })
            }else{
                state.cars.push(payload)
            }
            localStorage.setItem('cars', JSON.stringify(state.cars))
 
        },
        deleteCar: (state, payload) => {
            // Delete car from both store and localstorage
            state.cars = state.cars.filter(car => car.id != payload)
            localStorage.setItem('cars', JSON.stringify(state.cars))
        },


    },
    actions:{

        setToken: (context, payload) => {
            context.commit('updateToken', payload)
        },
        removeToken: (context, payload) => {
            context.commit('updateToken', payload)
        },
        setUser: (context, payload) => {
            context.commit('updateUser', payload)
        },        
        fetchCategories: (context, payload) => {

            axios.get("api/categories").then(res => {
                if (res.data) {
                    context.commit('addCategory', res.data)
                }
            }).catch(err => {
                
            });
            
        },        
        fetchCars: (context, payload) => {
            
            axios.get("api/cars").then(res => {
                if (res.data) {
                    context.commit('addCar', res.data)
                }
            }).catch(err => {
                
            });
        },
        clearData: (context, payload) => {
            context.commit('deleteData')
        },  
        /**
        * Category Actions 
        */
        insertCategory: (context, payload) => {
            context.commit('addCategory', payload)
        },        
        updateCategory: (context, payload) => {
            context.commit('editCategory', payload)
        },        
        removeCategory: (context, id) => {
            context.commit('deleteCategory', id)
        },
        /**
        * Car Actions 
        */
        insertCar: (context, payload) => {
            context.commit('addCar', payload)
        },        
        updateCar: (context, payload) => {
            context.commit('editCar', payload)
        },        
        removeCar: (context, payload) => {
            context.commit('deleteCar', payload)
        },

    }
})

export default store