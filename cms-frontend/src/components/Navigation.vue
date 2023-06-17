<template>
    <v-layout>
      <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        permanent
        theme="dark"
        width="300"
      >
        <v-list v-model:opened="open">
          <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>

          <v-list-group value="Content">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-account-circle"
                title="Content"
              ></v-list-item>
            </template>

            <v-list-group value="Create">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  title="Create"
                ></v-list-item>
              </template>

              <v-list-item
                v-for="([title, icon, to], i) in contentTypes"
                :key="i"
                :value="title"
                :title="title"
                :prepend-icon="icon"
                :to="to"
              ></v-list-item>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let open = ref(['Users']);
const admins = [
  ['Management', 'mdi-account-multiple-outline'],
  ['Settings', 'mdi-cog-outline'],
];
const contentTypes = [
  ['Blog', 'mdi-plus-outline', '/editor/blog'],
  ['Page', 'mdi-file-outline', '/page'],
];
</script>
