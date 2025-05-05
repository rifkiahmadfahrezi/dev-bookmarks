<template>
  <UApp>
    <div class="bg-default" data-vaul-drawer-wrapper>
      <TopHeader/>
      <main class="max-w-screen-lg px-3 mx-auto mb-20">
        <Hero />
        <BookmarkList />
      </main>
    </div>
  </UApp>
</template>

<script lang="ts" setup>
import { siteConfig } from './config/site';
useSeoMeta({
  title: siteConfig.name,
  ogTitle: siteConfig.name,
  description: siteConfig.description,
  ogDescription: siteConfig.description,
  ogImage: siteConfig.ogImage,
  twitterTitle: siteConfig.name,
  twitterDescription: siteConfig.description,
  twitterImage: siteConfig.ogImage,
  twitterCard: "summary",
  ogUrl: siteConfig.ogImage
})
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ""
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    }
  ]
})
</script>