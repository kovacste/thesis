<script async setup>
import {ContentService} from "@/services/ContentService";
import {reactive, ref} from "vue";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout.vue";

let contents = reactive([]);
let loaded = ref(false);
const contentService = new ContentService();
contentService.getContents().then((data) => {
    contents = data;
    loaded.value = true;
})

function getContentPiece(content) {
    if(content) {
        const contentObject = JSON.parse(content);
        const contentText = contentObject[0].data?.text;
        return contentText?.length > 50 ? contentText.substring(0, 50) + '...' : contentText;
    }
}
</script>

<template>
    <AuthenticatedLayout>
        <v-card elevation="5" v-if="loaded" width="800">
            <v-list :lines="'three'">
                <div v-for="item in contents" :key="item.id" >
                    <v-list-item
                        :title="item.title ? item.title : 'Nincs cím'"
                        :subtitle="getContentPiece(item.content)"
                    >
                        <template v-slot:append>
                            <v-btn
                                color="grey-lighten-1"
                                icon="mdi-file-edit"
                                variant="text"
                                :href="'/editor/' + item.id"
                            ></v-btn>
                            <v-btn
                                color="grey-lighten-1"
                                icon="mdi-delete"
                                variant="text"
                            ></v-btn>
                        </template>
                    </v-list-item>
                    <hr>
                </div>
            </v-list>
        </v-card>
    </AuthenticatedLayout>
</template>

