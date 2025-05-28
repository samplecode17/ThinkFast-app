<script setup>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

onBeforeMount(async () => {
  await store.dispatch('activateNavBar')
})

</script>

<template>
  <h1>Hola</h1>
</template>
