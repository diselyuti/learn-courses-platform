<template>
    <div class="min-h-full">
        <div class="bg-gray-800 pb-32">
            <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
                <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="border-b border-gray-700">
                        <div class="flex h-16 items-center justify-between px-4 sm:px-0">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <router-link to="/" class="text-white text-2xl">Learn Something New</router-link>
                                </div>
                                <div class="hidden md:block">
                                    <div class="ml-10 flex items-baseline space-x-4">
                                        <router-link v-for="item in navigation" :key="item.name" :to="item.href" active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">{{ item.name }}</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="-mr-2 flex md:hidden">
                                <!-- Mobile menu button -->
                                <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span class="sr-only">Open main menu</span>
                                    <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                                    <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>
                </div>

                <DisclosurePanel class="border-b border-gray-700 md:hidden">
                    <div class="space-y-1 px-2 py-3 sm:px-3 flex flex-col">
                        <router-link v-for="item in navigation" :key="item.name" :to="item.href" active-class="bg-gray-900 text-white" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">{{ item.name }}</router-link>
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <header class="py-10">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold tracking-tight text-white">{{ this.$route.meta.title }}</h1>
                </div>
            </header>
        </div>

        <main class="-mt-32">
            <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
const navigation = [
    { name: 'Courses', href: '/' },
]
</script>

<style lang="scss">
.active {
    opacity: 1;
    font-weight: 700;
}
</style>