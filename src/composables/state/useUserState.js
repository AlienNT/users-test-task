import {computed, reactive} from "vue";

const state = reactive({
    users: [],
    currentUserId: null
})

export function useUserState() {
    const users = computed(() => state.users)

    function setUsers(users) {
        state.users = [...state.users, ...users]
    }

    function addUser(user) {
        state.users.unshift(user)
    }

    function removeUser(id) {
        const index = state.users.findIndex(user => user?.id === id)
        if (index < 0) return

        state.users.splice(index, 1)
    }

    function updateUser(data) {
        const index = state.users.findIndex(user => user?.id === data?.id)
        if (index < 0) return

        state.users[index] = Object.assign(state.users[index], data)
    }

    const user = (id) => computed(() => {
        return state.users.find(user => user?.id === id)
    })

    const currentUserId = computed(() => {
        return state.currentUserId
    })

    function setUserId(id) {
        state.currentUserId = id
    }

    return {
        users,
        setUsers,
        addUser,
        removeUser,
        updateUser,
        user,
        currentUserId,
        setUserId,
    }
}