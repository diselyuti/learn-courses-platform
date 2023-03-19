import type {CourseMeta} from "@/types/CourseMeta";
import type {Lesson} from "@/types/Lesson";

export interface Course {
	id: string;
	title: string;
	tags: string[];
	launchDate: string;
	status: string;
	description: string;
	duration: number;
	lessonsCount: number;
	containsLockedLessons: boolean;
	previewImageLink: string;
	rating: number;
	meta: CourseMeta;
	lessons?: Lesson[];
}