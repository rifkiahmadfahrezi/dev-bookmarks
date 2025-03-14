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

	const showFilterModal = () => {
		(document.getElementById('filter-modal') as HTMLDialogElement)?.showModal();
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
	<div class="bg-base-100 sticky top-0 z-50 my-6 px-2 pt-2 pb-4">
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
			<div class="join pr-3 md:mt-0 md:grow-0">
				<input
					bind:value={keyword}
					onchange={handleSearch}
					class="join-item input w-full max-w-sm"
					type="search"
					placeholder="Search..."
				/>
				<select
					title="select language"
					aria-label="select language"
					bind:value={language}
					class="join-item select"
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
		<button class="btn" onclick={showFilterModal}>Categories</button>
		<dialog id="filter-modal" class="modal">
			<div class="modal-box w-11/12 max-w-5xl">
				<h1>Filter by category</h1>
				<div class="my-2 flex flex-wrap gap-1">
					{#each categories as c}
						<label class="badge badge-primary" for={c}>
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
				<div class="modal-action">
					<form method="dialog">
						<!-- if there is a button, it will close the modal -->
						<button class="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>
		{#if category.length != 0}
			<div class="mt-2 flex flex-wrap items-center gap-1">
				<span>Categories</span>
				{#each category as c}
					<span class="badge badge-primary">{c}</span>
				{/each}
			</div>
			<button class="btn btn-error" onclick={() => (category = [])}>clear</button>
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
					class="group card border-primary/50 relative flex-grow border p-3 pt-6"
					href={resource.url}
				>
					<div>
						<svg
							class="text-primary/50 group-hover:text-primary absolute top-2 right-2 size-5 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							><path
								d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"
							></path></svg
						>
						<div class="mb-5">
							<h1 class="card-title line-clamp-2">{resource.label}</h1>
							<span class="line-clamp-1 underline">{resource.url.split('/')[2]}</span>
						</div>
						<div class="flex flex-wrap gap-1">
							{#each resource.categories as c}
								<span class="badge badge-primary capitalize">{c}</span>
							{/each}
						</div>
						{#if resource.languages}
							<div class="mt-1 flex flex-wrap gap-1">
								{#each resource.languages as l}
									<span class="badge badge-secondary capitalize">{l}</span>
								{/each}
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</main>
