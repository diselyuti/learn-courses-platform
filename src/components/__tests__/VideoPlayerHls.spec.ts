import { mount } from '@vue/test-utils';
import VideoPlayerHls from "../video/VideoPlayerHls.vue";
import {describe, it, expect, beforeEach} from 'vitest'
import {useSettingsStore} from "@/stores";
import {createPinia, setActivePinia} from "pinia";

describe('VideoPlayer', () => {
	let settingsStore: ReturnType<typeof useSettingsStore>;

	beforeEach(() => {
		setActivePinia(createPinia())
		settingsStore = useSettingsStore();
	});

	it('renders the video player', () => {
		const wrapper = mount(VideoPlayerHls, {
			props: {
				src: 'https://example.com/video.mp4',
			},
		});

		const video = wrapper.find('video');
		expect(video.exists()).toBe(true);
	});

	it('loads the video source using HLS.js', () => {
		const wrapper = mount(VideoPlayerHls, {
			props: {
				src: 'https://example.com/video.m3u8',
			},
		});

		const hlsInstance = wrapper.vm.hls;
		expect(hlsInstance).not.toBeNull();
	});

	it('sets the video playback rate based on the settings store', () => {
		const wrapper = mount(VideoPlayerHls, {
			props: {
				src: 'https://example.com/video.mp4',
			},
		});

		const video = wrapper.find('video').element;

		expect(video.playbackRate).toBe(settingsStore.playbackRate);
	});
});
