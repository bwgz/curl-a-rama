<template>
    <div v-if="isAuthenticated">
        <div class="container-fluid">
            <ul class="navbar-nav">
                <!-- Avatar -->
                <li class="nav-item dropdown">
                    <a
                        @click="toggle()"
                        class="nav-link dropdown-toggle d-flex align-items-center"
                        href="#"
                        role="button"
                        aria-expanded="false"
                    >
                        <img :src="profile.picture" class="rounded-circle" height="30" alt="Avatar" loading="lazy" />
                    </a>
                    <ul
                        class="dropdown-menu-right dropdown-menu dropdown-menu-lg-end"
                        :class="{ show: isActive }"
                        aria-labelledby="navbarDropdownMenuLink"
                    >
                        <li>
                            <a @click="dologout()" class="dropdown-item" href="#">Sign Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div v-else>
        <button class="btn btn-primary" @click="dologin" id="login" type="button">Sign In</button>
    </div>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from "pinia";
import { useUser } from "../store";

export default {
    name: "SignedInUser",
    setup() {
        const isActive = ref(false);
        return { isActive };
    },
    created() {
        window.addEventListener("click", (e) => {
            if (!this.$el.contains(e.target)) {
                this.isActive = false;
            }
        });
    },
    computed: {
        ...mapState(useUser, ["profile", "isAuthenticated"]),
        userDisplay: function () {
            return this.profile.given_name;
        },
    },
    methods: {
        toggle() {
            this.isActive = !this.isActive;
        },
        ...mapActions(useUser, ["login", "logout"]),

        dologin() {
            this.login().catch((error) => console.error(error));
        },
        dologout() {
            this.isActive = false;
            this.logout().catch((error) => console.error(error));
        },
    },
};
</script>

