<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 mt-5">
                <h1 class="text-center">Iniciar Sesión</h1>
                <form @submit.prevent="handleLogin">
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo Electrónico</label>
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="Ingrese su correo electrónico" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="Ingrese su contraseña" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  const user = {
    email: email.value,
    password: password.value
  }

  // Simulación: verificar usuario en localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
  if (storedUser.email === user.email && storedUser.password === user.password) {
    alert('Inicio de sesión exitoso')
    router.push('/calendar')
  } else {
    alert('Credenciales inválidas')
  }
}
</script>