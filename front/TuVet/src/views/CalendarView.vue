<template>
  <NavBar />
  <div class="container mt-5 text-center bg-success text-white gradient rounded p-4" style="max-width: 600px;" >
    <h1>Calendario</h1>
    <vue-cal locale="es" style="height: 500px;"/>
  </div>
</template>

<script setup>
import 'vue-cal/dist/vuecal.css'
import VueCal from 'vue-cal'
import NavBar from '../components/NavBar.vue';
</script>