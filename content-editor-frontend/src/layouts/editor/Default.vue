<template>
  <div class="editor-layout">
    <div class="editor-toolbar">
    </div>
    <v-row>
      <v-col cols="8" class="editor-preview">
        <h1 id="titleElement" contenteditable="true" v-text="title" class="title ma-5"> </h1>
        <div id="editorjs"></div>
      </v-col>
      <v-col cols="4" class="mt-5">

        <v-combobox
          v-model="tag"
          :items="items"
          label="Válassz vagy írj be egy új címkéket"
          multiple
          chips
          variant="solo"
        ></v-combobox>

        <v-combobox
          v-model="category"
          :items="categories"
          label="Válassz vagy írj be egy új kategóriát"
          multiple
          chips
          variant="solo"
        ></v-combobox>

        <ContentHistory :content-id="3"/>

        <v-btn @click="saveContent"> Mentés </v-btn>

      </v-col>
    </v-row>
  </div>
</template>

<script async setup>


import {useRoute} from "vue-router";
import {ContentService} from "@/services/ContentService";
import ContentHistory from "@/components/ContentHistory.vue";
import {ref} from "vue";
import {EditorFactory} from "@/modules/editor/EditorFactory";

let editor;
const route = useRoute();
const contentId = route.params.id;
const contentService = ContentService.getInstance();

let content = {};
let title = ref('');

let tag = ref(['Vers', 'Irodalom']);
let items = ref(['Vers', 'Irodalom', 'Ady Endre', 'Matematika', 'Történelem']);

let category = ref([])
let categories = ref(['Irodalom', 'Matematika', 'Történelem']);

if (contentId) {
  contentService.getContent(contentId).then((data) => {
    content = data.content;
    title.value = data.title;
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
      contentId,
      {
        content: JSON.stringify(outputData.blocks),
        title: title.value,
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

<style scoped>
.title {
  height: 100px;
}
  .editor-preview {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
