<script setup>
defineProps({
  value: {
    type: String
  },
  label: {
    type: String
  }
})
</script>

<template>
  <div class="user-list-email">
    <a :href="'mailto:' + value">
      {{ label || value }}
    </a>
  </div>
</template>

<style scoped lang="scss">
.user-list-email {
  font-family: $FONT_MAIN;
  color: $COLOR_FONT_MAIN_LIGHT;
  text-decoration: none;
  transition: .2s ease;
  font-weight: 500;
  @media #{$MOUSE_DEVICE} {
    &:hover {
      color: lighten($COLOR_FONT_MAIN_LIGHT, 15%);
    }
  }
}
</style>