<script setup>
import { ref } from "vue";
const now = ref(new Date().toISOString());
</script>

<template>
    <header>
        <div class="modus-layout">
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
                    <a class="nav-link s-2 d-inline-flex" href="/login">
                        <button id="signin" type="button" class="btn btn-primary">Sign In</button>
                    </a>
                </div>
            </nav>
            <div class="jumbotron">
                <h1 class="display-3">Hello World @ {{ now }}</h1>
                <p class="lead">
                    This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
                    featured content or information.
                </p>
                <hr class="my-4" />
                <p>
                    It uses utility classes for typography and spacing to space content out within the larger container.
                </p>
                <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </div>
            <div class="jumbotron bg-trimble-blue-dark text-white">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            Curling is a team sport, played on ice, where two teams take it in turns to slide stones
                            made of granite towards a target – known as a House. It is an Olympic and Paralympic winter
                            sport with medal disciplines for Women’s, Men’s, Mixed Doubles and mixed Wheelchair teams.
                        </div>
                        <div class="col-3">
                            <div class="list-group">
                                <p class="">About Us</p>
                                <a href="#" class="" aria-current="true"> Careers </a>
                                <a href="#" class="" aria-current="true"> Blog </a>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="list-group">
                                <p class="">Help</p>
                                <a href="#" class="" aria-current="true"> Help Center </a>
                                <a href="#" class="" aria-current="true"> Forums </a>
                                <a href="#" class="" aria-current="true"> Training </a>
                                <a href="#" class="" aria-current="true"> Contact Us </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
