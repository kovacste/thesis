<template>
    <button :class="{ disabled: props.disabled }">{{ text }}</button>
</template>

<script setup lang="ts">

const props = {
    text: String,
    disabled: Boolean,
};

</script>

<style scoped>

</style>
