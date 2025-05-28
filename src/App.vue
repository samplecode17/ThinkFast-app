<script setup>
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div id="app">
    <NavigationBar />
    <div class="max-w-full pt-16">
      <router-view/>
    </div>
  </div>
</template>

