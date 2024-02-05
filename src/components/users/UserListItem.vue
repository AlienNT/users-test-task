<script setup>
import UserAvatar from "@/components/users/fields/UserAvatar.vue";
import UserFirstName from "@/components/users/fields/UserFirstName.vue";
import UserEmail from "@/components/users/fields/UserEmail.vue";
import DeleteButton from "@/components/UI/DeleteButton.vue";
import {computed} from "vue";

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  },
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  avatar: {
    type: String
  }
})

defineEmits(['onDelete', 'onShowDetails'])

const displayedInitials = computed(() => [
  props.lastName ? props.lastName[0].toUpperCase() : '',
  props.firstName ? props.firstName[0].toUpperCase() : ''
].join(' '))
</script>

<template>
  <li class="user-list__item">
    <UserAvatar
        class="user-field avatar"
        :src="avatar"
        :initial="displayedInitials"
        :alt="`${firstName} avatar`"
    />
    <div class="col fields-col">
      <UserFirstName
          :value="firstName"
          class="user-field first-name"
          @click="$emit('onShowDetails', id)"
      />
      <UserEmail
          class="user-field email"
          :href="email"
      />
    </div>
    <DeleteButton
        @on-delete="$emit('onDelete', id)"
    />
  </li>
</template>

<style scoped lang="scss">
.user-list__item {
  display: flex;
  padding: 15px;

  &:nth-of-type(2n) {
    background: rgb(243, 248, 255);
  }

  &:nth-of-type(2n + 1) {
    background: rgb(251, 253, 255);
  }
}

.avatar {
  flex: none;
  max-width: 60px;
}

.fields-col {
  display: flex;
  flex-direction: column;
  //gap: 10px;
}
</style>