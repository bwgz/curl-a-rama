<script setup>
import Layout from "../components/Layout.vue";

</script>

<template>
  <Layout>
      <template v-slot:default>
          <div class="jumbotron">
              <div class="row">
                  <div class="col-8">
                      <h1 class="display-3">About Curl-A-Rama</h1>
                      <p class="lead">
                          Curl-A-Rama is a world class event center, curling arena and home to championship curling.
                      </p>
                  </div>
                  <div class="col-4">
                      <img class="img-fluid" src="../assets/near-view.png" /></div>
              </div>
          </div>
      </template>
  </Layout>
</template>
