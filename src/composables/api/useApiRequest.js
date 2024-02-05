import axios from "axios";

export function useApiRequest() {
    async function apiRequest(method = 'get', url, body) {
        return axios({
            method,
            url,
            data: body,
            baseURL: 'https://reqres.in/api'
        }).then(({data, status}) => {
            return {
                data,
                status
            }
        }).catch(err => {
            console.log(`${method} ${url} request error`, err)
        })
    }

    return {
        apiRequest
    }
}