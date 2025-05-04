<template>
   <header class="sticky top-0 flex items-center justify-between z-50">
      <div class="p-3 bg-neutral-900 rounded-br-2xl relative">
         <UButton 
            color="info" href="/" icon="i-lucide-bookmark">
            <span class="sr-only">Dev bookmarks</span>
         </UButton>
      </div>

      <div class="flex items-center gap-2 p-3 bg-neutral-900 rounded-bl-2xl">
         <UButton 
            href="https://github.com/rifkiahmadfahrezi/dev-bookmarks/"
            target="_blank"
            con="i-lucide-github" color="secondary" variant="ghost">
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