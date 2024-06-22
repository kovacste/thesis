<template>
  <div class="editor-layout">
    <v-row>
      <v-col cols="8" class="editor-preview">
        <h1 id="titleElement" contenteditable="true" v-text="title" class="title ma-5"> </h1>
        <div id="editorjs"></div>
      </v-col>
      <v-col cols="4" class="mt-5">

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
import CategoryInput from "../../Components/CategoryInput.vue";

let editor;
const route = useRoute();
const contentId = ref(route.params.id);
const contentService = new ContentService();

console.log(route.params.id);

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

<style scoped>
.title {
    font-size: 50px !important;
  height: 100px;
}
  .editor-preview {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
