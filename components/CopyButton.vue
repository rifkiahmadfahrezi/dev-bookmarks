<template>
  <UButton
    color="info"
    :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
    variant="soft"
    @click="handleClick"
  >
    {{ copied ? 'Copied!' : 'Copy' }}
  </UButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const { text } = defineProps<{ text: string }>()
const copied = ref(false)

const handleClick = async () => {
  try {
    await navigator.clipboard.writeText(text + '?ref=dev-bookmarks')
    copied.value = true
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>
