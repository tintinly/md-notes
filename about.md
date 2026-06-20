---
outline: false
pageClass: about-page-class
---

<script setup lang="ts">
    import { inject } from 'vue'
    const copyToClip = inject('copyToClip')
</script>

# 丁丁 <Badge type="tip" text="tintin" /> <Badge type="tip" text="tintinly" />

**关于本站 · About Site**





**关于我 · About Me**

- [个人主页](https://tintinly.top)
- [博客](https://blog.tintinly.top)
- [Github](tintinly.top/about)

**联系我 · Contact Me**

<p>
    <img src="https://img.shields.io/badge/WeChat-tintinly-07C160?logo=wechat" alt="Wechat" @click="copyToClip(tintinly)">
    <img src="https://img.shields.io/badge/QQ-821294434-54B4EF?logo=qq" alt="QQ" @click="copyToClip(821294434)">
    <a href="mailto:821294434@qq.com" target="_blank" rel="noreferrer">
    	<img src="https://img.shields.io/badge/Email-821294434@qq.com-EA4335?logo=Gmail" alt="Email">
    </a>
</p>
