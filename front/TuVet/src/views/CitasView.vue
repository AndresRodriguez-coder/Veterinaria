<template>
    <NavBar />
    <div class="container my-4">
        <h2 class="mb-4">Agregar Cita</h2>
        <form @submit.prevent="agregarCita" novalidate>
            <div class="mb-3">
                <label for="animal" class="form-label">Animal</label>
                <input
                    type="text"
                    id="animal"
                    v-model="form.animal"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input
                    type="datetime-local"
                    id="fecha"
                    v-model="form.fecha"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="veterinario" class="form-label">Veterinario</label>
                <input
                    type="text"
                    id="veterinario"
                    v-model="form.veterinario"
                    class="form-control"
                    required
                />
            </div>
            <button class="btn btn-primary" type="submit" :disabled="loading">
                {{ loading ? 'Guardando...' : 'Agregar Cita' }}
            </button>
        </form>

        <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
            {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
        </div>


        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../api.js'
import NavBar from '../components/NavBar.vue'

const form = ref({
  animal: '',
  fecha: '',
  veterinario: '',
})

const citas = ref([])

async function agregarCita() {
  try {
    const response = await api.post('/citas/', form.value)
    if (response.status === 201) {
      await cargarCitas()
    }
  } catch (error) {
    console.error('Error al agregar la cita:', error)
  }
}

</script>