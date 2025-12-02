export type Project = {
	slug: string;
	title: string;
	image: string;

	shortDescription: string;

	// 🔥 description має бути масивом абзаців
	description: string[];

	// 🔥 techStack теж масив
	techStack: string[];

	// 🔥 ці два — опціональні
	link?: string;
	github?: string;
};
