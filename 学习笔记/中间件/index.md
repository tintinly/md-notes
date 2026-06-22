---
order: 4
---

<script setup lang="ts">
const allPages = Object.entries(
  import.meta.glob(['./**/index.md', '!./index.md'], { eager: true })
)
  .map(([path, mod]) => ({
    path,
    order: (mod as any).__pageData?.frontmatter?.order ?? 99
  }))
  .sort((a, b) => a.order - b.order)

</script>
<DocsNavgation :allPages="allPages" />