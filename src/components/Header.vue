<script setup>
import SignIn from '../components/SignIn.vue'
</script>

<template>
    <nav class="navbar navbar-expand-sm flex-nowrap modus-header">
        <a class="navbar-brand">
            <img
                src="https://www.svgrepo.com/show/127900/olympic-curling-silhouette.svg"
                width="25"
                height="25"
                class="img-fluid d-none d-sm-block"
                alt="home"
            />
            <img
                src="https://www.svgrepo.com/show/127900/olympic-curling-silhouette.svg"
                class="d-block d-sm-none"
                height="25"
                width="25"
                alt="home"
            />
        </a>
        <div class="navbar-text text-truncate">
            <span class="h1 text-dark m-0" style="font-family: &quot;Open Sans&quot;; font-weight: 600"
                >Curl-A-Rama</span
            >
        </div>
        <div class="ml-auto navbar-nav">
            <a class="nav-link s-2 d-inline-flex">
                <SignIn />
            </a>
        </div>
    </nav>
</template>
