<script setup>
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div id="app">
    <NavigationBar />
    <div class="max-w-full">
      <router-view/>
    </div>
  </div>
</template>

