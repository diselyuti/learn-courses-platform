<template>
    <div class="bg-white animate-pulse">
        <div class="mx-auto w-full px-6 py-12 sm:py-16 lg:py-20 lg:px-8">
            <div class="mx-auto divide-y divide-gray-900/10">
                <h2 class="w-3/12 h-6 rounded-md bg-gray-200 text-2xl font-bold leading-10 tracking-tight text-gray-900"></h2>
                <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
                    <dt v-for="index in 5" :key="index" class="py-3 flex items-center">
                        <div class="flex flex-col w-full items-start text-left text-gray-900">
                            <span class="w-3/12 h-5 rounded-md bg-gray-200 text-base font-semibold leading-7 flex"/>
                            <span class="mt-2 w-6/12 h-4 rounded-md bg-gray-200 text-base font-semibold leading-7 flex"/>
                        </div>
                    </dt>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>