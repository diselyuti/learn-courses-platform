import { defineStore } from 'pinia'
import type {Course} from "@/types";
import api from "@/api";
import {API_COURSES_PREVIEW, PAGINATION_PAGE_SIZE} from "@/constants";

interface RootState {
	courses: Course[],
	lastFetched: number | null,
	pageNumber: number,
}
export const useCoursesStore = defineStore('courses', {
	state: () => ({
		courses: [],
		lastFetched: null,
		pageNumber: 1,
	} as RootState),
	actions: {
		async fetchCourses() {
			if (this.lastFetched && Date.now() - this.lastFetched < 1000 * 60 * 60) {
				return;
			}
			const { data } = await api.get(API_COURSES_PREVIEW);
			this.courses = data.courses;
			this.lastFetched = Date.now();
		},
		setPageNumber(pageNumber: number) {
			if (pageNumber < 1) {
				pageNumber = 1;
			}
			if (pageNumber > this.courses.length / PAGINATION_PAGE_SIZE) {
				pageNumber = Math.ceil(this.courses.length / PAGINATION_PAGE_SIZE);
			}
			this.pageNumber = pageNumber;
		}
	},
	getters: {
		paginatedCourses(): Course[] {
			// return courses from the current page
			return this.courses.slice((this.pageNumber - 1) * 10, this.pageNumber * 10)
		}
	},
	persist: true,
})
