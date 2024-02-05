<script setup>
defineProps({
  value: {
    type: String
  }
})
</script>

<template>
  <div class="user-first-name">
    {{ value }}
  </div>
</template>

<style scoped lang="scss">
.user-first-name {
  font-family: $FONT_MAIN;
  font-weight: 700;
  color: $COLOR_FONT_MAIN;
  cursor: pointer;
  transition: .2s ease;
  padding: 10px 0;
  word-break: break-all;
  @media #{$MOUSE_DEVICE} {
    &:hover {
      color: lighten($COLOR_FONT_MAIN, 15%);
    }
  }
}
</style>