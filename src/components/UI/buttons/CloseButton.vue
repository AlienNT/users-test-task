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
    default: 'закрыть'
  },
})
defineEmits(['onClick'])
</script>

<template>
  <IconButton
      :icon="icons.CLOSE"
      :color="'#6697d4'"
      :hover-color="'#7ab0f3'"
      :type="type"
      :width="width"
      :height="height"
      :title="title"
      @on-click="$emit('onClick')"
  />
</template>