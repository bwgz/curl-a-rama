<template>
    <div v-if="isAuthenticated">
        <ul class="navbar-nav">
          <button class="btn btn-lg btn-icon-only" @click="dologout" id="logout" type="button">
            <img :src="profile.picture" class="avatar bg-info rounded-circle" alt="profile" />
          </button>
        </ul>
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
            this.login().catch(() => this.removeOidcUser());
        },
        dologout() {
            this.logout().catch((error) => console.error(error));
        },
    },
};
</script>

<style scoped>
 .avatar {
    vertical-align: middle;
    width: 30px;
    height: 30px;
    border-radius: 50%;
 }

.btn:hover {
text-decoration: none;
}

</style>