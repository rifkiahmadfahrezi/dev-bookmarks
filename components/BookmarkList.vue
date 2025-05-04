<template>
  <ul class="flex flex-wrap justify-center gap-3" >
    <li class="flex-grow" v-for="bookmark of bookmarks" >
      <UCard variant="soft">
        <template #header>
          <div class="flex gap-1 flex-wrap my-3" >
            <UBadge v-for="category of bookmark.categories" color="info" variant="soft">{{ category }}</UBadge>
          </div>
          <h4 class="font-semibold text-lg">
            <NuxtLink
              :href="`${bookmark.url}?ref=dev-bookmarks`"
              target="_blank" 
              rel="noopener noreferrer"  
              >
              {{ bookmark.name }}
            </NuxtLink>
          </h4>
        </template>
        
        <p>{{ bookmark.description }}</p>
        <template #footer>
          <div class="flex items-center gap-1">
            <UButton  
              :href="`${bookmark.url}?ref=dev-bookmarks`"
              target="_blank" 
              rel="noopener noreferrer"
              color="secondary"
              trailing-icon="i-lucide-arrow-up-right" >
              Visit
            </UButton>
          <CopyButton :text="bookmark.url + '?ref=dev-bookmarks'" />
        </div>
        </template>
      </UCard>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const { data : bookmarks } = await useAsyncData('bookmarks', () => queryCollection("bookmarks").all())
</script>