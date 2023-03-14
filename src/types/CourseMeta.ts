import type {CourseVideoPreview} from "@/types/CourseVideoPreview";

export interface CourseMeta {
	slug: string;
	skills: string[];
	courseVideoPreview: CourseVideoPreview;
}