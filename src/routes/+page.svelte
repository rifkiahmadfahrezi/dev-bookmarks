<script lang="ts">
	import { resources } from '../data/resources';
	import {
		categories,
		type Category,
		type Resource,
		languages,
		type Language
	} from '../data/types';

	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	// filters state
	let category = $state('');
	let language = $state('');
	let keyword = $state(page.url.searchParams.get('search')?.toLowerCase() ?? '');

	const filterResource = (
		c: Category | string = '',
		l: Language | string = '',
		q: string = ''
	): Resource[] => {
		return resources.filter(({ categories, label, languages, url }) => {
			const matchesCategory = c ? categories.includes(c as Category) : true;
			const matchesLanguage = l
				? (languages?.some((lang) => lang.toLowerCase() === l.toLowerCase()) ?? false)
				: true;
			const matchesKeyword = q
				? label.toLowerCase().includes(q.toLowerCase()) ||
					url.toLowerCase().includes(q.toLowerCase())
				: true;

			return matchesCategory && matchesLanguage && matchesKeyword;
		});
	};

	const filteredResource = $derived(filterResource(category, language, keyword));

	const handleSearch = (e: Event) => {
		keyword = (e.target as HTMLInputElement).value;

		// set url query
		const params = new URLSearchParams(window.location.search);
		params.set('search', keyword); // Update or add new query param

		goto(`?${params.toString()}`, { replaceState: true });
	};
</script>

<svelte:head>
	<title>Dev bookmarks</title>
	<meta
		name="description"
		content="A list of useful websites for developers, can be tools, courses,  libraries or UI library"
	/>
	<meta name="keyword" content="dev website, useful dev, dev resource" />
</svelte:head>

<main class="mx-auto my-10 max-w-screen-lg px-3">
	<div
		class="sticky top-0 z-50 my-6 flex scroll-m-4 flex-wrap items-center justify-between bg-gray-100 px-2 py-4"
	>
		<div class="">
			<h1 class="text-3xl font-semibold">Dev bookmarks</h1>
			<p>A list of useful websites for developers</p>
			<a class="text-xs underline" href="https://github.com/rifkiahmadfahrezi" target="_blank"
				>contribute</a
			>
		</div>
		<div
			class="mt-3 flex grow items-center justify-between rounded-md border border-gray-300 bg-white pr-3 md:mt-0 md:grow-0"
		>
			<input
				bind:value={keyword}
				onchange={handleSearch}
				class="w-full max-w-sm px-4 py-2"
				type="search"
				placeholder="Search..."
			/>
			<select
				title="select category"
				aria-label="select category"
				bind:value={category}
				class="px-4 py-2"
				name="category"
				id="category"
			>
				<option selected value="" disabled>Category</option>
				<option value="">All</option>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
			<select
				title="select language"
				aria-label="select language"
				bind:value={language}
				class="px-4 py-2"
				name="language"
				id="language"
			>
				<option selected value="" disabled>Language</option>
				<option value="">All</option>
				{#each languages as language}
					<option value={language}>{language}</option>
				{/each}
			</select>
		</div>
	</div>
	{#if filteredResource.length === 0}
		<p>{keyword ? `No results on '${keyword}'` : 'There is no resources to show'}</p>
	{:else}
		<div class="my-10 flex flex-wrap gap-4">
			{#each filteredResource as resource}
				<a
					title={resource.label}
					target="_blank"
					class="group relative flex-grow rounded-lg border border-gray-300 bg-white p-3 pt-5 transition duration-300 ease-in-out [transition-timing-function:cubic-bezier(0.45,0,0.55,1)] md:hover:-translate-y-1 md:hover:shadow-xl md:focus:-translate-y-1 md:focus:shadow-xl"
					href={resource.url}
				>
					<div>
						<svg
							class="absolute top-2 right-2 size-5 text-slate-500 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-slate-950"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"
							></path></svg
						>
						<div class="mb-5">
							<h1 class="line-clamp-2 text-lg font-semibold capitalize">{resource.label}</h1>
							<span class="line-clamp-1 underline">{resource.url.split('/')[2]}</span>
						</div>
						<div class="flex flex-wrap gap-1">
							{#each resource.categories as c}
								<span
									class="mt-1 w-fit rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-950 capitalize"
									>{c}</span
								>
							{/each}
						</div>
						{#if resource.languages}
							<div class="flex flex-wrap gap-1">
								{#each resource.languages as l}
									<span
										class="mt-1 w-fit rounded-full bg-pink-100 px-2 py-1 text-xs text-pink-950 capitalize"
										>{l}</span
									>
								{/each}
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</main>
