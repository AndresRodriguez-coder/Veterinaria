<template>
  <div class="container mt-5 text-center bg-success text-white gradient rounded p-4" style="max-width: 600px;">
    <h1>Registro</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3 text-start">
        <label for="name" class="form-label">Nombre</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Ingrese su nombre">
      </div>
      <div class="mb-3 text-start">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Ingrese su correo electrónico">
      </div>
      <div class="mb-3 text-start">
        <label for="phone" class="form-label">Teléfono</label>
        <input v-model="phone" type="tel" class="form-control" id="phone" placeholder="Ingrese su teléfono">
      </div>
      <div class="mb-3 text-start pb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Ingrese su contraseña">
      </div>
      <button class="btn btn-primary" type="submit">Registrar</button>
      <button class="btn btn-secondary" type="button" @click="router.push('/login')">Iniciar Sesión</button>
    </form>
  </div>
</template>



<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')

const handleSubmit = () => {
  const user = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value
  }

  localStorage.setItem('user', JSON.stringify(user))
  alert('Registro exitoso')


  name.value = ''
  email.value = ''
  phone.value = ''
  password.value = ''

  router.push('/calendar')
}
</script>
