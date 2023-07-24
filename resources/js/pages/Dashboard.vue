<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">
                <div class="card text-center">
                    <div class="card-header">
                        <h5 class="card-title">Registered Cars</h5>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ $store.getters.getCars ? $store.getters.getCars.length : 0  }}</h5>
                    </div>
                    <div class="card-footer text-muted">
                        <router-link class="btn btn-primary" :to="{name: 'CarList'}">Car List</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default({
    setup() {
        
    },
})
</script>
