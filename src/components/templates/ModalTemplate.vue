<script setup>
import {useModal} from "@/composables/useModal.js";

const emit = defineEmits(['ok', 'cancel'])

const {isShow} = useModal()
</script>

<template>
  <transition
      name="fade"
      appear
  >
    <div
        v-if="isShow"
        class="modal"
        @click.self="emit('cancel')"
    >
      <div class="modal-wrapper container">
        <div class="modal-content">
          <slot name="content"/>
        </div>
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
  max-width: 500px;
}

.modal-content {
  background: $COLOR_MAIN_LIGHT;
  min-width: 280px;
  min-height: 160px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  padding: 25px;
  display: flex;
  flex-direction: column;
}
</style>