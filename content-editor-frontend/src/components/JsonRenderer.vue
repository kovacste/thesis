<script setup lang="ts">

  import {Content} from "@/modules/content/Content";
  import {DifferentiatedContent} from "@/modules/content/DifferentiatedContent";
  import {ContentBlock} from "@/modules/content/ContentBlock";

  const props = defineProps({
    oldVersion: Array,
    newVersion: Array
  });

  let earlierContent = new Content(props.newVersion as ContentBlock[]);
  let laterContent = new Content(props.oldVersion as ContentBlock[]);

 const differentiatedContent: DifferentiatedContent = new DifferentiatedContent(earlierContent, laterContent);
 const html = differentiatedContent.getHtml();

</script>

<template>
  <div v-html="html"></div>
</template>

