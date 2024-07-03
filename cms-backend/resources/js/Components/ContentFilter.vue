<script setup lang="ts">

import {ref} from "vue";
import {CategoryService} from "../services/CategoryService";
import TagInput from "./TagInput.vue";
import {TagService} from "../services/TagService";

const category = ref(null);
const tag = ref(null);
const szoveg = ref(null);
const categories = ref( []);
const items = ref([]);

const tagService = new TagService();
tagService.getAllTags().then((data) => {
    items.value = data;
})

const categoryService = new CategoryService();
categoryService.getAllCategories().then((data) => {
    categories.value = data;
})
</script>

<template>
    <v-card class="ma-5" elevation="5">
        <v-card-title>
            Szűrés
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-text-field label="Szöveg" v-model="szoveg"/>
                </v-col>
                <v-col>
                    <v-select
                        v-model="category"
                        :items="categories"
                        item-title="name"
                        item-value="id"
                        label="Válassz kategóriát"
                        variant="solo"
                    ></v-select>
                </v-col>
                <v-col>
                    <v-combobox
                        v-model="tag"
                        :items="items"
                        label="Válassz vagy írj egy új címkéket"
                        item-title="name"
                        item-value="name"
                        multiple
                        chips
                        variant="solo"
                    ></v-combobox>
                </v-col>
                <v-col>
                    <v-select
                        label="Szerző"
                        :items="[
                            {text: 'Kovács Tibor Előd', value: 1},
                            {text: 'Szerző 2', value: 2},
                            {text: 'Szerző 3', value: 3},
                        ]"
                        item-title="text"
                        item-value="value"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        color="primary"
                        @click="$emit('filter', {category: category, tag: tag, text: szoveg})"
                    >
                        Szűré
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>
