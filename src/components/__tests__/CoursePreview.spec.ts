import { describe, it, expect } from 'vitest'
import {shallowMount} from '@vue/test-utils'
import CoursePreview from "../courses/CoursePreview.vue";
import {PREVIEW_IMAGE_LINK_POSTFIX_COURSE} from "../../constants";

describe('CoursePreview', () => {
	const course = {
		"id": "352be3c6-848b-4c19-9e7d-54fe68fef183",
		"title": "Lack of Motivation & How to Overcome It",
		"tags": [
			"productivity"
		],
		"launchDate": "2023-03-06T16:50:06.000Z",
		"status": "launched",
		"description": "Reignite your inner drive by managing factors that dampen your motivation.",
		"duration": 521,
		"lessonsCount": 2,
		"containsLockedLessons": true,
		"previewImageLink": "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it",
		"rating": 3.5,
		"meta": {
			"slug": "lack-of-motivation-how-to-overcome-it",
			"skills": [
				"Aligning your goals with your motives",
				"Overcoming decision paralysis",
				"Reframing negative self-talk",
				"Gaining clarity",
				"Challenging yourself"
			],
			"courseVideoPreview": {
				"link": "https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8",
				"duration": 27,
				"previewImageLink": "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/preview"
			}
		}
	};

	it('renders course title and description', () => {
		const wrapper = shallowMount(CoursePreview, {
			propsData: {
				course
			}
		});
		expect(wrapper.find('h3').text()).toBe(course.title);
		expect(wrapper.find('p').text()).toBe(course.description);
	});

	it('renders course lesson count', () => {
		const wrapper = shallowMount(CoursePreview, {
			propsData: {
				course
			}
		});
		expect(wrapper.find('p.text-gray-900').text()).contains(course.lessonsCount + ' lesson');
	});

	it('renders course rating', () => {
		const wrapper = shallowMount(CoursePreview, {
			propsData: {
				course
			}
		});
		expect(wrapper.find('#rating').text()).toBe('Rating: ' + course.rating);
	});

	it('renders course tags', () => {
		const wrapper = shallowMount(CoursePreview, {
			propsData: {
				course
			}
		});
		expect(wrapper.find('#tags').text()).toBe(course.tags.toString());
	});

	it('renders course preview image', () => {
		const wrapper = shallowMount(CoursePreview, {
			propsData: {
				course
			}
		});
		expect(wrapper.find('img').attributes('src')).toBe(`${course.previewImageLink}${PREVIEW_IMAGE_LINK_POSTFIX_COURSE}`);
		expect(wrapper.find('img').attributes('alt')).toBe(course.tags.toString());
	});

	it('renders course title as a router link', () => {
		const wrapper = shallowMount(CoursePreview, {
			propsData: {
				course
			}
		});
		expect(wrapper.find('router-link').attributes('to')).toBe(`/courses/${course.meta.slug}`);
	});
});