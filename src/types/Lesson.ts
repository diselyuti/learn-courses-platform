export interface Lesson {
	id: string;
	title: string;
	duration: number;
	order: number;
	type: string;
	status: string;
	link: string;
	currentTime?: number;
	previewImageLink: string;
	meta: null;
}