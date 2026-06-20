<!-- 
 扩展功能如下 
 1. 复制代码到剪贴板
 2. 明暗模式切换时提供自定义过渡动画

-->


<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme';
import { nextTick, provide  } from 'vue'
import { useToast } from '../composables/useToast'


// 定义复制方法
const copyToClip = async (text) => {
  var aux = document.createElement("input");
  aux.setAttribute("value", text);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  useToast().show("复制成功!")
}
provide('copyToClip', copyToClip)

// 明暗切换时提供自定义过渡动画
const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      fill: 'forwards',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <!-- 在侧边栏大纲之前插入自定义内容 -->
    <template #aside-outline-after>
    </template>
  </DefaultTheme.Layout>
  <!-- 全局 Toast 通知 -->
  <ClientOnly>
    <ToastNotification />
  </ClientOnly>
</template>


<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

/* .VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
} */
</style>