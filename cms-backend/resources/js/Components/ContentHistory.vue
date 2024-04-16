<script setup lang="ts">

import {reactive, ref} from "vue";
import JsonRenderer from "@/components/JsonRenderer.vue";
import {ContentService} from "../services/ContentService";
import {Content} from "../modules/content/Content";
import {ContentBlock} from "../modules/content/ContentBlock";
import {DifferentiatedContent} from "../modules/content/DifferentiatedContent";

const loaded = ref(false);
const dialog = ref(false);
const selectedIndex = ref(null);

const props = defineProps({
  contentId: Number,
});
let contentHistory = reactive([])
let contentHistoryHtml = reactive([]);

const calculateDIfferences = () => {
  for (let x = 0; x < contentHistory.length - 1; x++) {
    let earlierContent = new Content(JSON.parse(contentHistory[x + 1].content) as ContentBlock[]);
    let laterContent = new Content(JSON.parse(contentHistory[x].content) as ContentBlock[]);

    const differentiatedContent: DifferentiatedContent = new DifferentiatedContent(earlierContent, laterContent);
    contentHistoryHtml[x] = differentiatedContent.getHtml();
  }
}

const loadHistory = () => {
  const contentService = new ContentService();
  contentService.getContentHistory(<number>props.contentId).then((data: []) => {
    loaded.value = true;
    contentHistory = data;
    calculateDIfferences();
    console.log(contentHistoryHtml);
  });
}



const dateFormatter = (date: string) => {
  return new Date(date).toLocaleString('hu-HU');
}

const oldVersion = () => {
    if (contentHistory[selectedIndex.value]) {
        return JSON.parse(contentHistory[selectedIndex.value]?.content)
    }
}

const newVersion = () => {
    if (contentHistory[selectedIndex.value + 1]) {
        return JSON.parse(contentHistory[selectedIndex.value + 1]?.content)
    }
}
let html = ref('');
const calculateDifference = () => {
    html = contentHistoryHtml[selectedIndex.value];
}

</script>

<template>
  <v-row class="mt-5" justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          dark
          v-bind="props"
          @click="loadHistory()"
        >
          Verziók
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Verziók kezelése</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>

          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-row>
          <v-col v-if="loaded">
            <JsonRenderer
              :newVersion="newVersion()"
              :oldVersion="oldVersion()"
            />
              <div v-html="contentHistoryHtml[selectedIndex]" ></div>
          </v-col>
          <v-col>
            <v-list>


              <v-list-item-group v-if="contentHistory.length > 0">
                <v-list-item
                  v-for="(item, index) in contentHistory"
                  :key="item.id"
                >
                  <v-list-item-title>
                      <v-checkbox
                          :value="index"
                          :label="dateFormatter(item.created_at)"
                          v-model="selectedIndex"
                          @change="calculateDifference()"
                      >
                    </v-checkbox>
                  </v-list-item-title>
                  <v-list-item-action>

                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
              <v-alert
                v-else
                border="left"
                colored-border
                type="info"
                elevation="2"
              >
                No history found
              </v-alert>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>
