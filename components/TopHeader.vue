<template>
   <header class="sticky top-0 flex items-center justify-between max-w-screen-xl mx-auto isolate">
      <span aria-hidden="true" class="fixed left-0 top-0 h-5 w-full z-10 bg-neutral-900"></span>
      <div class="p-3 bg-neutral-900 rounded-br-2xl relative z-50">
         <NuxtLink 
            href="/">
            <NuxtImg src="/logo.svg" class="size-8" preload />
            <span class="sr-only">Dev bookmarks</span>
         </NuxtLink>
      </div>

      <div class="flex items-center gap-2 p-3 bg-neutral-900 rounded-bl-2xl z-50">
         <UButton 
            href="https://github.com/rifkiahmadfahrezi/dev-bookmarks/"
            target="_blank"
            icon="i-lucide-github" color="secondary" variant="ghost">
            <span class="sr-only">Github</span>
         </UButton>
         <UButton
            href="https://github.com/rifkiahmadfahrezi/dev-bookmarks/"
            target="_blank"
            color="secondary">
            Submit
         </UButton>
      </div>
   </header>
</template> 