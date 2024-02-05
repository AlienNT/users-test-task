import {computed, defineAsyncComponent, h, reactive, render} from "vue";

const state = reactive({
    isShow: false
})

export function useModal() {
    const isShow = computed(() => state.isShow)

    function setIsShow(val = true) {
        state.isShow = val
    }

    async function createModal({component, data}) {

        return new Promise((resolve) => {
            setIsShow()

            render(h(component, {
                onOk: () => resolve(true),
                onCancel: () => resolve(false),
                data

            }), document.documentElement)

        }).finally(() => setIsShow(false))
    }

    return {
        isShow,
        createModal
    }
}