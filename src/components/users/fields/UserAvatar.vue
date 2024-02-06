<script setup>
import VImage from "@/components/UI/VImage.vue";

const props = defineProps({
  src: {
    type: String
  },
  alt: {
    type: String
  },
  initial: {
    type: String
  },
  fontSize: {
    type: Number
  }
})
</script>

<template>
  <div class="user-list-avatar">
    <VImage
        :src="src"
        :alt="alt"
        :initial="initial"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../../../assets/css/transitions";

.user-list-avatar {
  flex: 1;
  width: 100%;
  min-width: 40px;
}
</style>