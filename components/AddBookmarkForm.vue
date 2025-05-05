<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
const newCategory = ref(false)
const categoryInput = ref("")

const schema = z.object({
  name: z.string().min(1, { message: "Field name is required"}),
  url: z.string().url({ message: "Url  not valid" }).min(1, { message: "Field Url is required"}),
  description: z.string().min(10, { message: "Field description must be atleast 10 characters"}),
  category: z.array(z.string()).min(1, { message: "Must have at least 1 category" })
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  url: '',
  description: '',
  category: ['']
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { name, url, description, category } = event.data

  const config = {
    username: "rifkiahmadfahrezi",
    repo: "dev-bookmarks",
    branch: `master`,
    path: "content/bookmarks",
    fileName: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}.json`
  }

  const filteredCategory = category.filter(c => !!c)
  const encoded = encodeURIComponent(JSON.stringify({ name, url, description, category: filteredCategory  }, null, 2))
  const githubURL = `https://github.com/${config.username}/${config.repo}/new/${config.branch}/${config.path}?filename=${config.fileName}&value=${encoded}`

  window.open(githubURL, "_blank")
}



const { data: categories } = await useAsyncData('bookmarks-categories', () =>
  queryCollection('bookmarks').select("categories").all(),
  { server: false }
)

const uniqueCategories = computed(() => {
  if (!categories.value) return []

  const allCategories = categories.value.flatMap(item => item.categories || [])
  return [...new Set(allCategories)]
})

</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4 sm:w-96" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-3">
      <UFormField label="Name" name="name">
        <UInput
          color="info" 
          placeholder="Tools abc..."
          class="w-full" 
          v-model="state.name" />
        </UFormField>
        <UFormField label="Url" name="url">
          <UInput
            color="info" class="w-full" 
            placeholder="https://..."
            v-model="state.url" 
            type="url" />
      </UFormField>
    <UFormField class="col-span-2" label="Description" name="description">
      <UTextarea
        color="info" 
        placeholder="Description..."
        class="w-full" 
        v-model="state.description"/>
    </UFormField>
    
    <UFormField class="col-span-2" label="Category" name="category">
      <USelectMenu 
        v-if="!newCategory" 
        v-model="state.category" 
        multiple 
        :items="uniqueCategories" 
        class="w-full" />
      
      <!-- Input for adding new categories -->
      <div v-if="newCategory" class="flex gap-1 mb-2">
        <UBadge variant="subtle" color="info" v-for="cat of state.category">
          {{ cat }}
        </UBadge>
      </div>
      <UInput
        v-if="newCategory" 
        color="info" 
        class="w-full my-1" 
        placeholder="PHP, laravel..."
        type="text"
        v-model="categoryInput"
        @change="() => {
          state.category = categoryInput.trim().split(',')
        }" />
        <span v-if="newCategory" class="text-xs">Separate category with comma (,)</span>
      </UFormField>
      
    </div>
    <UButton 
      color="info"
      type="submit">
      Submit
    </UButton>
  </UForm>

  <label class="flex items-center gap-1 mt-3">
    <USwitch @change="state.category = []" v-model="newCategory" />
    Add new category
  </label>

</template>

