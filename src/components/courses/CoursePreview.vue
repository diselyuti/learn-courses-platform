<template>
    <div @mouseover="showVideo" @mouseleave="hideVideo">
        <div class="h-40 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
            <img v-show="!showCourseVideoPreview" :src="course.previewImageLink + PREVIEW_IMAGE_LINK_POSTFIX_COURSE" :alt="course.tags" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            <video-player-hls :src="course.meta?.courseVideoPreview?.link" :controls="false" :autoplay="true" :muted="true" v-if="showCourseVideoPreview" :loop="true"/>
        </div>
        <div class="mt-4 flex justify-between">
            <div>
                <h3 class="text-sm text-gray-700">
                    <router-link :to="`/courses/${course.meta?.slug}`">
                        <span aria-hidden="true" class="absolute inset-0" />
                        {{ course.title }}
                    </router-link>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ course.description }}</p>
                <p class="text-sm font-medium text-gray-900">{{ course.lessonsCount + (course.lessonsCount > 1 ? ' lessons' : ' lesson') }} </p>
                <p class="text-sm text-gray-500" id="tags"><span class="mr-1" v-for="tag in course.tags" :key="tag">{{ tag }}</span></p>
                <p class="text-sm text-gray-500" id="rating">Rating: {{ course.rating }}</p>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { Course } from "@/types";
import {ref} from "vue";
import {PREVIEW_IMAGE_LINK_POSTFIX_COURSE} from "@/constants";
import VideoPlayerHls from "@/components/video/VideoPlayerHls.vue";

interface Props {
    course: Course;
}

const showCourseVideoPreview = ref(false);

const props = defineProps<Props>()

const showVideo = () => {
    if (props.course.meta?.courseVideoPreview?.link)
        showCourseVideoPreview.value = true;
}

const hideVideo = () => {
    showCourseVideoPreview.value = false;
}
</script>

<style scoped>

</style>