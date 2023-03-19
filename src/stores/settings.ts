import { defineStore } from 'pinia';
import {PLAYBACK_RATE_STEP} from "@/constants";

interface RootState {
	playbackRate: number,
	keydownEventListener: number,
}

export const useSettingsStore = defineStore('settings', {
	state: () => ({
		playbackRate: 1,
		keydownEventListener: 0,
	} as RootState),
	actions: {
		playbackRateUp() {
			this.playbackRate += PLAYBACK_RATE_STEP;
		},
		playbackRateDown() {
			if (this.playbackRate > PLAYBACK_RATE_STEP)
				this.playbackRate -= PLAYBACK_RATE_STEP;
		},
		onKeydown(event: KeyboardEvent) {
			if (event.code === 'KeyQ') {
				this.playbackRateUp();
			}
			if (event.code === 'KeyA') {
				this.playbackRateDown();
			}
		},
		initKeydownEventListener() {
			if (!this.keydownEventListener) {
				window.addEventListener('keydown', this.onKeydown);
			}
			this.keydownEventListener++;
		},
		removeKeydownEventListener() {
			if (this.keydownEventListener > 0) {
				this.keydownEventListener--;
			}
			if (!this.keydownEventListener) {
				window.removeEventListener('keydown', this.onKeydown);
			}
		}
	},
	persist: {
		afterRestore: (state) => {
			state.store.keydownEventListener = 0;
		}
	},
});