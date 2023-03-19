<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl py-3 px-4 sm:py-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <!-- Product details -->
            <div class="lg:max-w-lg lg:self-end">
                <div class="mt-4">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" id="title">{{ courseStore.course.title }}</h1>
                </div>

                <section aria-labelledby="information-heading" class="mt-4">
                    <h2 id="information-heading" class="sr-only">Course information</h2>

                    <div class="flex items-center">
                        <p class="text-lg text-gray-900 sm:text-xl" id="duration">{{ courseStore.course.duration }} minutes</p>

                        <div class="ml-4 border-l border-gray-300 pl-4">
                            <h2 class="sr-only">Reviews</h2>
                            <div class="flex items-center">
                                <div>
                                    <div class="flex items-center">
                                        <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[courseStore.course.rating > rating ? 'text-yellow-400 course-star' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                                    </div>
                                    <p class="sr-only">{{ courseStore.course.rating }} out of 5 stars</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 space-y-6">
                        <p class="text-base text-gray-500" id="description">{{ courseStore.course.description }}</p>
                    </div>

                    <div class="mt-4">
                        <h3 class="text-gray-500">Skills:</h3>
                        <ul class="list-disc pl-5 space-y-2">
                            <li v-for="skill in courseStore.course.meta.skills" :key="skill" id="skill" class="text-base text-gray-500">{{ skill }}</li>
                            <li v-if="courseStore.course.meta.skills?.length === 0" class="text-base text-gray-500">No additional skills</li>
                        </ul>
                    </div>
                </section>
            </div>

            <!-- Course video -->
            <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center" v-show="courseStore.course.meta.courseVideoPreview">
                <div class="overflow-hidden rounded-lg">
                    <video-player-hls :src="courseStore.course.meta?.courseVideoPreview?.link" :autoplay="true" :muted="true" :loop="true"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/20/solid'
import {useCoursesStore} from "@/stores";
import VideoPlayerHls from "@/components/video/VideoPlayerHls.vue";

const courseStore = useCoursesStore();
</script>