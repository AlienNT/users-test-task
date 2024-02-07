<script setup>
import {computed, ref} from "vue";

import VInput from "@/components/UI/VInput.vue";
import FieldTitle from "@/components/UI/FieldTitle.vue";

const props = defineProps({
  value: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String
  },
  validator: {
    type: Function
  },
  validationResult: {
    type: Array,
    default: null
  },
  isValid: {
    type: Boolean,
    default: null
  },
  debounceTimeout: {
    type: Number
  },
  readonly: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits(['onInput'])

const isChanged = ref(false)
const isFocus = ref(false)

const errorMessage = computed(() => {
  return props.validationResult?.find(res => typeof res !== "boolean")
})

const className = computed(() => {
  return [
    !props.isValid && props.isValid !== null && 'error',
    props.isValid && 'valid'
  ].join(' ')
})

function sendInputValue(e) {
  isChanged.value = true
  isFocus.value = false

  emit('onInput', {
    name: props.name,
    value: e || null,
  })
}
</script>

<template>
  <label
      :class="className"
      class="input-field-label"
  >
    <transition name="fade">
      <FieldTitle
          v-if="isFocus || value"
          :value="placeholder"
      />
    </transition>
    <VInput
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :debounce-timeout="debounceTimeout"
        :readonly="readonly"
        @on-input="sendInputValue"
        @on-focus="isFocus = true"
    />
    <span
        class="error-message"
        v-show="errorMessage"
    >
      {{ errorMessage }}
    </span>
  </label>
</template>

<style scoped lang="scss">
@import "../../assets/css/transitions";

label {
  position: relative;
  padding-bottom: 35px;
  flex-direction: column;
}

input {
  transition: .2s ease;

  &:not([readonly]) {
    box-shadow: 0 2px 0 1px $COLOR_FONT_MAIN_LIGHT;
  }

  .error & {
    box-shadow: 0 2px 0 1px $COLOR_FONT_ERROR;
  }

  .valid & {
    box-shadow: 0 2px 0 1px $COLOR_FIELD_VALID;
  }
}

.error-message {
  position: absolute;
  margin-top: 5px;
  transition: .2s ease;
  opacity: 0;
  bottom: 15px;
  right: 0;
  display: block;
  font-family: monospace;
  width: 100%;

  &:first-letter {
    text-transform: uppercase;
  }

  .error & {
    opacity: 1;
    color: $COLOR_FONT_ERROR;
  }
}

.input-field-label {
  position: relative;
}
</style>