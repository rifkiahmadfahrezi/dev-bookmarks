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
	let category: Category[] = $state([]);
	let language = $state('');
	let keyword = $state(page.url.searchParams.get('search')?.toLowerCase() ?? '');

	const filterResource = (
		c: Category[] | null,
		l: Language | string = '',
		q: string = ''
	): Resource[] => {
		return resources.filter(({ categories, label, languages, url }) => {
			const matchesCategory = c ? c.every((cat) => categories.includes(cat)) : true;
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

	const filterCategory = (c: Category) => {
		if (category.includes(c)) {
			category = category.filter((cat) => cat != c);
			return;
		}
		category.push(c);
		console.log(category);
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
	<div class="sticky top-0 z-50 my-6 bg-gray-100 px-2 pt-2 pb-4">
		<div class="flex scroll-m-4 flex-wrap items-center justify-between">
			<div class="">
				<h1 class="text-3xl font-semibold">Dev bookmarks</h1>
				<p>A list of useful websites for developers</p>
				<a
					class="text-xs underline"
					href="https://github.com/rifkiahmadfahrezi/dev-bookmarks/"
					target="_blank">contribute</a
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
					title="select language"
					aria-label="select language"
					bind:value={language}
					class="px-4 py-2"
					name="select-language"
					id="select-language"
				>
					<option selected value="" disabled>Language</option>
					<option value="">All</option>
					{#each languages as language}
						<option value={language}>{language}</option>
					{/each}
				</select>
			</div>
		</div>
		<details class="my-4 w-full">
			<summary class="hidden w-fit rounded-full bg-blue-500 px-2 py-1 text-blue-50 md:block">
				<span id="filter-toggle" role="term" aria-details="toggle-category-filter" class="hidden"
					>Filter by category</span
				>
			</summary>
		</details>
		<div role="definition" id="toggle-category-filter" class="content">
			<div class="my-2 flex flex-wrap gap-1">
				{#each categories as c}
					<label class="rounded-full bg-gray-300 px-2 py-1" for={c}>
						<input
							checked={category.includes(c)}
							onclick={() => filterCategory(c)}
							type="checkbox"
							name={c}
							id={c}
						/>
						{c}
					</label>
				{/each}
			</div>
		</div>
		{#if category.length != 0}
			<div class="flex flex-wrap items-center gap-1">
				<span>Categories</span>
				{#each category as c}
					<span class="rounded-full bg-blue-200 px-2 py-1 text-blue-950">{c}</span>
				{/each}
			</div>
			<button class="rounded-md bg-red-500 px-2 py-1 text-white" onclick={() => (category = [])}
				>clear</button
			>
		{/if}
	</div>
	{#if filteredResource.length === 0}
		<p>{keyword ? `No results on '${keyword}'` : 'There is no resources to show'}</p>
	{:else}
		<div class="my-5 flex flex-wrap gap-4">
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

<style>
	details {
		overflow: hidden; /* Keep this line to prevent an odd blue outline around the element in Safari. */
	}

	summary {
		display: block;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	#filter-toggle {
		position: relative;
		display: flex;
		align-items: center;
	}

	#filter-toggle:hover {
		cursor: pointer;
	}

	#filter-toggle::before {
		content: '+';
		font-size: 1rem;
		display: flex;
		align-items: center;
		margin-right: 0.5rem;
		transition: rotate 200ms 400ms ease-out;
	}

	div.content {
		box-sizing: border-box;
		max-height: 0;
		overflow: hidden;
		padding: 0 10px;
		border: 2px solid transparent;
		transition:
			max-height 400ms ease-out,
			border 0ms 400ms linear;
	}

	details[open] + div.content {
		max-height: 100vh;
		transition:
			max-height 400ms ease-out,
			border 0ms linear;
	}

	details[open] #filter-toggle::before {
		rotate: 90deg;
		transition: rotate 200ms ease-out;
	}
</style>
