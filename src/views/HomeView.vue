<template>
    <content-layout>
        <button @click="getPreviewCourses">get token</button>
    </content-layout>
</template>

<script setup lang="ts">
import ContentLayout from "@/layouts/ContentLayout.vue";
import api from "@/api";

const getPreviewCourses = () => {
    api.get('/core/preview-courses/').then((res) => {
        console.log(res);
    });
}


</script>

<style scoped>

</style>