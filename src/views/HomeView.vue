<script setup>
import Layout from "../components/Layout.vue";

</script>

<template>
    <Layout>
        <template v-slot:default>
            <SignedInUser />

            <div class="jumbotron">
                <div class="row">
                    <div class="col-8">
                        <h1 class="display-3">Curl-A-Rama</h1>
                        <p class="lead">
                            Curl-A-Rama is a world class event center, curling arena and home to championship curling.
                        </p>
                        <hr class="my-4" />
                        <p>Let's go to the arena and see all the action.</p>
                        <router-link :to="{ name: 'arena' }">
                            <a class="btn btn-primary btn-lg" href="#" role="button">Enter the Arena</a>
                        </router-link>
                    </div>
                    <div class="col-4">
                        <img class="img-fluid" src="../assets/near-view.png" /></div>
                </div>
            </div>
            <div class="jumbotron bg-white">
                <div class="row">
                    <div class="col-4">
                        <img class="img-fluid" src="../assets/side-view.png" />
                    </div>
                    <div class="col-8">
                        <h1 class="display-3">Get Ready To Rock</h1>
                        <p class="lead">
                            A draw is a scoring shot, or any shot that is sent into scoring position without touching
                            any other stones on the way. It is designed to stop inside of the house for a point.
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>
