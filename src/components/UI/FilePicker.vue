<script setup>
import VImage from "@/components/UI/VImage.vue";
import IconButton from "@/components/UI/buttons/IconButton.vue";
import icons from "@/helpers/icons.js";
import {fileToBase} from "@/helpers/index.js";

defineProps({
  src: {
    type: String
  },
  initial: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onInput'])

function onClick() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/jpeg, image/jpg, image/png'

  input.click()

  input.oninput = async e => {
    const file = e.target.files[0]
    if (!file) return

    const fileString = await fileToBase(file)

    emit('onInput', {
      name: file?.name,
      size: file?.size,
      file: fileString
    })
  }
}

function onPick() {
  const input = document.createElement('input')
  input.type = 'file'
}
</script>

<template>
  <div
      class="file-picker"
      :class="disabled && 'read-only'"
  >
    <div class="file-preview">
      <VImage
          :src="src"
          :initial="initial"
      />
    </div>
    <label class="file-pick-label">
      <IconButton
          :icon="icons.UPLOAD"
          @on-click="onClick"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
.file-picker {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  padding: 2px;
}

.file-pick-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(35, 35, 35, .9);
  backdrop-filter: blur(4px);
  cursor: pointer;
  opacity: 0;
  transition: .2s ease;

  &:hover {
    opacity: 1;
  }

  .read-only & {
    display: none;
  }

  .file-pick-button {
    display: none;
  }

}
</style>