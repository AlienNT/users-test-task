<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  icon: {
    type: String
  },
  width: {
    type: Number,
    default: 30
  },
  height: {
    type: Number,
    default: 30
  },
  color: {
    type: String
  },
  hoverColor: {
    type: String
  },
  title: {
    type: String
  }
})

const emit = defineEmits(['onClick'])

const hovered = ref(false)

const style = computed(() => [
  props.icon ? `mask-image: url(${props.icon})` : '',
  props.width ? `width: ${props.width}px` : '',
  props.height ? `height: ${props.height}px` : '',
  props.color ? `background-color: ${hovered.value && props.hoverColor ? props.hoverColor : props.color}` : '',
].join('; '))
</script>

<template>
  <button
      class="button"
      :type="type"
      :title="title"
      :style="style"
      @click="emit('onClick')"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
  />
</template>

<style scoped lang="scss">
.button {
  flex: none;
  transition: background-color .2s ease;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  cursor: pointer;
}
</style>