<script setup>
defineProps({
  value: {
    type: String
  }
})
</script>

<template>
  <div class="user-last-name">
    {{ value }}
  </div>
</template>

<style scoped lang="scss">
.user-last-name {
  word-break: break-all;
}
</style>