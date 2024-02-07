import {computed, reactive} from "vue";

export function useForm({type = 'create'}) {
    const state = reactive({
        formFields: [],
        oldDataJson: '',
    })

    const isUpdateType = type === 'update'

    const formFields = computed(() => {
        return state.formFields
    })

    function createFormField({field, value = null}) {
        return {
            ...field,
            value,
            isValid: null,
            validationResult: []
        }
    }

    function createForm({fields = [], data}) {
        state.formFields = fields.map(field => createFormField({
            field: field,
            value: isUpdateType ? data?.[field.name] : null,
        }))
        setOldData()
    }

    const isChange = computed(() => {
        return state.oldDataJson !== getFieldsJSON()
    })

    const isValidForm = computed(() => {
        return validate()
    })

    function resetForm() {
        state.formFields.forEach(field => resetField(field))
    }

    function resetField(field) {
        field.value = isUpdateType ? getOldForm()?.[field.name] : null
        field.isValid = null
        field.validationResult = []

    }

    function setOldData() {
        state.oldDataJson = getFieldsJSON()
    }

    function getOldForm() {
        return JSON.parse(state.oldDataJson)
    }

    function getFieldsJSON(fields = state.formFields) {
        const oldData = {}
        fields?.forEach(({value, name}) => oldData[name] = value || null)

        return JSON.stringify(oldData)
    }

    function validate(fields = state.formFields, setValidResult = false) {
        return fields
            .map(field => validateField(field, setValidResult))
            .every(validateRes => validateRes.isValid)
    }

    function validateField(field, setValidResult = false) {
        const validationResult = field?.validator(field.value)
        const isValid = getIsValid(validationResult)

        if (setValidResult) {
            field.isValid = isValid
            field.validationResult = validationResult
        }

        return {
            validationResult,
            isValid
        }
    }

    function getIsValid(validationResult) {
        return validationResult?.every(error => typeof error !== "string")
    }

    function createFormData(fields) {
        const data = {}
        fields.forEach(field => data[field.name] = field.value)

        return data
    }

    function onInput(e) {
        const targetField = state.formFields.find(field => field.name === e.name)
        targetField.value = e.value

        const {validationResult, isValid} = validateField(targetField)
        targetField.validationResult = validationResult
        targetField.isValid = isValid
    }

    function onSubmit({emit}) {
        const isValidForm = validate(state.formFields, true)

        if (!isValidForm) {
            return isValidForm
        }
        if (isUpdateType) {
            setOldData()
        }
        emit('onSubmit', createFormData(state.formFields))

        resetForm()

    }


    return {
        createForm,
        formFields,
        onInput,
        onSubmit,
        isChange,
        validate,
        isValidForm,
        resetForm
    }
}