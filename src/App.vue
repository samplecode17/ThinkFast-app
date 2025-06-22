<script setup>
import { computed, onMounted } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import { useStore } from 'vuex';
import { initFlowbite } from 'flowbite';

onMounted(()=>{
  initFlowbite()
})

const store = useStore();
const navbar = computed(() => store.getters.stateNavBar);
</script>

<template>
  <div id="app">
    <NavigationBar />
    <div :class="['max-w-full', { 'pt-16': navbar }]">
      <router-view />
    </div>
  </div>
</template>
