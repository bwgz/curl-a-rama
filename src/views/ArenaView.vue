<script setup>
import { storeToRefs } from "pinia";

import { useCurling } from "../store";
import Layout from "../components/Layout.vue";
import Arena from "../components/Arena.vue";

const store = useCurling();
const { teams } = storeToRefs(store);

</script>

<template>
    <Layout>
        <template v-slot:default>
            <Arena v-bind:teams="teams"/>
        </template>
    </Layout>
</template>
