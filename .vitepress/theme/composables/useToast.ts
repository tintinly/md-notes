// useToast — 全局弹窗提示
import { ref, readonly } from 'vue'
const message = ref('')
const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

export function useToast() {
  function show(msg: string, duration = 2000) {
    if (timer) clearTimeout(timer)
    message.value = msg
    visible.value = true
    timer = setTimeout(() => {
      visible.value = false
    }, duration)
  }

  return { message: readonly(message), visible: readonly(visible), show }
}
