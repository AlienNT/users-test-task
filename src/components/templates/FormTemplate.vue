<script setup>
import TextButton from "@/components/UI/buttons/TextButton.vue";
import {computed} from "vue";
import UserFormTitle from "@/components/users/UserFormTitle.vue";

const props = defineProps({
  formTitle: {
    type: String
  },
  buttonLabel: {
    type: String
  },
  showButton: {
    type: Boolean,
    default: false
  },
  showCancelButton: {
    type: Boolean,
    default: false
  },
  showButtons: {
    type: Boolean,
    default: true
  },
  isEdit: {
    type: Boolean,
    default: true
  }
})
defineEmits(['onSubmit', 'onCancel', 'onEdit'])

const cancelButtonLabel = computed(() => {
  return props.isEdit ? 'Отменить' : 'Редактировать'
})
</script>

<template>
  <form
      class="user-form"
      @submit.prevent="$emit('onSubmit')"
  >
    <UserFormTitle
        :value="formTitle"
    />
    <slot name="content"/>
    <div class="buttons-wrapper" v-if="showButtons">
      <transition name="fade">
        <TextButton
            v-if="showButton"
            :title="buttonLabel"
            :button-label="buttonLabel"
            class="user-form__button"
            type="submit"
        />
      </transition>
      <transition name="fade">
        <TextButton
            v-if="showCancelButton"
            :title="cancelButtonLabel"
            :button-label="cancelButtonLabel"
            is-dark
            class="user-form__cancel-button"
            @on-click="$emit(isEdit ? 'onCancel': 'onEdit')"
        />
      </transition>
      <input type="submit">
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "../../assets/css/transitions";

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

.buttons-wrapper {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.user-form__button {
  flex: none;
  width: fit-content;
  border-radius: 5px;
  background: $COLOR_FONT_MAIN_LIGHT;
  color: $COLOR_MAIN_LIGHT;
  font-family: $FONT_MAIN;
  font-size: 12px;
  cursor: pointer;
  transition: .2s ease;
  @media #{$MOUSE_DEVICE} {
    &:not([disabled]) {
      &:hover {
        background: darken($COLOR_FONT_MAIN_LIGHT, 10%);
      }
    }
  }
}

input[type=submit] {
  display: none;
}
</style>