<script setup>
import userFields from "@/helpers/userFields.js";
import {onMounted} from "vue";

import InputField from "@/components/UI/InputField.vue";
import FormTemplate from "@/components/templates/FormTemplate.vue";

import {useForm} from "@/composables/useForm.js";

const emit = defineEmits(['onSubmit', 'onInput', 'onCancel'])

const {
  isValidForm,
  formFields,
  isChange,
  createForm,
  onSubmit,
  onInput,
  resetForm
} = useForm({type: 'create'})

onMounted(() => {
  createForm({
    fields: [
      userFields.FIRST_NAME,
      userFields.EMAIL
    ]
  })
})

function submitHandler() {
  onSubmit({emit})
}

function inputHandler(e) {
  onInput(e)
}

function cancelHandler() {
  if (isChange.value) {
    resetForm()
  }
  emit('onCancel')
}

</script>

<template>
  <FormTemplate
      form-title="Добавить пользователя"
      button-label="Добавить"
      :show-button="isChange && isValidForm"
      :show-cancel-button="isChange"
      :show-buttons="isChange"
      @on-submit="submitHandler"
      @on-cancel="cancelHandler"
  >
    <template v-slot:content>
      <template v-for="field in formFields">
        <InputField
            :type="field.type"
            :name="field.name"
            :placeholder="field?.label"
            :value="field?.value"
            :validation-result="field?.validationResult"
            :is-valid="field?.isValid"
            :validator="field.validator"
            :debounce-timeout="200"
            @on-input="inputHandler"
        />
      </template>
    </template>
  </FormTemplate>
</template>