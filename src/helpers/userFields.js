export default {
    ID: {
        name: 'id',
    },
    EMAIL: {
        name: 'email',
        type: 'email',
        label: 'Почта',
        validator: (value) => {
            return [
                !!value?.length || 'поле обязательно к заполнению',
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
    },
    PHONE: {
        name: 'phone',
        type: 'phone',
        label: 'Телефон',
        validator: (value) => [
            !value || !!value?.match(/^[0-9]\d{9,11}$/) || 'некорректный формат номера'
        ]
    },
    ADDRESS: {
        name: 'address',
        type: 'text',
        label: 'Адрес',
        validator: (value) => [
            !value || value?.trim()?.length > 4 || 'слишком короткое значение',
        ]
    },
}