<script setup>
import {computed, reactive} from "vue";
import {debounce} from "@/helpers/index.js";

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
  debounceTimeout: {
    type: Number,
    default: null
  },
  readonly: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits([
  'onInput',
  'onChange',
  'onBlur',
  'onFocus'
])

const displayedPlaceholder = computed(() => {
  return props.placeholder ?
      props.placeholder[0].toUpperCase() + props.placeholder.slice(1, props.placeholder.length) :
      null
})

const state = reactive({
  editedValue: null,
  emitType: null
})

const debounceInput = debounce(() => {
  emit(state.emitType, state.editedValue)
}, props.debounceTimeout)

function inputHandler(e, emitType) {
  state.editedValue = e.target.value
  state.emitType = emitType

  debounceInput()
}
</script>

<template>
  <input
      :type="type"
      :placeholder="displayedPlaceholder"
      :value="value"
      :readonly="readonly"
      :disabled="readonly"
      @input="e => inputHandler(e, 'onInput')"
      @change="e => inputHandler(e, 'onChange')"
      @blur="e => $emit('onBlur', e.target.value)"
      @focus="e => !readonly && $emit('onFocus', e.target.value)"
  >
</template>

<style scoped lang="scss">
label {
  display: flex;
}

input,
.readonly-field {
  padding: 15px;
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

  background: white;

  &[readonly] {
    background: darken(white, 15%);
  }
}
</style>