<template>
    <div class="bg-white">
        <div class="mx-auto w-full px-6 py-12 sm:py-16 lg:py-20 lg:px-8">
            <div class="mx-auto divide-y divide-gray-900/10">
                <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Lessons</h2>
                <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
                    <Disclosure as="div" v-for="lesson in coursesStore.orderedLessons" :key="lesson.id" class="pt-6" v-slot="{ open }" id="lesson">
                        <dt>
                            <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900" id="lesson-title">
                                <h2 class="text-xs font-semibold leading-7 flex sm:text-base">
                                    <span class="mr-2">Lesson {{ lesson.order }}.</span>
                                    {{ lesson.title }}
                                </h2>
                                <span class="ml-6 flex h-7 items-center">
                                    <LockClosedIcon v-if="lesson.status === 'locked'" class="h-6 w-6" aria-hidden="true" />
                                    <span v-if="lesson.status !== 'locked'">
                                        <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                                        <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                                    </span>
                                </span>
                            </DisclosureButton>
                        </dt>
                        <DisclosurePanel as="dd" class="mt-5" v-if="lesson.status !== 'locked'">
                            <video-player-hls :src="lesson.link" :video-id="lesson.id" id="video"/>
                        </DisclosurePanel>
                    </Disclosure>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup>

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import {useCoursesStore} from "@/stores";
import VideoPlayerHls from "@/components/video/VideoPlayerHls.vue";

const coursesStore = useCoursesStore();
</script>