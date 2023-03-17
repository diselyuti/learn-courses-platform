<template>
    <video class="w-full h-full rounded-md" v-show="!loading" ref="videoRef" controls></video>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Hls from 'hls.js/dist/hls.min';

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
})

const videoRef = ref(null);
const loading = ref(false);

onMounted(() => {
    if (!props.src) {
        return;
    }
    const video = videoRef.value;
    const hls = new Hls();
    loading.value = true;
    hls.loadSource(props.src);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        loading.value = false;
    });
});
</script>
