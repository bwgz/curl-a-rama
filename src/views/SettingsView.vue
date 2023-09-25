<script setup>
import { ref } from "vue";
import { useCurling } from "../store";
import { storeToRefs } from "pinia";
import Layout from "../components/Layout.vue";

const error = ref(null);
const store = useCurling();
const { teams } = storeToRefs(store);
const { update } = store;

const submit = () => {
    if (teams.value[0].color === teams.value[1].color) {
        error.value = "Team colors must be unique";
        return;
    }
    error.value = null;
    update({ teams: teams.value });
};
</script>

<template>
    <Layout>
        <template v-slot:default>
            <div class="container p-2 pb-5">
                <h1>Settings</h1>
                <form @submit.prevent="submit">
                    <h2>Teams</h2>
                    <div v-if="error" class="alert alert-danger fade show" role="alert">
                        <i class="modus-icons mr-1" aria-hidden="true">warning</i>
                        <div>{{error}}</div>
                        <button type="button" class="close" data-dismiss="alert">
                            <i class="modus-icons notranslate" aria-hidden="true">close</i>
                        </button>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <div class="form-group">
                                <label for="team-0-name">Name</label>
                                <input
                                    v-model="teams[0].name"
                                    type="text"
                                    id="team-0-name"
                                    class="form-control"
                                    placeholder="Team Name"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="team-0-color" class="control-label">Color</label>
                                <select
                                    v-model="teams[0].color"
                                    id="team-0-color"
                                    class="form-select form-control"
                                    required
                                >
                                    <option disabled>Please select one</option>
                                    <option value="red">Red</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="blue">Blue</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="form-group">
                                <label for="team-1-name">Name</label>
                                <input
                                    v-model="teams[1].name"
                                    type="text"
                                    id="team-1-name"
                                    class="form-control"
                                    placeholder="Team Name"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="team-1-color" class="control-label">Color</label>
                                <select
                                    v-model="teams[1].color"
                                    id="team-1-color"
                                    class="form-select form-control"
                                    required
                                >
                                    <option disabled>Please select one</option>
                                    <option value="red">Red</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="blue">Blue</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </template>
    </Layout>
</template>

<style></style>
