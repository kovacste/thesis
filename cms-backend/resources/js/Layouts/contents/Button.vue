<script setup lang="ts">
defineProps({
    text: {
        type: String,
        default: 'Button',
    },
    textColor: {
        type: String,
        default: 'red',
    },
});
</script>

<template>
    <button class="button-style" :style="{'color': textColor}">
        {{ text }}
    </button>
</template>

<style scoped>
    .button-style {}
</style>
