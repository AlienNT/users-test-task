<script setup>

import {computed, onMounted} from "vue";
import userFields from "@/helpers/userFields.js";

import FormTemplate from "@/components/templates/FormTemplate.vue";
import InputField from "@/components/UI/InputField.vue";

import {useForm} from "@/composables/useForm.js";

const props = defineProps({
  editedUser: {
    type: Object
  },
  readonly: {
    type: Boolean,
    default: null
  },
  buttonLabel: {
    type: String,
    default: 'Сохранить'
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

const emit = defineEmits(['onSubmit', 'onInput', 'onCancel', 'onEdit'])

const {
  isChange,
  isValidForm,
  formFields,
  createForm,
  onSubmit,
  onInput,
  resetForm
} = useForm({type: 'update'})

const formTitle = computed(() => {
  return props.readonly ? 'Данные пользователя' : 'Редактировать пользователя'
})

onMounted(() => {
  createForm({
    fields: [
      userFields.FIRST_NAME,
      userFields.LAST_NAME,
      userFields.EMAIL,
      userFields.PHONE,
      userFields.ADDRESS
    ],
    data: props.editedUser
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

function editHandler() {
  emit('onEdit')
}

</script>

<template>
  <FormTemplate
      :form-title="formTitle"
      :button-label="buttonLabel"
      :show-cancel-button="true"
      :show-button="!readonly && isChange && isValidForm"
      :is-edit="isEdit"
      @on-submit="submitHandler"
      @on-cancel="cancelHandler"
      @on-edit="editHandler"
  >
    <template v-slot:content>
      <InputField
          v-for="field in formFields"
          :type="field.type"
          :name="field.name"
          :placeholder="field?.label"
          :value="field?.value"
          :validation-result="field?.validationResult"
          :is-valid="field?.isValid"
          :validator="field.validator"
          :debounce-timeout="100"
          :readonly="readonly"
          @on-input="inputHandler"
      />
    </template>
  </FormTemplate>
</template>