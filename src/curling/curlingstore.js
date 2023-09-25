import { defineStore } from "pinia";

const name = "curling";

const DEFAULT_SETTINGS = {
    teams: [
        {
            name: "USA",
            color: "red",
        },
        {
            name: "FIN",
            color: "yellow",
        },
    ],
};

export const createCurlingStore = (settings) => {
    const store = defineStore(name, {
        state: () => {
            if (localStorage.getItem(name)) return JSON.parse(localStorage.getItem(name));
            return DEFAULT_SETTINGS;
        },
        actions: {
            update(settings) {
                console.log("update", settings);
                this.teams = settings.teams;
                localStorage.setItem(name, JSON.stringify(this.$state));
            },
        },
    });

    return store;
};
