<script setup>
import UserList from "@/components/users/UserList.vue";
import UserForm from "@/components/users/UserForm.vue";
import VInput from "@/components/UI/VInput.vue";

import {useUserRequest} from "@/composables/api/useUserRequest.js";
import {useUserState} from "@/composables/state/useUserState.js";

import {computed, defineAsyncComponent, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import userFields from "@/helpers/userFields.js";
import {useModal} from "@/composables/useModal.js";
import AddButton from "@/components/UI/AddButton.vue";
import UserEditForm from "@/components/users/UserEditForm.vue";
import {debounce} from "@/helpers/index.js";

const {fetchUsers, deleteUser, createUser, patchUser} = useUserRequest()
const {createModal, isShow} = useModal()
const {users, user, setUserId, currentUserId} = useUserState()

const state = reactive({
  searchFilter: null,
  sidebarHeight: null
})

const sidebar = ref(null)

onMounted(() => {
  fetchUsers()
  setSidebarSize()

  window.addEventListener('resize', setSidebarSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', setSidebarSize)
})

watch(() => state.sidebarHeight, value => {
  document.documentElement.style.setProperty('--sidebar-height', `${value}px`)
})

function setSidebarSize() {
  state.sidebarHeight = sidebar.value?.offsetHeight
}

async function onDelete(e) {
  const isDelete = await createModal({
        component: defineAsyncComponent(() => import('../components/UI/DialogPopup.vue')),
        data: {title: 'Удалить пользователя?'}
      }
  )
  isDelete && await deleteUser(e)
}

const filteredUsers = computed(() => {
  return !state.searchFilter ? users.value :
      getFilteredList(state.searchFilter, users.value, [
        userFields.FIRST_NAME.name,
        userFields.LAST_NAME.name,
        userFields.EMAIL.name
      ])
})

function getFilteredList(filter, list, fields = []) {
  if (!list?.length || !fields.length) return list

  return list.filter(item => JSON.stringify(getFields(fields, item)).indexOf(filter) > -1)
}

function getFields(fields, item) {
  return fields.map(field => item[field])
}

const tempFilter = ref(null)

const inputTimer = debounce(() => state.searchFilter = tempFilter.value, 1000)

function onFilter(e) {
  tempFilter.value = e
  inputTimer()
}

function onSubmit(e) {
  createUser(e)
}

function onUpdate(e) {
  patchUser(currentUserId.value, e).then(() => setUserId(null))
}

async function onShowUserModal(id) {
  if (isShow.value) return

  const isEdit = await createModal({
    component: defineAsyncComponent(() => import('../components/users/UserModal.vue')),
    data: user(id).value
  })

  if (isEdit) setUserId(id)

}

const isShowForm = ref(false)
</script>

<template>
  <div
      class="users-page"
      :class="isShowForm && 'show'"
  >
    <div class="container">
      <div
          class="users-page__sidebar"
          ref="sidebar"
      >
        <UserForm
            v-show="!currentUserId"
            @on-submit="onSubmit"
        />
        <UserEditForm
            v-show="currentUserId"
            @on-submit="onUpdate"
        />
      </div>
      <div class="users-page__viewport">
        <label class="users-search">
          <VInput
              placeholder="Поиск"
              :value="state.searchFilter"
              @on-input="onFilter"
          />
        </label>
        <UserList
            :users="filteredUsers"
            @on-delete="onDelete"
            @on-show-details="onShowUserModal"
        />
      </div>
      <div class="button-wrapper">
        <AddButton
            :width="60"
            :height="60"
            class="add-button"
            :class="isShowForm && 'active'"
            @on-click="isShowForm = !isShowForm"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.users-page {
  .container {
    position: relative;
    display: flex;
    height: 100%;
    max-height: 100vh;
    flex-wrap: wrap;

    @media all and (max-width: 768px) {
      padding: 0;
      height: calc(100% - 80px);
    }
  }
}

.users-page {
  height: 100vh;
}

.users-page__sidebar {
  width: 100%;
  background: $COLOR_BG_MAIN;
  z-index: 3;
  flex: 1 1 40%;

  @media all and (max-width: 768px) {
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
    transition: .2s ease;
    visibility: hidden;
    .show & {
      visibility: visible;
      opacity: 1;
    }
  }
}

.users-page__viewport {
  flex: 1 1 60%;
  height: 100%;
  overflow-y: auto;
}

.users-search {
  background: lighten($COLOR_BG_MAIN, 8%);
  flex: 1;
  position: sticky;
  top: 0;
  padding: 15px;
  z-index: 2;
  display: flex;
}

.button-wrapper {
  @media all and (max-width: 768px) {
    height: 70px;
    display: flex;
    flex: 100%;
    opacity: 1;
  }
  opacity: 0;
  display: none;
}

.add-button {
  margin: auto;
  transition: .2s ease;

  &.active {
    transform: rotate(45deg);
  }
}
</style>