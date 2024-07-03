<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { notify } from "@kyvg/vue3-notification";


import {ContentService} from "@/services/ContentService";
import ContentHistory from "@/components/ContentHistory.vue";
import {ref} from "vue";
import {EditorFactory} from "@/modules/editor/EditorFactory";
import CategoryInput from "../../Components/CategoryInput.vue";
import TagInput from "../../Components/TagInput.vue";
let editor;

const contentId = ref(new URLSearchParams(window.location.search).get('id'));

const contentService = new ContentService();

const category = ref(null);
const tags = ref(null);
const status = ref(null);

let content = {};
const title = ref('');


function loadContent(id = null) {
    if (id) {
        contentId.value = id;
        const url = new URL(window.location.href);
        url.searchParams.set('id', id);
        window.history.pushState({}, '', url);
    }
    if (contentId.value) {
        contentService.getContent(contentId.value).then((data) => {
            content = data.content;
            title.value = data.title;
            category.value = data.category_id;
            status.value = data.status;
            editor = EditorFactory.createEditor(content);
            tags.value = data.tags.split(',').slice(0,-1).map((tag) => {
                return {name: tag}
            });
        }).catch((error) => {
            console.log('Loading failed: ', error);
        });
    } else {
        editor = EditorFactory.createEditor();
    }
}

loadContent();


function saveContent() {
    title.value = document.getElementById('titleElement').innerText;
    editor.save().then((outputData) => {

        contentService.saveContent(
            contentId.value,
            {
                content: JSON.stringify(outputData.blocks),
                title: title.value,
                category_id: category.value,
                tags: tags.value.reduce((acc, tag) => {
                    acc += tag.name + ',';
                    return acc;
                }, ''),
                status: status.value,
            }

        ).then((data) => {
            console.log('Saving successful: ', data)
            //rewrite id param in url to data.id without reloading the page
            const url = new URL(window.location.href);
            url.searchParams.set('id', data.id);
            window.history.pushState({}, '', url);
            contentId.value = data.id;

            notify({
                title: "Mentés sikeres!",
                text: "A tartalom mentése sikeresen megtörtént!",
                duration: 1000,
                type: "success"
            });
        }).catch((error) => {
            console.log('Saving failed: ', error)
            notify({
                title: "Mentés sikertelen!",
                duration: 1000,
                type: "error"
            });
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
                                <v-label class="title-label">Cím:</v-label>
                                <h1 id="titleElement" contenteditable="true" v-text="title" class="title ma-5"> </h1>
                                <v-label class="title-label">Tartalom:</v-label>
                                <div id="editorjs"></div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="4">

                        <v-card class="pa-5 editor-options">
                            <CategoryInput v-model="category" />

                            <TagInput v-model="tags" />

                            <v-row dense>
                                <v-col cols="8">
                                    <v-select
                                        label="Státusz"
                                        variant="solo"
                                        :items="[
                                            {text: 'Piszkozat', value: 0},
                                            {text: 'Publikált', value: 1},
                                            {text: 'Archívált', value: 2}
                                        ]"
                                        v-model="status"
                                        item-title="text"
                                        item-value="value"
                                    >
                                    </v-select>
                                </v-col>
                            </v-row>
                            <ContentHistory
                                :content-id="contentId"
                                @rollback="loadContent($event)"
                            />

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
    height: 50px;
    border: 1px solid lightgrey;
    padding-top:15px;
}

#editorjs {
    margin-left: 20px;
    margin-right: 20px;
    border: 1px solid lightgrey;
    margin-top:20px;
}

.title-label {
    margin-left: 20px;
}

.editor-options{
    position: sticky;
    top: 0;

}

h1 {
    display: block !important;
    font-size: 2em !important;
    margin: 0.67em 0 !important;
    font-weight: bold !important;
}
h2 {
    display: block !important;
    font-size: 1.5em !important;
    margin: 0.83em 0 !important;
    font-weight: bold !important;
}
h3 {
    display: block !important;
    font-size: 1.17em !important;
    margin: 1em 0 !important;
    font-weight: bold !important;
}
h4 {
    display: block !important;
    margin: 1.33em 0 !important;
    font-weight: bold !important;
}
h5 {
    display: block !important;
    font-size: .83em !important;
    margin: 1.67em 0 !important;
    font-weight: bold !important;
}
h6 {
    display: block !important;
    font-size: .67em !important;
    margin-top: 2.33em !important;
    margin-bottom: 2.33em !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    font-weight: bold !important;
}

</style>
