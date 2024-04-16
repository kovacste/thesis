<script async setup>
  import {ContentService} from "@/services/ContentService";
  import {reactive, ref} from "vue";

  let contents = reactive([]);
  let loaded = ref(false);
  const contentService = new ContentService();
  contentService.getContents().then((data) => {
    contents = data;
    loaded.value = true;
  })
</script>

<template>
  <div v-if="loaded">
    {{ contents }}
  </div>
</template>

<style scoped>

</style>
