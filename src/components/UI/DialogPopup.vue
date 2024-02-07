<script setup>
import ModalTemplate from "@/components/templates/ModalTemplate.vue";
import TextButton from "@/components/UI/buttons/TextButton.vue";
import TextField from "@/components/UI/TextField.vue";

defineProps({
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
      <div class="modal-content container">
        <div class="modal-field-wrapper">
          <TextField
              :value="data?.title"
              class="title"
          />
          <div class="button-wrapper">
            <TextButton
                button-label="Удалить"
                is-light
                @on-click="emit('ok')"
            />
            <TextButton
                button-label="Отменить"
                is-dark
                @on-click="emit('cancel')"
            />
          </div>
        </div>
      </div>
    </template>
  </ModalTemplate>
</template>
<style lang="scss" scoped>
.modal-field-wrapper {
  max-width: 400px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 5px;
  gap: 20px;
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
