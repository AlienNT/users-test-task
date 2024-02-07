// export function createFormField(field) {
//     return {
//         ...field,
//         value: null,
//         isValid: null,
//         validationResult: []
//     }
// }
//
// export function validate(fields) {
//     return fields
//         .map(field => validateField(field))
//         .every(validateRes => validateRes)
// }
//
// export function validateField(field) {
//     field.validationResult = field?.validator(field.value)
//     field.isValid = setIsValid(field)
//
//     return field.isValid
// }
//
// export function setIsValid(field) {
//     return field.validationResult?.every(error => typeof error !== "string")
// }
//
// export function createFormData(fields) {
//     const data = {}
//     fields.forEach(field => data[field.name] = field.value)
//
//     return data
// }
//
// export function onInput(e, state) {
//     const targetField = state.formFields.find(field => field.name === e.field)
//
//     targetField.value = e.value
//     targetField.validationResult = e.validationResult
//     targetField.isValid = setIsValid(targetField)
// }
// export function onSubmit(state, emit) {
//     const isValidForm = validate(state.formFields)
//
//     if (isValidForm) emit('onSubmit', createFormData(state.formFields))
//
//     return isValidForm
// }