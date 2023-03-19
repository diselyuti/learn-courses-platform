import { defineStore } from 'pinia'
import type {Course, Lesson} from "@/types";
import api from "@/api";
import {API_COURSES_PREVIEW, PAGINATION_PAGE_SIZE} from "@/constants";

interface RootState {
	courses: Course[],
	coursesLoading: boolean,
	course: Course | null,
	courseLoading: boolean,
	lastFetched: number | null,
	pageNumber: number,
}
export const useCoursesStore = defineStore('courses', {
	state: () => ({
		courses: [],
		coursesLoading: false,
		course: null,
		courseLoading: false,
		lastFetched: null,
		pageNumber: 1,
	} as RootState),
	actions: {
		async fetchCourses() {
			if (this.lastFetched && Date.now() - this.lastFetched < 1000 * 60 * 60) {
				return;
			}
			this.coursesLoading = true;
			await this.getCourses();
			this.coursesLoading = false;
			this.lastFetched = Date.now();
		},
		async getCourse(id: string) {
			const { data } = await api.get(API_COURSES_PREVIEW + id);
			this.course = data;
		},
		async getCourses() {
			const { data } = await api.get(API_COURSES_PREVIEW);
			this.courses = data.courses;
		},
		async fetchCourse(slug: string) {
			this.courseLoading = true;
			let course = this.findCourseBySlug(slug);
			if (!course) {
				// check if course is not in the store
				await this.getCourses();
				course = this.findCourseBySlug(slug);
			}
			// if course is still not found, return null
			if (!course) {
				this.courseLoading = false;
				return null;
			}

			// if course is found, fetch it
			await this.getCourse(course.id);
			this.courseLoading = false;
		},
		findCourseBySlug(slug: string): Course | null {
			for (const course of this.courses) {
				if (course.meta.slug === slug) {
					return course;
				}
			}
			return null;
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
		},
		orderedLessons(): Lesson[] {
			if (!this.course || !this.course.lessons) {
				return [];
			}
			return this.course.lessons.sort((a, b) => {
				return a.order - b.order;
			})
		}
	},
	persist: {
		afterRestore: (state) => {
			state.store.coursesLoading = false;
			state.store.courseLoading = false;
		}
	},
})
