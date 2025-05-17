<script setup>
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div id="app">
    <NavigationBar />
    <div class="main container">
      <router-view/>
    </div>
  </div>
</template>

