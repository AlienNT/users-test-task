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
$color: #3a77bd;
.user-list-email {
  font-family: $FONT_MAIN;
  color: $color;
  text-decoration: none;
  transition: .2s ease;
  font-weight: 500;

  &:hover {
    color: lighten($color, 15%);
  }
}
</style>