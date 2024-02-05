<script setup>
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String
  },
  className: {
    type: String
  },
  value: {
    type: [String, Number]
  },
})

defineEmits([
  'onInput',
  'onChange',
  'onBlur'
])

const displayedPlaceholder = computed(() => {
  return props.placeholder ?
      props.placeholder[0].toUpperCase() + props.placeholder.slice(1, props.placeholder.length) :
      null
})

</script>

<template>
  <input
      :type="type"
      :placeholder="displayedPlaceholder"
      :value="value"
      @input="e => $emit('onInput', e.target.value)"
      @change="e => $emit('onChange', e.target.value)"
      @blur="e => $emit('onBlur', e.target.value)"
  >
</template>

<style scoped lang="scss">
label {
  display: flex;
}

input {
  padding: 10px 15px;
  border-radius: 5px;
  transition: .2s ease;

  &::placeholder {
    transition: .2s ease;
    color: $COLOR_FONT_MAIN;
  }

  &:focus {
    &::placeholder {
      color: transparent;
    }
  }
}


</style>