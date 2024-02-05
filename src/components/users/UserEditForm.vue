<script setup>

import {onInput, onSubmit} from "@/helpers/formHelper.js";
import {computed, reactive, watch} from "vue";
import userFields from "@/helpers/userFields.js";

import FormTemplate from "@/components/templates/FormTemplate.vue";
import InputField from "@/components/UI/InputField.vue";
import {useUserState} from "@/composables/state/useUserState.js";

const emit = defineEmits(['onSubmit', 'onInput'])

const {user, currentUserId} = useUserState()

const editedUser = computed(() => {
  return user(currentUserId.value).value
})

const state = reactive({
  formFields: []
});

watch(() => editedUser.value, value => {
  console.log('editedUser.value', editedUser.value)
  if (value) {
    state.formFields = [
      createFormField(userFields.FIRST_NAME),
      createFormField(userFields.LAST_NAME),
      createFormField(userFields.EMAIL),
    ]
  }
})

function createFormField(field) {
  return {
    ...field,
    value: editedUser.value[field.name],
    isValid: null,
    validationResult: []
  }
}
</script>

<template>
  <FormTemplate
      v-if="currentUserId"
      form-title="Редактировать пользователя"
      button-label="Сохранить"
      @on-submit="onSubmit(state, emit)"
  >
    <template v-slot:content>
      <label
          v-for="field in state.formFields"
          class="user-label"
      >
        <InputField
            :type="field.type"
            :name="field.name"
            :placeholder="field?.label"
            :value="field?.value"
            :validation-result="field?.validationResult"
            :is-valid="field?.isValid"
            :validator="field.validator"
            @on-input="e => onInput(e, state)"
        />
      </label>
    </template>
  </FormTemplate>
</template>