<script setup>
import TextButton from "@/components/UI/buttons/TextButton.vue";

defineProps({
  formTitle: {
    type: String
  },
  buttonLabel: {
    type: String
  },
  showButton: {
    type: Boolean,
    default: false
  }
})
defineEmits(['onSubmit'])
</script>

<template>
  <form
      class="user-form"
      @submit.prevent="$emit('onSubmit')"
  >
    <div class="user-form-title">
      {{ formTitle }}
    </div>
    <slot name="content"/>
    <TextButton
        v-if="showButton"
        type="submit"
        class="user-form__button"
        :title="buttonLabel"
        :button-label="buttonLabel"
    />
  </form>
</template>

<style scoped lang="scss">
.user-form {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
}

.user-label {
  input {
    padding: 5px 15px;
    border-radius: 5px;
  }
}

.user-form__button {
  flex: none;
  width: fit-content;
  margin: auto;
  padding: 5px 15px;
  border-radius: 5px;
  background: $COLOR_FONT_MAIN_LIGHT;
  color: $COLOR_MAIN_LIGHT;
  font-family: $FONT_MAIN;
  font-size: 12px;
  cursor: pointer;
  transition: .2s ease;
  @media #{$MOUSE_DEVICE} {
    &:hover {
      background: darken($COLOR_FONT_MAIN_LIGHT, 10%);
    }
  }
}

.user-form-title {
  font-size: 16px;
  font-family: $FONT_MAIN;
  font-weight: 700;
  color: lighten($COLOR_FONT_MAIN, 15%);
  text-align: center;
  margin-bottom: 10px;
}
</style>