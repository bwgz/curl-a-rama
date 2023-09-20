import { vuexOidcCreateStoreModule } from "vuex-oidc";

import { oidcSettings } from "./config/oidc";

import { defineStore } from "pinia";

export const useOidc = defineStore("oidc", {
    state: () => ({
        ...oidcSettings,
        namespaced: true,
        dispatchEventsOnWindow: true
    }),
    getters: {
        finishedTodos(state) {
            // autocompletion! ✨
            return state.todos.filter((todo) => todo.isFinished);
        },
        unfinishedTodos(state) {
            return state.todos.filter((todo) => !todo.isFinished);
        },
        /**
         * @returns {{ text: string, id: number, isFinished: boolean }[]}
         */
        filteredTodos(state) {
            if (this.filter === "finished") {
                // call other getters with autocompletion ✨
                return this.finishedTodos;
            } else if (this.filter === "unfinished") {
                return this.unfinishedTodos;
            }
            return this.todos;
        },
    },
    actions: {
        userLoaded: (user) => console.log('OIDC user is loaded:', user),
        userUnloaded: () => console.log('OIDC user is unloaded'),
        accessTokenExpiring: () => console.log('Access token will expire'),
        accessTokenExpired: () => console.log('Access token did expire'),
        silentRenewError: () => console.log('OIDC user is unloaded'),
        userSignedOut: () => console.log('OIDC user is signed out'),
        oidcError: (payload) => console.log('OIDC error', payload),
        automaticSilentRenewError: (payload) => console.log('OIDC automaticSilentRenewError', payload)
    },
});


export default useOidc;