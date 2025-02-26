export type Resource = {
	label: string;
	url: `https://${string}`;
	categories: Category[];
	languages?: Language[];
};

export const categories = [
	'inspiration',
	'resource',
	'learn',
	'language',
	'linux',
	'react',
	'typescript',
	'javascript',
	'frontend',
	'backend',
	'UI',
	'UI',
	'figma',
	'tools',
	'shadcn',
	'icon',
	'motion',
	'vue',
	'svelte',
	'angular',
	'solid',
	'preact',
	'interview',
	'nextjs'
] as const;

export const languages = ['ID', 'EN'];

export type Category = (typeof categories)[number];
export type Language = (typeof languages)[number];
