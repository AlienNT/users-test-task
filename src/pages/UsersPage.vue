<script setup>
import UserList from "@/components/users/UserList.vue";
import UserForm from "@/components/users/UserForm.vue";
import VInput from "@/components/UI/VInput.vue";
import AddButton from "@/components/UI/buttons/AddButton.vue";

import {useUserRequest} from "@/composables/api/useUserRequest.js";
import {useUserState} from "@/composables/state/useUserState.js";
import {useModal} from "@/composables/useModal.js";

import {computed, defineAsyncComponent, onMounted, reactive} from "vue";
import userFields from "@/helpers/userFields.js";

const {fetchUsers, deleteUser, createUser, patchUser} = useUserRequest()
const {createModal, isShow} = useModal()
const {users, user, setUserId, currentUserId, setIsEdit} = useUserState()

const state = reactive({
  searchFilter: null,
  sidebarHeight: null,
  isShowForm: false
})

onMounted(() => {
  fetchUsers()
})

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

function onFilter(e) {
  state.searchFilter = e
}

function onSubmit(e) {
  createUser(e).then(() => state.isShowForm = false)
}

function onUpdate(e) {
  patchUser(currentUserId.value, e).then(() => setUserId(null))
}

async function onShowUserModal(id) {
  if (isShow.value) return
  setUserId(id)

  const isEdit = await createModal({
    component: defineAsyncComponent(() => import('../components/users/UserModal.vue')),
    data: user(id).value
  })

  if (isEdit) setIsEdit(true)

}

</script>

<template>
  <div
      class="users-page"
      :class="state.isShowForm && 'show'"
  >
    <div class="container">
      <div
          class="users-page__sidebar"
          ref="sidebar"
      >
        <UserForm
            :key="state.isShowForm"
            @on-submit="onSubmit"
        />
      </div>
      <div class="users-page__viewport">
        <label class="users-search">
          <VInput
              placeholder="Поиск"
              :value="state.searchFilter"
              :debounce-timeout="600"
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
            :class="state.isShowForm && 'active'"
            @on-click="state.isShowForm = !state.isShowForm"
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
    max-height: var(--vh);
    flex-wrap: wrap;

    @media #{$BREAKPOINT} {
      padding: 0;
      height: calc(100% - 80px);
    }
  }
}

.users-page {
  height: var(--vh);
}

.users-page__sidebar {
  width: 100%;
  background: $COLOR_BG_MAIN;
  z-index: 3;
  flex: 1 1 40%;
  padding: 15px 0;

  @media #{$BREAKPOINT} {
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
  overflow-y: scroll;
  background: lighten($COLOR_BG_MAIN, 4%);
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
  @media #{$BREAKPOINT} {
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