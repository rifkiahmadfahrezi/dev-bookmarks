<template>
  <div class="mt-5">
    <UButtonGroup>
        <UInput 
        icon="i-lucide-search"
        variant="soft"
        color="info"
        size="xl"
        placeholder="Search tools, APIs..." 
        type="search" v-model="value"
        autofocus
        />
        <CategoryDropdown />
        <UButton 
          @click="clearFilter"
          v-if="route.query.search || (route.query.category && String(route.query.category)?.toLowerCase() !== 'all')"
          icon="i-lucide-x" color="error" variant="soft">
          <span class="sr-only">Clear filters</span>
        </UButton>
    </UButtonGroup>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const value = ref(String(route.query.search || ""))

const clearFilter = () => {
  router.push({
    path: '/',
  })
}

watch(value, () => {
  router.push({
    path: '/',
    query: {
      ...route.query,
      search: value.value
    }
  })
})

</script>