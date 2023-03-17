<template>
    <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div class="-mt-px flex w-0 flex-1">
            <button
                id="pagination-prev-button"
                @click="coursesStore.setPageNumber(coursesStore.pageNumber - 1)"
                class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Previous
            </button>
        </div>
        <div class="hidden md:-mt-px md:flex">
            <button
                v-for="button in paginationButtons"
                :key="button"
                id="pagination-button"
                @click="coursesStore.setPageNumber(button)"
                class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                :class="button === coursesStore.pageNumber ? 'border-indigo-500 text-indigo-600' : 'border-transparent'"
            >{{button}}</button>
        </div>
        <div class="-mt-px flex w-0 flex-1 justify-end">
            <button
                id="pagination-next-button"
                @click="coursesStore.setPageNumber(coursesStore.pageNumber + 1)"
                class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Next
                <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
        </div>
    </nav>
</template>

<script setup>
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'
import { useCoursesStore } from '@/stores'
import {computed} from "vue";
import {PAGINATION_PAGE_SIZE} from "@/constants";

const coursesStore = useCoursesStore();

const paginationButtons = computed(() => {
    const buttons = [];
    for (let i = 1; i <= Math.ceil(coursesStore.courses.length / PAGINATION_PAGE_SIZE); i++) {
        buttons.push(i);
    }
    return buttons;
});
</script>