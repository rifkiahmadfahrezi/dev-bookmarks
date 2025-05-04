import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    bookmarks: defineCollection({
      type: "data",
      source: "bookmarks/**.json",
      schema: z.object({
        title: z.string(),
        name: z.string(),
        description: z.string(),
        url: z.string(),
        categories: z.array(z.string())
      })
    })
  },
})

