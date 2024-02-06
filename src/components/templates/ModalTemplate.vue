<script setup>
import {useModal} from "@/composables/useModal.js";
import {onBeforeUnmount, onMounted} from "vue";
import keyCodes from "@/helpers/keyCodes.js";

import CloseButton from "@/components/UI/buttons/CloseButton.vue";

const emit = defineEmits(['ok', 'cancel'])

const {isShow} = useModal()

onMounted(() => {
  window.addEventListener('keydown', eventHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', eventHandler)
})

function eventHandler(e) {
  if (!isShow.value) return

  switch (e.code) {
    case keyCodes.ENTER: {
      return emit('ok')
    }
    case keyCodes.ESCAPE: {
      return emit('cancel')
    }
  }
}
</script>

<template>
  <transition name="fade" appear>
    <div
        v-if="isShow"
        class="modal"
        @click.self="emit('cancel')"
    >
      <div
          class="modal-wrapper container"
          @click.self="emit('cancel')"
      >
        <CloseButton
            class="close-button"
            @on-click="emit('cancel')"
        />
        <slot name="content"/>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import "../../assets/css/transitions";

.modal {
  transition: .2s ease;
  display: flex;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.modal-wrapper {
  margin: auto;
  padding: 15px;
  max-height: var(--vh);
  overflow: auto;
  @media #{$BREAKPOINT} {
    padding: 0;
  }
}


.close-button {
  position: absolute;
  right: 15px;
  top: 15px;

  @media #{$BREAKPOINT} {
    top: 10px;
    right: 10px;
  }
}
</style>