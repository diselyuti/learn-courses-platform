import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCoursesStore } from "@/stores"
import { createPinia, setActivePinia } from "pinia"
import LessonsList from "../lessons/LessonsList.vue";
import {nextTick} from "vue";

describe('LessonsList', () => {
	let coursesStore: ReturnType<typeof useCoursesStore>;

	beforeEach(() => {
		setActivePinia(createPinia())
		coursesStore = useCoursesStore()
		coursesStore.course = {
			id: '1',
			title: 'Introduction to Programming',
			description: 'Learn the basics of programming',
			previewImageLink: 'https://wisey.app/assets/images/web/course-covers/course-1',
			tags: ['tag1', 'tag2'],
			lessonsCount: 10,
			rating: 3,
			meta: {
				slug: 'example-course',
				skills: ['skill1', 'skill2'],
				courseVideoPreview: {
					link: 'https://wisey.app/assets/images/web/course-covers/course-1',
					previewImageLink: 'https://wisey.app/assets/images/web/course-covers/course-1',
					duration: 120
				}
			},
			launchDate: '2021-01-01T00:00:00.000Z',
			status: 'launched',
			duration: 120,
			containsLockedLessons: true,
			lessons: [
				{
					id: '1',
					title: 'Lesson 1. Introduction to Programming',
					previewImageLink: 'https://wisey.app/assets/images/web/course-covers/course-1',
					duration: 120,
					order: 1,
					type: 'video',
					status: 'locked',
					link: 'https://wisey.app/assets/images/web/course-covers/course-1',
					meta: null,
				},
				{
					id: '2',
					title: 'Lesson 2. Introduction to Programming',
					previewImageLink: 'https://wisey.app/assets/images/web/course-covers/course-1',
					duration: 120,
					order: 2,
					type: 'video',
					status: 'locked',
					link: 'https://wisey.app/assets/images/web/course-covers/course-1',
					meta: null,
				}
			]
		}
	})

	it('renders the correct number of lessons', async () => {
		const wrapper = mount(LessonsList)

		await nextTick()

		expect(wrapper.findAll('#lesson')).toHaveLength(2)
	})

	it('renders the lesson title and order correctly', async () => {
		const wrapper = mount(LessonsList)

		await nextTick()

		expect(wrapper.find('#lesson-title').text()).contain('Lesson 1.')
		expect(wrapper.find('#lesson-title').text()).contain('Introduction to Programming')
	})
})
