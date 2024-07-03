<script setup lang="ts">

import {reactive, ref} from "vue";
import JsonRenderer from "@/components/JsonRenderer.vue";
import {ContentService} from "../services/ContentService";
import {Content} from "../modules/content/Content";
import {ContentBlock} from "../modules/content/ContentBlock";
import {DifferentiatedContent} from "../modules/content/DifferentiatedContent";
import { notify } from "@kyvg/vue3-notification";

const emit = defineEmits(['rollback']);

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

const rollbackVersion = () => {
    const contentService = new ContentService();
    contentService.rollbackContent(<number>props.contentId, contentHistory[selectedIndex.value].id).then((data) => {
        emit('rollback', data.id);
        loadHistory();
        notify({
            title: "Verzió visszaállítás sikeres!",
            text: "A verzió visszaállítása sikeresen megtörtént!",
            duration: 1000,
            type: "success"
        });
    });
}

</script>

<template>
  <v-row class="mt-5" justify="center">
    <v-dialog
      v-model="dialog"
      width="1400"
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
        <v-row class="ma-5">
          <v-col cols="7" v-if="loaded" class="pa-5 ml-20">
            <JsonRenderer
              :newVersion="newVersion()"
              :oldVersion="oldVersion()"
            />
              <div v-html="contentHistoryHtml[selectedIndex]" ></div>
          </v-col>
          <v-col cols="4">
              <v-card>
                  <v-card-title>
                      Verziók
                    </v-card-title>
              <v-virtual-scroll
                  :height="300"
                    :items="contentHistory"
              >
                  <template v-slot:default="{ item, index }">
                      <div v-if="contentHistory.length > 0">
                          <v-checkbox
                              :key="item.id"
                              density="compact"
                              :value="index"
                              :hide-details="true"
                              :label="dateFormatter(item.created_at)"
                              v-model="selectedIndex"
                              @change="calculateDifference()"
                          >
                          </v-checkbox>
                      </div>
                      <v-alert
                          v-else
                          border="left"
                          colored-border
                          type="info"
                          elevation="2"
                      >
                          No history found
                      </v-alert>
                  </template>
              </v-virtual-scroll>
                <v-card-actions>
                    <v-btn
                        color="primary"
                        @click="rollbackVersion();"
                    >
                        Visszaállás a kiválasztott verzióra
                    </v-btn>
                </v-card-actions>
              </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>
