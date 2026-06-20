<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        class="toast-notification-container"
      >
        {{ message }}
      </div>
      
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '../composables/useToast'
const { message, visible } = useToast()
</script>

<style scoped>
.toast-notification-container {
  position: fixed;
  top: var(--vp-nav-height);
  left: 50%;
  margin: 20px;
  transform: translateX(-50%);
  z-index: 50;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: var(--vp-c-gray-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  user-select: none;
}
.toast-enter-active {
  transition: all 0.3s ease-out;
}
.toast-leave-active {
  transition: all 0.25s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -12px);
}
</style>
