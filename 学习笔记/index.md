# 学习笔记

记录各技术领域的学习总结与心得。

<script setup lang="ts">
const allPages = Object.keys(
  import.meta.glob('./**/index.md', { eager: false })
)

</script>
<DocsNavgation :allPages="allPages" />