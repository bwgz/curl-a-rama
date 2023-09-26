<template>
    <div v-if="isAuthenticated">
        <div class="collapse navbar-collapse">
            <div class="navbar-nav ml-auto">
                <router-link :to="{ name: 'settings' }">
                    <button
                        type="button"
                        class="btn btn-lg btn-icon-only border-white ml-2 border-0 unstyled-button"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Notifications"
                    >
                        <i class="modus-icons left-icon" aria-hidden="true">settings</i>
                    </button>
                </router-link>
                <div class="dropdown">
                    <button
                        class="btn btn-lg btn-icon-only rounded-circle border-white ml-2 border-0 p-2 unstyled-button"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <img
                            :src="profile.picture"
                            class="rounded-circle"
                            width="32"
                            height="32"
                            alt="Avatar"
                            loading="lazy"
                        />
                    </button>

                    <div class="dropdown-menu dropdown-menu-right">
                        <a @click="dologout()" class="dropdown-item" href="#">Sign Out</a>
                    </div>
                </div>
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
