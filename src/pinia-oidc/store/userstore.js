import { defineStore } from "pinia";
import { UserManager } from "oidc-client-ts";

const NO_USER = {
    profile: null,
    error: null,
    isLoading: false,
};

export const createUserStore = (settings) => {
    const userManager = new UserManager(settings);

    const reset = (state) => {
        state.profile = NO_USER.profile;
        state.error = NO_USER.error;
        state.isLoading = NO_USER.isLoading;
    }

    const store = defineStore("user", {
        state: () => {
            if (localStorage.getItem("user")) return JSON.parse(localStorage.getItem("user"));
            return NO_USER;
        },
        actions: {
            async login() {
                this.isLoading = true;
                await userManager.signinRedirect();
            },
            async completeLogin(url) {
                const user = await userManager.signinRedirectCallback(url);
                this.profile = user.profile;
                localStorage.setItem("user", JSON.stringify(this.$state));
                return "/";
            },
            async logout() {
                reset(this);
                localStorage.removeItem("user");
                //await userManager.signoutRedirect();
            },
            async completeLogout() {
                reset(this);
                localStorage.removeItem("user");
                //await userManager.signoutRedirectCallback();
            },
            async getUser() {
                this.isLoading = true;
                try {
                    const user = await userManager.getUser();
                    this.profile = user.profile;
                    localStorage.setItem("user", JSON.stringify(this.$state));
                } catch (error) {
                    this.error = error;
                } finally {
                    this.isLoading = false;
                }
            },  
        },
        getters: { isAuthenticated: (state) => state.profile !== null },
    });

    return store;
};
