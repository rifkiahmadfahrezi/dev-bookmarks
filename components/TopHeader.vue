<template>
   <header class="sticky top-0 flex items-center justify-between max-w-screen-xl mx-auto isolate z-40">
      <span aria-hidden="true" class="fixed left-0 top-0 h-5 w-full z-10 bg-default"></span>
      <div class="p-3 bg-default mt-5 rounded-br-2xl relative z-50">
         <span 
            class="absolute size-5 bg-transparent top-0 -right-5 rounded-tl-2xl shadow-[-5px_-5px_0_var(--ui-bg)]"
            aria-hidden="true"></span>
            <NuxtLink 
            class="flex items-center gap-2"
            href="/">
            <NuxtImg src="/logo.svg" class="size-8" preload />
            <span>Dev bookmarks</span>
         </NuxtLink>
      </div>
      
      <div class="flex items-center gap-2 p-3 bg-default mt-5 rounded-bl-2xl z-50 relative">
         <span 
            class="absolute size-5 bg-transparent -left-5 top-0 rounded-tr-2xl shadow-[5px_-5px_0_var(--ui-bg)]"
            aria-hidden="true"></span>
         <UButton 
            href="https://github.com/rifkiahmadfahrezi/dev-bookmarks/"
            target="_blank"
            icon="i-lucide-github" color="secondary" variant="ghost">
            <span class="sr-only">Github</span>
         </UButton>
         <CreateBookmark />
      </div>
   </header>
</template> 