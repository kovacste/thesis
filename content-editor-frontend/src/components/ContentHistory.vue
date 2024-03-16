<script setup lang="ts">

import {reactive, ref} from "vue";
import {ContentService} from "@/services/ContentService";
import JsonRenderer from "@/components/JsonRenderer.vue";

const loaded = ref(false);
const dialog = ref(false);
const props = defineProps({
  contentId: Number,
});
let contentHistory = reactive([])
const loadHistory = () => {
  const contentService = ContentService.getInstance();
  contentService.getContentHistory(<number>props.contentId).then((data: []) => {
    loaded.value = true;
    contentHistory = data;
  });
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
              :newVersion="JSON.parse(contentHistory[contentHistory.length-2].content)"
              :oldVersion="JSON.parse(contentHistory[contentHistory.length-1].content)"
            />
          </v-col>
          <v-col>
            <v-list>
              <v-list-item-group v-if="contentHistory.length > 0">
                <v-list-item
                  v-for="(item, index) in contentHistory"
                  :key="item.id"
                >
                  <v-list-item-title>
                    <v-checkbox >
                      {{ item.created_at.substring(0,10) }}
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
