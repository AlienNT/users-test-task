import axios from "axios";
import {computed, reactive} from "vue";

const state = reactive({
    loading: false,
    isSuccess: null,
    isError: null
})

export function useApiRequest() {
    const loading = computed(() => state.loading)

    function setLoading(value) {
        state.loading = value
    }

    const isSuccess = computed(() => state.isSuccess)

    function setIsSuccess(value) {
        state.isSuccess = value
    }

    const isError = computed(() => state.isError)

    function setIsError(value) {
        state.isError = value
    }

    async function apiRequest(method = 'get', url, body) {
        setLoading(true)

        return axios({
            method,
            url,
            data: body,
            baseURL: 'https://reqres.in/api'
        }).then(({data, status}) => {
            setIsSuccess(true)
            return {data, status}

        }).catch(err => {
            setIsError(true)
            console.log(`${method} ${url} request error`, err)

        }).finally(() => {
            setTimeout(() => {
                setLoading(false)
                setIsSuccess(null)
                setIsError(null)
            }, 1000)
        })
    }

    return {
        loading,
        setLoading,
        apiRequest,
        isSuccess,
        setIsSuccess,
        isError,
        setIsError
    }
}