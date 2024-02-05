<script setup>
defineProps({
  href: {
    type: String
  },
  value: {
    type: String
  }
})
</script>

<template>
  <a
      :href="'mailto:' + href"
      class="user-list-email"
  >
    {{ value || href }}
  </a>
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