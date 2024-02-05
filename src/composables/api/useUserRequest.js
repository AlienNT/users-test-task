import {useApiRequest} from "@/composables/api/useApiRequest.js";
import {useUserState} from "@/composables/state/useUserState.js";

const {apiRequest} = useApiRequest()
const {setUsers, removeUser, addUser, updateUser} = useUserState()

export function useUserRequest() {
    async function fetchUsers(page = 1) {
        return await apiRequest('get', `/users?page=${page}`).then((response) => {
            const {data, page, total_pages} = response?.data

            setUsers(data)

            if (page >= total_pages) return

            fetchUsers(page + 1)
        })
    }

    async function deleteUser(id) {
        return await apiRequest('delete', '/users' + id).then(({status}) => {
            console.log('delete ', status)
            if (status === 204) {
                removeUser(id)
            }
        })
    }

    async function createUser(data) {
        return await apiRequest('post', '/users', data).then(({data, status}) => {
            if (status === 201) {
                addUser(data)
            }
        })
    }
    async function patchUser(id, data) {
        console.log('id', id)
        console.log('data', data)
        if (!id) return
        return await apiRequest('patch', `/users/${id}`, data).then(({data, status}) => {
            console.log('data', data)
            console.log('status', status)
            if (status === 200) {
                updateUser({id, ...data})
            }
        })
    }

    return {
        fetchUsers,
        deleteUser,
        createUser,
        patchUser
    }
}