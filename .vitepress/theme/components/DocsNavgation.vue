<script setup lang="ts">

// ── 构建时静态发现所有叶子专题 ──────────────────────

// import.meta.glob 在 Vite 构建时静态解析，
// VitePress SSR 直接输出 HTML，零运行时开销

interface PageInfo {
  path: string
  order: number
}

const props = defineProps({
  allPages: {
    type: Array as () => PageInfo[],
    default: () => [],
  },
})

const { allPages } = props

// ── 解析为导航结构 ──────────────────────────────────

interface NavItem {
  cat: string
  topics: string[]
}

let level = 1

function buildNavData(): NavItem[] {
  // cat → { order, topic → order }
  const catMap = new Map<string, { order: number; topics: Map<string, number> }>()

  for (const p of allPages as PageInfo[]) {
    const parts = p.path.replace('./', '').replace('/index.md', '').split('/')
    const cat = parts[0]

    // 跳过隐藏目录和特殊目录
    if (cat.startsWith('.') || cat.startsWith('[')) continue
    if (!catMap.has(cat)) {
      catMap.set(cat, { order: 99, topics: new Map() })
    }

    if (parts.length > 1) {
      level = 2
      const topic = parts[1]

      // 跳过隐藏目录和特殊目录
      if (topic.startsWith('.') || topic.startsWith('[')) continue
      catMap.get(cat)!.topics.set(topic, p.order)
    } else {
      // 分类自身的 index.md，更新分类 order
      catMap.get(cat)!.order = p.order
    }
  }

  // 按 order 排序：分类排序 + 专题排序
  return [...catMap.entries()]
    .sort((a, b) => a[1].order - b[1].order)
    .map(([cat, info]) => ({
      cat,
      topics: [...info.topics.entries()]
        .sort((a, b) => a[1] - b[1])
        .map(([name]) => name),
    }))
}

const navData = buildNavData()
</script>

<template>
  <div v-if="level === 1">
    <ul v-for="item in navData" :key="item.cat">
      <li :id="item.cat">
        <a :href="'./' + item.cat + '/'">{{ item.cat }}</a>
          <ul>
            <li v-for="topic in item.topics" :key="topic">
              <a :href="'./' + item.cat + '/' + topic + '/'">{{ topic }}</a>
            </li>
          </ul>
      </li>
    </ul>
  </div>
  <div v-else-if="level === 2">
    <div v-for="item in navData" :key="item.cat">
      <h3 :id="item.cat">
        <a :href="'./' + item.cat + '/'">{{ item.cat }}</a>
      </h3>
      <ul>
            <li v-for="topic in item.topics" :key="topic">
              <a :href="'./' + item.cat + '/' + topic + '/'">{{ topic }}</a>
            </li>
          </ul>
    </div>
  </div>
</template>
