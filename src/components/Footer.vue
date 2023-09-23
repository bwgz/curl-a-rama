<template>
    <div class="jumbotron bg-trimble-blue-dark text-white">
        <div class="row">
            <div class="col-5">
                <p>
                    Curling is a team sport, played on ice, where two teams take it in turns to slide stones made of
                    granite towards a target – known as a House. It is an Olympic and Paralympic winter sport with medal
                    disciplines for Women’s, Men’s, Mixed Doubles and mixed Wheelchair teams.
                </p>
                <p>Built: {{ buildDate }}</p>
            </div>
            <div class="col-1"></div>

            <div class="col-3">
                <div class="list-group">
                    <p class="">About Us</p>
                    <a href="https://bwgz.github.io" class="text-white" aria-current="true"> Who We Are </a>
                </div>
            </div>
            <div class="col-3">
                <div class="list-group">
                    <p class="">Help</p>
                    <a href="https://bwgz.github.io" class="text-white" aria-current="true"> Help Center </a>
                    <a href="https://bwgz.github.io" class="text-white" aria-current="true"> Contact Us </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const buildDate = import.meta.env.VITE_BUILD_DATE ? import.meta.env.VITE_BUILD_DATE : new Date().toISOString();

export default {
    name: "Footer",
    setup() {
        return { buildDate };
    },
};
</script>
