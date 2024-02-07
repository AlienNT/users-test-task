<script setup>
defineProps({
  value: {
    type: String
  }
})
</script>

<template>
  <div class="user-form-title">
    {{ value }}
  </div>
</template>

<style scoped lang="scss">
.user-form-title {
  font-size: 16px;
  font-family: $FONT_MAIN;
  font-weight: 700;
  color: lighten($COLOR_FONT_MAIN, 15%);
  text-align: center;
  margin-bottom: 20px;
  padding: 10px 15px;
}
</style>