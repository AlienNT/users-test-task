<script setup>

import {onInput, onSubmit} from "@/helpers/formHelper.js";
import {computed, reactive, watch} from "vue";
import userFields from "@/helpers/userFields.js";

import FormTemplate from "@/components/templates/FormTemplate.vue";
import InputField from "@/components/UI/InputField.vue";

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
  }
})

const emit = defineEmits(['onSubmit', 'onInput'])

const state = reactive({
  formFields: [],
  oldDataJson: ''
});

const formTitle = computed(() => {
  return props.readonly ? 'Данные пользователя' : 'Редактировать пользователя'
})

watch(() => props.editedUser, value => {
  if (value) {
    state.formFields = [
      createFormField(userFields.FIRST_NAME),
      createFormField(userFields.LAST_NAME),
      createFormField(userFields.EMAIL),
      createFormField(userFields.PHONE),
      createFormField(userFields.ADDRESS),
    ]
    setOldData()
  }
}, {
  immediate: true
})

const isChange = computed(() => {
  return state.oldDataJson !== getFieldsJSON(state.formFields)
})

function createFormField(field) {
  return {
    ...field,
    value: props.editedUser[field.name],
    isValid: null,
    validationResult: []
  }
}

function setOldData() {
  state.oldDataJson = getFieldsJSON(state.formFields)
}

function getFieldsJSON(fields) {
  const oldData = {}
  fields.forEach(({value, name}) => oldData[name] = value || null)

  return JSON.stringify(oldData)
}

function submitHandler() {
  const isSaved = onSubmit(state, emit)

  if (isSaved) setOldData()
}
</script>

<template>
  <FormTemplate
      :form-title="formTitle"
      :button-label="buttonLabel"
      :show-button="!readonly && isChange"
      @on-submit="submitHandler"
  >
    <template v-slot:content>
      <InputField
          v-for="field in state.formFields"
          :type="field.type"
          :name="field.name"
          :placeholder="field?.label"
          :value="field?.value"
          :validation-result="field?.validationResult"
          :is-valid="field?.isValid"
          :validator="field.validator"
          :debounce-timeout="100"
          :readonly="readonly"
          @on-input="e => onInput(e, state)"
      />
    </template>
  </FormTemplate>
</template>