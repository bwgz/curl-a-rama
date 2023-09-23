import { defineStore } from "pinia";
import { UserManager } from "oidc-client-ts";

const NO_USER = {
    profile: null,
    error: null,
    isLoading: false,
};

export const createUserStore = (settings) => {
    const userManager = new UserManager(settings);

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
                this.isLoading = false;
                localStorage.setItem("user", JSON.stringify(this.$state));
                return "/";
            },
            async logout() {
                this.profile = null;
                this.isLoading = false;
                localStorage.removeItem("user");
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
