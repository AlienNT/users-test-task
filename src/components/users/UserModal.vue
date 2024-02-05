<script setup>
import userFields from "@/helpers/userFields.js";

import UserAvatar from "@/components/users/fields/UserAvatar.vue";
import UserEmail from "@/components/users/fields/UserEmail.vue";
import UserFirstName from "@/components/users/fields/UserFirstName.vue";
import UserLastName from "@/components/users/fields/UserLastName.vue";
import ModalTemplate from "@/components/templates/ModalTemplate.vue";
import {computed} from "vue";

const emit = defineEmits(['ok', 'cancel'])

const props = defineProps({
  data: {
    type: Object
  }
})
const displayedInitials = computed(() => [
  props.data?.[userFields.FIRST_NAME.name] ? props.data?.[userFields.FIRST_NAME.name][0].toUpperCase() : '',
  props.data?.[userFields.LAST_NAME.name] ? props.data?.[userFields.LAST_NAME.name][0].toUpperCase() : ''
].join(' '))
</script>

<template>
  <ModalTemplate
      @cancel="emit('cancel')"
      @ok="emit('ok')"
  >
    <template v-slot:content>
      <UserAvatar
          class="user-avatar"
          :src="data?.[userFields.AVATAR.name]"
          :font-size="36"
          :initial="displayedInitials"
      />
      <div class="user-name">
        <UserFirstName
            class="user-first-name"
            :value="data?.[userFields.FIRST_NAME.name]"
        />
        <UserLastName
            class="user-last-name"
            :value="data?.[userFields.LAST_NAME.name]"
        />
      </div>
      <UserEmail
          class="user-email"
          :href="data?.[userFields.EMAIL.name]"
      />
      <div class="button-wrapper">
        <button
            type="button"
            @click="emit('ok', data?.[userFields.ID.name])"
        >
          Редактировать
        </button>
      </div>
    </template>
  </ModalTemplate>
</template>

<style scoped lang="scss">
.user-avatar {
  max-width: 320px;
  margin: auto;
}

.user-email,
.user-name {
  display: flex;
  justify-content: center;
}

.user-name {
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
}

.user-first-name,
.user-last-name {
  &:hover {
    color: $COLOR_FONT_MAIN;
  }
}

.button-wrapper {
  display: flex;
  justify-content: center;
  padding: 15px 0;

  button {
    display: block;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>