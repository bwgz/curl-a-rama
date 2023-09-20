<template>
  <div v-if="oidcIsAuthenticated">
    <div v-html="userDisplay"></div>
  </div>
  <div v-else>
    <button class="btn btn-primary" @click="reauthenticate" id="signin" type="button" >Sign In</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useOidc from "../store";

export default {
  name: "SignedInUser",
  computed: {
    ...mapState(useOidc, [
      "oidcIsAuthenticated",
      "oidcAuthenticationIsChecked",
      "oidcUser",
      "oidcIdToken",
      "oidcIdTokenExp",
    ]),
    userDisplay: function () {
      return this.oidcUser.given_name;
    },
  },
  methods: {
    ...mapActions(useOidc, ["authenticateOidc", "removeOidcUser"]),
    reauthenticate() {
      console.log("this", this);
      this.authenticateOidc().catch(() => this.removeOidcUser());
    },
  },
};
</script>
