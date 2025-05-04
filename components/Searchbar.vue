<template>
  <div class="mt-5">
    <UInput 
      trailing-icon="i-lucide-search"
      variant="soft"
      color="info"
      size="xl"
      placeholder="Search tools, APIs..." 
      type="search" v-model="value"
      />
  </div>
</template>

<script lang="ts" setup>
const value = ref("")
const router = useRouter()

watch(value, () => {
  router.push({ path: '/', query: { search: value.value }})
})
</script>