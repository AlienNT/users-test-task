<script setup>
import {computed, reactive} from "vue";

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

const state = reactive({
  isLoad: false,
  isError: false
})

function onLoad() {
  state.isError = false
  state.isLoad = true
}

function onError() {
  state.isError = false
  state.isLoad = false
}

const showImage = computed(() => {
  return state.isLoad && !state.isError && !!props.src?.length
})

const showInitial = computed(() => {
  return !state.isLoad || state.isError || !props.src?.length
})

const style = computed(() => [
  props.fontSize ? `font-size: ${props.fontSize}px` : ''
].join('; '))

</script>

<template>
  <div class="image-wrapper">
    <div class="image">
      <img
          v-show="showImage"
          :src="src"
          :alt="alt"
          @load="onLoad"
          @error="onError"
      >
      <div
          class="initial"
          :class="showInitial && 'show'"
          :style="style"
      >
        {{ initial }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">


.image-wrapper {
  position: relative;
  width: 0;
  height: 0;
  padding-left: 100%;
  padding-top: 100%;
  border-radius: 50%;
  overflow: hidden;
  transition: .2s ease;
}

.initial,
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: .5s ease;
}

img {
  display: block;
  object-fit: cover;
}

.initial {
  color: $COLOR_MAIN_LIGHT;
  background: rgb(102, 151, 212);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  &.show {
    opacity: 1;
  }
}
</style>