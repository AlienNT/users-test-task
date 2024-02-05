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
  state.isError = true
  state.isLoad = false
}

const showImage = computed(() => {
  return state.isLoad && !state.isError && props.src
})

const showInitial = computed(() => {
  return !state.isLoad || state.isError || !props.src
})

const style = computed(() => [
  props.fontSize ? `font-size: ${props.fontSize}px` : ''
].join('; '))
</script>

<template>
  <div class="user-list-avatar">
    <div class="image-wrapper">
      <transition name="fade" appear :duration="2000">
        <img
            v-show="showImage"
            :src="src"
            :alt="alt"
            @load="onLoad"
            @error="onError"
        >
      </transition>
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
@import "../../../assets/css/transitions";

.user-list-avatar {
  flex: 1;
  width: 100%;
  min-width: 40px;
}

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
  color: #f3f3f3;
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