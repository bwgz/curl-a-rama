<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
    components: {
        Header,
        Footer,
    }
};
</script>

<template>
    <div>
        <Header />
        <main class="main-slot">
            <slot></slot>
        </main>
        <Footer />
    </div>
</template>

<style scoped></style>
