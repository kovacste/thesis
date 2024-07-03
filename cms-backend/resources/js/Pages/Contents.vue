<script async setup>
import {ContentService} from "@/services/ContentService";
import {reactive, ref} from "vue";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout.vue";
import ContentFilter from "../Components/ContentFilter.vue";
import {CategoryService} from "@/services/CategoryService";
import { notify } from "@kyvg/vue3-notification";

let contents = ref([]);
let loaded = ref(false);

const categoryService = new CategoryService();
const categories = ref([]);

categoryService.getAllCategories().then((data) => {
    categories.value = data;
})


const contentService = new ContentService();
contentService.getContents().then((data) => {
    contents.value = data;
    loaded.value = true;
})

function getContentPiece(content) {
    if(content) {
        const contentObject = JSON.parse(content);
        const contentText = contentObject[0].data?.text;
        return contentText?.length > 50 ? contentText.substring(0, 50) + '...' : contentText;
    }
}

function getTags(tags) {
    if (!tags) return []
   return tags.split(',').slice(0,-1);
}

function getCategoryNameById(id) {
    for (let i = 0; i < categories.value.length; i++) {
        if (categories.value[i].id === id) {
            return categories.value[i].name;
        }
    }
    return 'Nincs kategória';
}

function filterContent(filter) {
    contentService.getFilteredContents({
        category_id: filter.category,
        author_id: 1,
        search_term: filter.text ?? '',
    }).then((data) => {
        contents.value = data;
    })
}

function deleteContent(id, index) {
    contentService.delete(id).then(() => {
        contents.value.splice(index, 1);
        notify({
            title: "Törlés sikeres!",
            text: "A tartalom törlése sikeresen megtörtént!",
            duration: 1000,
            type: "success"
        });
    })
}
</script>

<template>
    <AuthenticatedLayout>
        <ContentFilter @filter="filterContent"/>

        <v-card class="ma-5" elevation="5" v-if="loaded" width="800">
            <v-card-title>
                Tartalmak
            </v-card-title>
            <v-card-item>
                <v-list :lines="'three'">
                    <div v-for="(item, index) in contents" :key="item.id" >
                        <v-list-item>
                            <template v-slot:title>
                                <v-row dense>
                                    <v-col>Szerző</v-col>
                                    <v-col>Cím</v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col class="font-weight-bold">Kovács Tibor Előd</v-col>
                                    <v-col class="font-weight-bold">{{ item.title? item.title : 'Nincs cím' }}</v-col>
                                </v-row>
                            </template>
                            <template v-slot:subtitle>
                                <v-row dense>
                                    <v-col class="font-weight-bold">
                                        Kategória: {{ getCategoryNameById(item.category_id) }}
                                    </v-col>
                                    <v-col>
                                        <v-chip
                                            v-for="tag in getTags(item.tags)"
                                            class="ma-2"
                                            color="indigo"
                                            prepend-icon="mdi-account-circle"
                                        >
                                            {{ tag }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-slot:append>
                                <v-btn
                                    color="grey-lighten-1"
                                    icon="mdi-file-edit"
                                    variant="text"
                                    :href="'/editor?id=' + item.id"
                                ></v-btn>
                                <v-btn
                                    color="grey-lighten-1"
                                    icon="mdi-delete"
                                    variant="text"
                                    @click="deleteContent(item.id, index)"
                                ></v-btn>
                            </template>
                        </v-list-item>
                        <hr>
                    </div>
                </v-list>
            </v-card-item>
        </v-card>
    </AuthenticatedLayout>
</template>

