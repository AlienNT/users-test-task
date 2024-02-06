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
  },
  debounceTimeout: {
    type: Number
  }
})

const emit = defineEmits(['onInput'])

const isChanged = ref(false)
const isFocus = ref(false)

const errorMessage = computed(() => {
  return props.validationResult?.find(res => typeof res !== "boolean")
})

const errorClass = computed(() => {
  return isChanged.value && !props.isValid && 'error'
})

function sendInputValue(e) {
  isChanged.value = true
  isFocus.value = false

  emit('onInput', {
    field: props.name,
    value: e,
    validationResult: props.validator(e)
  })
}

watch(() => props.validationResult, () => isChanged.value = true)


</script>

<template>
  <label
      :class="errorClass"
      class="input-field-label"
  >
    <transition name="fade" appear>
      <span
          class="input-field-title"
          v-if="isFocus || value"
      >
      {{ placeholder }}
    </span>
    </transition>
    <VInput
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :debounce-timeout="debounceTimeout"
        @on-input="sendInputValue"
        @on-blur="sendInputValue"
        @on-change="sendInputValue"
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

.input-field-label {
  position: relative;
}

.input-field-title {
  transition: .2s ease;
  position: absolute;
  left: 15px;
  transform: translateY(-50%);
  font-size: 12px;
  border-radius: 5px;
  padding: 3px 6px;
  letter-spacing: 1px;
  font-family: $FONT_MAIN;
  font-weight: 300;
  top: 0;
  background: lighten($COLOR_FONT_MAIN, 10%);
  color: $COLOR_MAIN_LIGHT;
}
</style>