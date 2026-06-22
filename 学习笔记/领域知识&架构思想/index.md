<script setup lang="ts">
const allPages = Object.keys(
  import.meta.glob(['./**/index.md', '!./index.md'], { eager: false })
)
</script>
<DocsNavgation :allPages="allPages" />