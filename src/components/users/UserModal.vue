<script setup>
import userFields from "@/helpers/userFields.js";
import {computed, onBeforeUnmount} from "vue";

import ModalTemplate from "@/components/templates/ModalTemplate.vue";
import UserEditForm from "@/components/users/UserEditForm.vue";
import FilePicker from "@/components/UI/FilePicker.vue";

import {getInitials} from "@/helpers/index.js";
import {useUserState} from "@/composables/state/useUserState.js";
import {useUserRequest} from "@/composables/api/useUserRequest.js";

const props = defineProps({
  data: {
    type: Object
  }
})

const emit = defineEmits([
  'ok',
  'cancel'
])

const {user, currentUserId, setUserId, isEdit, setIsEdit} = useUserState()
const {patchUser} = useUserRequest()

const editedUser = computed(() => {
  return user(currentUserId.value).value
})

const displayedInitials = computed(() => {
  return getInitials(
      props.data?.[userFields.FIRST_NAME.name],
      props.data?.[userFields.LAST_NAME.name]
  )?.join(' ')
})

function onUpdate(e) {
  setIsEdit(null)
  patchUser(currentUserId.value, e)
}

function onCancel() {
  setIsEdit(false)
}

function onEdit() {
  setIsEdit(true)
}

const isReadonly = computed(() => {
  return !isEdit.value
})

function onPickImage(e) {
  editedUser.value.avatar = e.file
}

onBeforeUnmount(() => {
  setIsEdit(null)
  setUserId(null)
})
</script>

<template>
  <ModalTemplate
      @cancel="emit('cancel')"
  >
    <template v-slot:content>
      <div class="modal-content">
        <div class="user-avatar">
          <FilePicker
              class="user-avatar-picker"
              :src="data?.[userFields.AVATAR.name]"
              :initial="displayedInitials"
              :disabled="!!data?.[userFields.AVATAR.name] && isReadonly"
              @on-input="onPickImage"
          />
        </div>
        <UserEditForm
            :edited-user="editedUser"
            :readonly="isReadonly"
            :show-buttons="isEdit"
            :is-edit="isEdit"
            @on-submit="onUpdate"
            @on-cancel="onCancel"
            @on-edit="onEdit"
        />
      </div>
    </template>
  </ModalTemplate>
</template>

<style scoped lang="scss">
@import "../../assets/css/transitions";

.user-avatar {
  max-width: 160px;
  width: 100%;
  margin: 0 auto 15px;
}

.user-email,
.user-name {
  display: flex;
  justify-content: center;
}

.user-name {
  align-items: center;
  flex-wrap: wrap;
}

.user-first-name,
.user-last-name {
  padding: 0;
  color: unset;
  font-weight: unset;
  @media #{$MOUSE_DEVICE} {
    &:hover {
      color: $COLOR_FONT_MAIN;
    }
  }
}

.edit-button {
  align-self: center;
}

.fields {
  border-radius: 5px;
  overflow: hidden;
}

.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 15px;
  background: #f2f7ff;

  > * {
    &:not(&:first-of-type) {
      padding: 0 15px;
      width: auto;
      display: flex;
      flex: 1;
    }
  }
}

.modal-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: lighten($COLOR_BG_MAIN, 5%);
  border-radius: 5px;
  margin: auto;
  max-width: 500px;
  @media #{$BREAKPOINT} {
    height: var(--vh);
    max-width: unset;
    overflow-y: scroll;
  }
}

</style>