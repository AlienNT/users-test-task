<script setup>
defineProps({
  value: {
    type: String
  }
})
</script>

<template>
  <span class="input-field-title">{{ value }}</span>
</template>

<style scoped lang="scss">

.input-field-title {
  display: block;
  transition: .2s ease;
  position: absolute;
  left: 15px;
  transform: translateY(-50%);
  font-size: 12px;
  border-radius: 5px;
  padding: 3px 6px;
  letter-spacing: 1px;
  font-family: $FONT_MAIN;
  font-weight: 300;
  top: 0;
  background: lighten($COLOR_FONT_MAIN, 10%);
  color: $COLOR_MAIN_LIGHT;

  [readonly] & {
    background: lighten($COLOR_FONT_MAIN, 20%);
  }
}
</style>