<script setup lang="ts">
import {ref} from "vue";
import {CategoryService} from "../services/CategoryService";

const categoryService = new CategoryService();
const categoryName = ref('');
const categoryDescription = ref('');
const parentCategory = ref(null);
const newCategoryDialogVisible = ref(false);
const categories = ref( []);

categoryService.getAllCategories().then((data) => {
    categories.value = data;
})

defineProps(['modelValue']);
defineEmits(['update:modelValue'])

const saveCategory = () => {
    categoryService.saveCategory({
        name: categoryName.value,
        parent: null,
        description: categoryDescription.value
    }).then((data) => {
        console.log('Saving successful: ', data)
    }).catch((error) => {
        console.log('Saving failed: ', error)
    });
}
</script>

<template>
    <v-row>
        <v-col cols="8">
            <v-select
                :model-value="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :items="categories"
                item-title="name"
                item-value="id"
                label="Válassz kategóriát"
                variant="solo"
            ></v-select>
        </v-col>
        <v-col cols="4" class="mt-3">
            <v-btn @click="newCategoryDialogVisible = true">
                Új kategória
            </v-btn>
        </v-col>
    </v-row>
    <v-dialog v-model="newCategoryDialogVisible">
        <v-card max-width="500px">
            <v-card-title>
                Új kategória
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="categoryName" label="Kategória neve"></v-text-field>
                <v-text-field
                    label="Leírás"
                    v-model="categoryDescription"
                ></v-text-field>
                <v-select
                    v-model="parentCategory"
                    :items="categories"
                    label="Válassz szülő kategóriát"
                    item-title="name"
                    item-value="id"
                    chips
                    variant="solo"
                ></v-select>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="newCategoryDialogVisible = false">Mégse</v-btn>
                <v-btn @click="saveCategory();newCategoryDialogVisible = false">Mentés</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>
