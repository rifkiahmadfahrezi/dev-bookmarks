<template>
  <USelectMenu  
    variant="soft"
    size="xl"
    v-model="value"
    class="w-40"
    :items="uniqueCategories"
  />
</template>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const value = ref(String(route.query.category || "All"))

watch(value, () => {
  router.push({
    path: '/',
    query: {
      ...route.query, 
      category: value.value
    }
  })
})

const { data: categories } = await useAsyncData('bookmarks-categories', () =>
  queryCollection('bookmarks').select("categories").all(),
  { server: false }
)

const uniqueCategories = computed(() => {
  if (!categories.value) return []

  const allCategories = categories.value.flatMap(item => item.categories || [])
  return ["All", ...new Set(allCategories)]
})
</script>
