<template>
    <content-layout>
        <div v-if="coursesStore.course && !coursesStore.courseLoading">
            <course-details />
            <lessons-list />
        </div>
        <div v-else>
            <course-details-skeleton />
            <lessons-list-sekeleton />
        </div>

    </content-layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import ContentLayout from "@/layouts/ContentLayout.vue";
import {onMounted} from "vue";
import {useCoursesStore} from "@/stores";
import LessonsList from "@/components/lessons/LessonsList.vue";
import CourseDetails from "@/components/courses/CourseDetails.vue";
import CourseDetailsSkeleton from "@/components/courses/CourseDetailsSkeleton.vue";
import LessonsListSekeleton from "@/components/lessons/LessonsListSekeleton.vue";

const route = useRoute();
const coursesStore = useCoursesStore();

onMounted(async () => {
    const courseSlug = route.params.slug as string;
    await coursesStore.fetchCourse(courseSlug);
});
</script>

<style scoped>

</style>