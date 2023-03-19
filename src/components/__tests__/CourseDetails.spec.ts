import { mount } from '@vue/test-utils'
import CourseDetails from "../courses/CourseDetails.vue";
import { describe, it, expect, beforeEach } from 'vitest'
import {useCoursesStore} from "../../stores";
import {createPinia, setActivePinia} from "pinia";
import {nextTick} from "vue";


describe('CourseDetails', () => {
	let coursesStore: ReturnType<typeof useCoursesStore>;

	beforeEach(() => {
		setActivePinia(createPinia())
		coursesStore = useCoursesStore()
		coursesStore.course = {
			id: '1',
			title: 'Example Course',
			description: 'This is an example course.',
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
			containsLockedLessons: false,
		}
	});

	it('renders course details', async () => {
		const wrapper = mount(CourseDetails)

		await nextTick()

		expect(wrapper.find('#title').text()).toBe('Example Course')
		expect(wrapper.find('#duration').text()).toContain('120 minutes')
		expect(wrapper.findAll('.course-star')).toHaveLength(3)
		expect(wrapper.find('#description').text()).toBe('This is an example course.')
		expect(wrapper.findAll('#skill')).toHaveLength(2)
	})
})
