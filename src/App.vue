<script setup>
import UsersPage from "@/pages/UsersPage.vue";
import ResponseStatusIndicator from "@/components/UI/ResponseStatusIndicator.vue";

import {onMounted} from "vue";

onMounted(() => setViewportHeight())

window.onresize = () => setViewportHeight()

function setViewportHeight() {
  document.documentElement.style.setProperty('--vh', window.innerHeight + 'px')
}
</script>

<template>
  <UsersPage/>
  <ResponseStatusIndicator/>
</template>
