<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

import {ContentService} from "@/services/ContentService";
import ContentHistory from "@/components/ContentHistory.vue";
import {ref} from "vue";
import {EditorFactory} from "@/modules/editor/EditorFactory";
import CategoryInput from "../../Components/CategoryInput.vue";
let editor;

const contentId = ref(new URLSearchParams(window.location.search).get('id'));

const contentService = new ContentService();

const category = ref(null);

let content = {};
const title = ref('');

const tag = ref(['Vers', 'Irodalom']);
const items = ref(['Vers', 'Irodalom', 'Ady Endre', 'Matematika', 'Történelem']);


if (contentId.value) {
    contentService.getContent(contentId.value).then((data) => {
        content = data.content;
        title.value = data.title;
        category.value = data.category_id;
        editor = EditorFactory.createEditor(content);
    }).catch((error) => {
        console.log('Loading failed: ', error);
    });
} else {
    editor = EditorFactory.createEditor();
}

function saveContent() {
    title.value = document.getElementById('titleElement').innerText;
    editor.save().then((outputData) => {

        contentService.saveContent(
            contentId.value,
            {
                content: JSON.stringify(outputData.blocks),
                title: title.value,
                category_id: category.value,
            }

        ).then((data) => {
            console.log('Saving successful: ', data)
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }).catch((error) => {
        console.log('Saving failed: ', error)
    });
}


</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
            <v-layout>
                <v-row class="ma-3">
                    <v-col cols="8">
                        <v-card min-height="1000px">
                            <v-card-text>
                                <h1 id="titleElement" contenteditable="true" v-text="title" class="title ma-5"> </h1>
                                <div id="editorjs"></div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="4">

                        <v-card class="pa-5">
                            <CategoryInput v-model="category" />

                            <v-combobox
                                v-model="tag"
                                :items="items"
                                label="Válassz vagy írj be egy új címkéket"
                                multiple
                                chips
                                variant="solo"
                            ></v-combobox>

                            <ContentHistory :content-id="contentId"/>

                            <v-btn @click="saveContent"> Mentés </v-btn>
                        </v-card>

                    </v-col>
                </v-row>
            </v-layout>
    </AuthenticatedLayout>
</template>
<style scoped>
.title {
    font-size: 50px !important;
    height: 100px;
}

</style>
