<script setup>
import userFields from "@/helpers/userFields.js";
import {reactive} from "vue";

import InputField from "@/components/UI/InputField.vue";
import FormTemplate from "@/components/templates/FormTemplate.vue";

import {createFormField, onInput, onSubmit} from "@/helpers/formHelper.js";

const emit = defineEmits(['onSubmit', 'onInput'])

const state = reactive({
  formFields: [
    createFormField(userFields.FIRST_NAME),
    createFormField(userFields.EMAIL),
  ]
});

</script>

<template>
  <FormTemplate
      form-title="Добавить пользователя"
      button-label="Добавить"
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
            :debounce-timeout="200"
            @on-input="e => onInput(e,state)"
        />
      </label>
    </template>
  </FormTemplate>
</template>