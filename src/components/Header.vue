<script setup>
import UserHeader from "./UserHeader.vue";
</script>

<template>
    <nav class="navbar navbar-expand-sm modus-header">
        <router-link :to="{ name: 'home' }" class="text-decoration-none">
            <a class="navbar-brand">
                <img
                    src="https://www.svgrepo.com/show/127900/olympic-curling-silhouette.svg"
                    width="30"
                    height="30"
                    class="img-fluid d-none d-sm-block"
                    alt="home"
                />
                <img
                    src="https://www.svgrepo.com/show/127900/olympic-curling-silhouette.svg"
                    width="30"
                    height="30"
                    class="d-block d-sm-none"
                    alt="home"
                />
            </a>
        </router-link>
        <div class="navbar-text text-truncate navbar-brand mr-auto">
            <router-link :to="{ name: 'home' }" class="text-decoration-none">
                <span class="h1 text-dark m-0" style='font-family: "Open Sans" font-weight: 600'>Curl-A-Rama</span>
            </router-link>
        </div>
        <UserHeader />
    </nav>
</template>

<style scoped>
.unstyled-button {
    outline: none;
    border: none;
    outline: none;
    background: none;
}

.unstyled-button:focus {
    border: none;
    outline: none;
    background: none;
    box-shadow: 0 0 0 0;
}
</style>
