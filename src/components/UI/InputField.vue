<script setup>
import {computed, ref, watch} from "vue";
import VInput from "@/components/UI/VInput.vue";

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
  }
})

const emit = defineEmits(['onInput'])

const isChanged = ref(false)

const errorMessage = computed(() => {
  return props.validationResult?.find(res => typeof res !== "boolean")
})

const errorClass = computed(() => {
  return isChanged.value && !props.isValid && 'error'
})

function sendInputValue(e) {
  isChanged.value = true

  emit('onInput', {
    field: props.name,
    value: e,
    validationResult: props.validator(e)
  })
}

watch(() => props.validationResult, () => isChanged.value = true)
</script>

<template>
  <label :class="errorClass">
    <VInput
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @on-input="sendInputValue"
        @on-blur="sendInputValue"
        @on-change="sendInputValue"
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
label {
  position: relative;
  padding-bottom: 25px;
  flex-direction: column;
}

input {
  .error & {
    box-shadow: 0 2px 0 1px $COLOR_FONT_ERROR;
  }
}

.error-message {
  position: absolute;
  margin-top: 5px;
  transition: .2s ease;
  opacity: 0;
  bottom: 5px;
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

</style>