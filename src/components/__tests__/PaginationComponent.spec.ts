import { mount } from '@vue/test-utils';
import { useCoursesStore } from '@/stores';
import { setActivePinia, createPinia } from 'pinia';
import PaginationComponent from '@/components/common/PaginationComponent.vue';
import { describe, test, expect, beforeEach } from 'vitest'
import type {Course} from "@/types";


describe('PaginationComponent', () => {
	let coursesStore: ReturnType<typeof useCoursesStore>;

	beforeEach(() => {
		setActivePinia(createPinia())
		coursesStore = useCoursesStore();
		coursesStore.courses = Array.from({ length: 21 }, (_, i) => ({
			id: i.toString(),
			title: `Course ${i}`,
			description: `Description ${i}`,
			previewImageLink: `https://wisey.app/assets/images/web/course-covers/course-${i}`,
			tags: ['tag1', 'tag2'],
			lessonsCount: 10,
			rating: 4.5,
			meta: {
				slug: `course-${i}`
			}
		})) as Course[];
		coursesStore.pageNumber = 1;
	});

	test('renders correct number of buttons', () => {
		const wrapper = mount(PaginationComponent);
		expect(wrapper.findAll('#pagination-button')).toHaveLength(3);
	});

	test('clicking Previous button decrements page number', async () => {
		const wrapper = mount(PaginationComponent);
		const prevButton = wrapper.find('#pagination-prev-button');

		await prevButton.trigger('click');
		expect(coursesStore.pageNumber).toBe(1);

		coursesStore.setPageNumber(2);
		await prevButton.trigger('click');
		expect(coursesStore.pageNumber).toBe(1);
	});

	test('clicking Next button increments page number', async () => {
		const wrapper = mount(PaginationComponent);
		const nextButton = wrapper.find('#pagination-next-button');

		await nextButton.trigger('click');
		expect(coursesStore.pageNumber).toBe(2);

		coursesStore.setPageNumber(2);
		await nextButton.trigger('click');
		expect(coursesStore.pageNumber).toBe(3);

		coursesStore.setPageNumber(3);
		await nextButton.trigger('click');
		expect(coursesStore.pageNumber).toBe(3);
	});

	test.each([1, 2, 3])(
		'clicking button %i sets the page number correctly',
		async (buttonNumber) => {
			const wrapper = mount(PaginationComponent);
			const button = wrapper.find(`#pagination-button:nth-of-type(${buttonNumber})`);

			await button.trigger('click');
			expect(coursesStore.pageNumber).toBe(buttonNumber);
		}
	);

	test.each([1, 2, 3])(
		'button %i has the active class when corresponding page is active',
		async (buttonNumber) => {
			coursesStore.setPageNumber(buttonNumber);
			const wrapper = mount(PaginationComponent);
			const button = wrapper.find(`#pagination-button:nth-of-type(${buttonNumber})`);

			expect(button.classes()).toContain('border-indigo-500');
			expect(button.classes()).toContain('text-indigo-600');
		}
	);
});
