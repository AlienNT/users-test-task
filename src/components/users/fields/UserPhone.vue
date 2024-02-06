<script setup>
defineProps({
  value: {
    type: String,
  },
  label: {
    type: String
  }
})
</script>

<template>
  <div class="user-phone">
    <a :href="`tel:${value}`">
      {{ label || value }}
    </a>
  </div>
</template>

<style scoped lang="scss">

</style>