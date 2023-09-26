<script setup>
import UserHeader from "./UserHeader.vue";
</script>

<template>
    <nav class="navbar navbar-expand-sm flex-nowrap modus-header">
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
        <div class="navbar-text text-truncate">
            <router-link :to="{ name: 'home' }" class="text-decoration-none">
                <span class="h1 text-dark m-0" style='font-family: "Open Sans" font-weight: 600'>Curl-A-Rama</span>
            </router-link>
        </div>
        <div class="ml-auto navbar-nav">
            <a class="nav-link d-inline-flex p-0">
                <UserHeader />
            </a>
        </div>
    </nav>
</template>
