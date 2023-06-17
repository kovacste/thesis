<template>
  <div class="editor-layout">
    <h1> Editor layout </h1>
    <div class="editor-toolbar">
      <v-btn @click="saveContent"> Mentés </v-btn>
    </div>
    <div class="editor-preview" id="editorjs">
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import CheckList from '@editorjs/checklist';


const editor = new EditorJS({
  holder: 'editorjs',
  logLeve: 'VERBOSE',
  data: {},
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    link: {
      class: LinkTool,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
    },
    checklist: {
      class: CheckList,
      inlineToolbar: true,
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:3000/uploadFile',
          byUrl: 'http://localhost:3000/fetchUrl',
        },
      }
    }
  },
  onChange: async (api, event) => {
    console.log('Now I know that Editor\'s content changed!', api, event);
  }
});

function saveContent() {
  editor.save().then((outputData) => {
    console.log('Article data: ', outputData)
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
}

</script>

<style scoped>
  * {
    border: 1px solid grey;
  }
  .editor-layout {
    height: 100%;
  }
  .editor-toolbar {
    height: 35px;
  }
  .editor-preview {
    height: 70%;
  }
</style>
