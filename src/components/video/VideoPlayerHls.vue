<template>
    <div class="w-full h-full relative">
        <video class="w-full h-full rounded-md object-cover focus:outline-gray-500"
               v-show="!loading"
               ref="videoRef"
               :controls="controls"
               :muted="muted"
               @timeupdate="onTimeUpdate"
               :loop="loop"
               :playbackRate="settingsStore.playbackRate"
               id="video"
        >
        </video>
        <div v-show="loading" class="w-full h-full rounded-md bg-gray-200">
            <div class="flex justify-center items-center h-full p-10">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
        </div>
        <button
            class="absolute top-3 left-3 bg-white rounded-full p-3"
            v-if="controls"
            id="pip-button"
            @click="onEnterPiP"
        >
            <ArrowDownRightIcon class="h-3 w-3 text-gray-900"/>
        </button>
        <div class="group absolute top-3 left-16 bg-white rounded-full p-3 flex text-gray-900 text-xs" v-if="controls">
            <div class="h-3">{{ settingsStore.playbackRate }}x</div>
            <div class="h-3 hidden group-hover:block group-hover:ml-1">Press "Q" to speed up the video and "A" to slow down</div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import Hls from 'hls.js/dist/hls.min';
import {ArrowDownRightIcon} from "@heroicons/vue/24/solid";
import {useSettingsStore} from "@/stores";

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        default: true,
    },
    autoplay: {
        type: Boolean,
        default: false,
    },
    muted: {
        type: Boolean,
        default: false,
    },
    loop: {
        type: Boolean,
        default: false,
    },
    videoId: {
        type: String,
        default: '',
    },
})

const requestPictureInPicture = async () => {
    const video = videoRef.value;
    try {
        await video.requestPictureInPicture();

    } catch (error) {
        console.error('Failed to enter Picture-in-Picture mode', error);
    }
};

const onEnterPiP = () => {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
        requestPictureInPicture();
    }
};

const onTimeUpdate = (event) => {
    // save to local storage
    const video = event.target;
    const currentTime = video.currentTime;
    if (!props.videoId) {
        return;
    }
    localStorage.setItem(`video-id-${props.videoId}`, currentTime);
};

const initializeHls = () => {
    if (!props.src) {
        return;
    }
    const video = videoRef.value;
    const hls = new Hls();
    hls.loadSource(props.src);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.playbackRate = settingsStore.playbackRate;
        video.controlsList = "noplaybackrate";

        if (props.videoId) {
            const currentTime = localStorage.getItem(`video-id-${props.videoId}`);
            if (currentTime) {
                video.currentTime = currentTime;
            }
        }
        if (props.autoplay) {
            video.play();
        }
    });
    hls.on(Hls.Events.MANIFEST_LOADING, () => {
        loading.value = true;
    });
    hls.on(Hls.Events.MANIFEST_LOADED, () => {
        loading.value = false;
    });
}

const videoRef = ref(null);
const loading = ref(true);
const settingsStore = useSettingsStore();

onMounted(() => {
    settingsStore.initKeydownEventListener();
    initializeHls();
});

onBeforeUnmount(() => {
    settingsStore.removeKeydownEventListener();
});
</script>
