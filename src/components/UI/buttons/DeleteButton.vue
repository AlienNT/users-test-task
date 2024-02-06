<script setup>
import IconButton from "@/components/UI/buttons/IconButton.vue";
import icons from "@/helpers/icons.js";

defineProps({
  type: {
    type: String
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  title: {
    type: String,
    default: 'удалить'
  },
})
defineEmits(['onDelete'])

</script>

<template>
  <IconButton
      :icon="icons.DELETE"
      :color="'rgba(148,119,119,0.73)'"
      :hover-color="'#915e5e'"
      :type="type"
      :width="width"
      :height="height"
      :title="title"
      @on-click="$emit('onDelete')"
  />
</template>