<script setup>
import UserListItem from "@/components/users/UserListItem.vue";
import userFields from "@/helpers/userFields.js";

defineProps({
  users: {
    type: Array
  }
})
defineEmits(['onDelete', 'onShowDetails'])
</script>

<template>
  <ul class="user-list">
    <template v-if="users?.length">
      <transition-group name="fade" appear>
        <UserListItem
            v-for="(user, index) in users"
            :key="index"
            :id="user?.[userFields.ID.name]"
            :avatar="user?.[userFields.AVATAR.name]"
            :email="user?.[userFields.EMAIL.name]"
            :first-name="user?.[userFields.FIRST_NAME.name]"
            :last-name="user?.[userFields.LAST_NAME.name]"
            @on-delete="id => $emit('onDelete', id)"
            @on-show-details="id => $emit('onShowDetails', id)"
        />
      </transition-group>
    </template>
    <li v-else class="empty-list">Список пуст</li>
  </ul>
</template>

<style scoped lang="scss">
@import "../../assets/css/transitions";

.user-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.empty-list {
  font-size: 16px;
  font-family: $FONT_MAIN;
  color: $COLOR_MAIN_LIGHT;
  font-weight: 700;
  display: flex;
  align-self: center;
  justify-self: center;
  padding: 20px 0;
}
</style>