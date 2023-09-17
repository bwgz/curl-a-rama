<script setup>
import { ref } from 'vue'
const now = ref(new Date().toISOString())

</script>

<template>
  <header>

    <div class="wrapper">
      <h1>Hello World @ {{ now }}</h1>
      <nav>
      </nav>
    </div>
  </header>

</template>

