<template>
    <div v-if="isAuthenticated">
        <button type="button" class="btn btn-lg btn-icon-only btn-text-dark ml-2 p-2" data-toggle="tooltip"
         data-placement="bottom" title="Applications">
        <svg width="32" height="32" fill="currentColor">
          <use xlink:href="/modus-solid-icons.svg#apps" /></svg>
      </button>

        <div class="dropdown">
            <button
                class="btn btn-md btn-icon-only p-0 unstyled-button"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <img :src="profile.picture" class="rounded-circle" height="30" alt="Avatar" loading="lazy" />
            </button>

            <div class="dropdown-menu dropdown-menu-right">
                <router-link :to="{ name: 'settings' }" class="dropdown-item"> Settings </router-link>
                <hr class="dropdown-divider" />
                <a @click="dologout()" class="dropdown-item" href="#">Sign Out</a>
            </div>
        </div>
    </div>
    <div v-else>
        <button class="btn btn-primary" @click="dologin" id="login" type="button">Sign In</button>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useUser } from "../store";

export default {
    name: "SignedInUser",
    computed: {
        ...mapState(useUser, ["profile", "isAuthenticated"]),
        userDisplay: function () {
            return this.profile.given_name;
        },
    },
    methods: {
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

<style scoped>
.unstyled-button {
    outline: none;
    border: none;
    outline: none;
    background: none;
}

.unstyled-button:focus {
    border: none;
    outline: none;
    background: none;
    box-shadow: 0 0 0 0;
}
</style>
