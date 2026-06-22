<script setup lang="ts">

// ── 构建时静态发现所有叶子专题 ──────────────────────

// import.meta.glob 在 Vite 构建时静态解析，
// VitePress SSR 直接输出 HTML，零运行时开销
const props = defineProps({
  allPages: {
    type: Array,
    default: () => [],
  },
})

const { allPages } = props

// ── 解析为导航结构 ──────────────────────────────────

interface NavItem {
  cat: string
  topics: string[]
}

let level = 1;

function buildNavData(): NavItem[] {
  const catMap = new Map<string, Set<string>>()

  for (const p of allPages) {
    const parts = p.replace('./', '').replace('/index.md', '').split('/')
    const cat = parts[0]
    
    // 跳过隐藏目录和特殊目录
    if (cat.startsWith('.') || cat.startsWith('[')) continue
    if (!catMap.has(cat)) catMap.set(cat, new Set())

    if (parts.length > 1) {
      level = 2;
      const topic = parts[1]

      // 跳过隐藏目录和特殊目录
      if (topic.startsWith('.') || topic.startsWith('[')) continue
      catMap.get(cat)!.add(topic)
    }
  }

  // 转为数组并按 拼音排序
  const result: NavItem[] = []
  for (const [cat, topicSet] of catMap) {
    result.push({
      cat,
      topics: [...topicSet].sort((a, b) => a.localeCompare(b, 'zh-CN')),
    })
  }

  return result
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