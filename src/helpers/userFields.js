export default {
    ID: {
        name: 'id',
    },
    EMAIL: {
        name: 'email',
        type: 'email',
        label: 'Почта',
        validator: (value) => {
            console.log('email value', value)
            return [
                !!value?.length || 'поле обязательно к заполнению',
                typeof value === "string" || 'поле должно быть строкой',
                !!value?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) || 'некорректный формат почты'
            ]
        }
    },
    FIRST_NAME: {
        name: 'first_name',
        type: 'text',
        label: 'Имя',
        validator: (value) => [
            !!value?.trim()?.length || 'поле не должно быть пустым',
            !value || value?.trim()?.length > 1 || 'значение должно быть длиннее 1 символа',
        ]
    },
    LAST_NAME: {
        name: 'last_name',
        type: 'text',
        label: 'Фамилия',
        validator: (value) => [
            !value || value?.trim()?.length > 1 || 'значение должно быть длиннее 1 символа',
        ]
    },
    AVATAR: {
        name: 'avatar',
    }
}