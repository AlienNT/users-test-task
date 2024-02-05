<script setup>
import ModalTemplate from "@/components/templates/ModalTemplate.vue";

const props = defineProps({
  data: {
    type: Object
  }
})
const emit = defineEmits(['cancel', 'ok'])
</script>

<template>
  <ModalTemplate
      @cancel="emit('cancel')"
      @ok="emit('ok')"
  >
    <template v-slot:content>
      <div class="modal-field-wrapper">
        <div class="title">
          {{ data?.title }}
        </div>
        <div class="button-wrapper">
          <button
              class="button"
              type="button"
              @click="emit('ok')"
          >
            Удалить
          </button>
          <button
              class="button"
              type="button"
              @click="emit('cancel')"
          >
            Отменить
          </button>
        </div>
      </div>
    </template>
  </ModalTemplate>
</template>
<style lang="scss" scoped>
.modal-field-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-family: $FONT_MAIN;
  color: $COLOR_FONT_MAIN;
  font-weight: 700;
  font-size: 18px;
}

.button-wrapper {
  align-self: flex-end;
  display: flex;
  gap: 15px;

  button {
    padding: 5px 15px;
    border-radius: 5px;
    display: block;
    cursor: pointer;
  }
}
</style>
