<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container bg-image">
    <RouterView />
  </div>
</template>

<style>
.bg-image {
  background-image: url('https://media.istockphoto.com/id/1278389684/es/foto/gran-grupo-de-varias-razas-de-perros-juntos-sobre-un-fondo-blanco.jpg?s=612x612&w=0&k=20&c=VJVqcINWxvobZ5qPaRtsMXteWq5AIpfTeZcpRWD4YuE=');
  background-size: cover;        
  background-position: center;   
  background-repeat: no-repeat;  
  background-attachment: fixed;}
</style>