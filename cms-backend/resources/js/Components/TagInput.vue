<script setup lang="ts">
import {ref} from "vue";
import {TagService} from "../services/TagService";

const items = ref([]);
const savedTags = ref([]);

defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue'])

const tagService = new TagService();
tagService.getAllTags().then((data) => {
    items.value = data;
    savedTags.value = data;
})

const hasTag = (tagName) => {
    for (let i = 0; i < savedTags.value.length; i++) {
        if (savedTags.value[i].name === tagName) {
            return true;
        }
    }
    return false;
}

const updateTags = (value) => {
    emit('update:modelValue', value);
    let newTag = null;
    for(let i = 0; i < value.length; i++) {
        newTag = value[i].name ?? value[i];
        if (!hasTag(newTag)) {
            tagService.saveTag(newTag).then(() => {
                savedTags.value.push({name: newTag});
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
            break;
        }
    }

}
</script>

<template>
    <v-row dense>
        <v-col cols="8">
            <v-combobox
                :model-value="modelValue"
                @update:modelValue="updateTags($event)"
                :items="items"
                label="Címkék"
                item-title="name"
                item-value="name"
                multiple
                chips
                variant="solo"
            ></v-combobox>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>
