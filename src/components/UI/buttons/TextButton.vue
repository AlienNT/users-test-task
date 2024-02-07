<script setup>
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  buttonLabel: {
    type: String,
    default: 'button'
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  isLight: {
    type: Boolean,
    default: false
  },
  isDark: {
    type: Boolean,
    default: false
  }
})

defineEmits(['onClick'])

const classList = computed(() => [
  props.isDark ? 'dark' : '',
  props.isLight && !props.isDark ? 'light' : ''
].join(' '))
</script>

<template>
  <button
      class="text-button"
      :type="type"
      :disabled="isDisabled"
      :class="classList"
      @click="$emit('onClick')"
  >
    {{ buttonLabel }}
  </button>
</template>

<style scoped lang="scss">
.text-button {
  padding: 10px 20px;
  display: block;
  border-radius: 5px;
  transition: .2s ease;
  cursor: pointer;
}

.light {
  background: $COLOR_MAIN_LIGHT;
  color: lighten($COLOR_FONT_MAIN, 15%);
  border: 1px solid lighten($COLOR_FONT_MAIN, 15%);

  @media #{$MOUSE_DEVICE} {
    &:hover {
      color: $COLOR_MAIN_LIGHT;
      background: lighten($COLOR_FONT_MAIN, 15%);
    }
  }
}

.dark {
  background: darken($COLOR_BG_MAIN, 5%);
  color: $COLOR_MAIN_LIGHT;

  @media #{$MOUSE_DEVICE} {
    &:hover {
      background: darken($COLOR_BG_MAIN, 8%);
    }
  }
}
</style>