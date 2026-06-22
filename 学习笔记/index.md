<script setup lang="ts">
const allPages = Object.keys(
  import.meta.glob(['./**/index.md', '!./index.md'], { eager: false })
)
</script>

# 学习笔记

记录各技术领域的学习笔记

<DocsNavgation :allPages="allPages" />




