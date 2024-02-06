<script setup>
import {useApiRequest} from "@/composables/api/useApiRequest.js";
import {computed, watch} from "vue";

const {loading, isSuccess, isError} = useApiRequest()

const className = computed(() => {
  if (isSuccess.value) return 'success'
  if (isError.value) return 'error'
  if (loading.value) return 'loading'

  return null
})
</script>

<template>
  <div
      :class="className"
      class="response-indicator"
  />
</template>

<style scoped lang="scss">
.response-indicator {
  width: 100%;
  height: 4px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  transition: .5s ease;
}
.loading {
  background: #ffbc41;
}
.success {
  background: #00d500;
}
.error {
  background: #ff4f4f;
}
</style>