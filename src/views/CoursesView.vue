<template>
    <content-layout>
        <div class="mx-auto max-w-2xl py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div v-for="course in coursesStore.paginatedCourses" :key="course.id" class="group relative">
                    <course-preview :course="course" />
                </div>
            </div>
        </div>
        <pagination-component />
    </content-layout>
</template>

<script setup lang="ts">
import ContentLayout from "@/layouts/ContentLayout.vue";
import {
    ref,
    onMounted,
} from "vue";
import CoursePreview from "@/components/courses/CoursePreview.vue";
import { useCoursesStore } from "@/stores";
import PaginationComponent from "@/components/common/PaginationComponent.vue";

const coursesStore = useCoursesStore();

onMounted(async () => {
    await coursesStore.fetchCourses();
});
</script>

<style scoped>

</style>