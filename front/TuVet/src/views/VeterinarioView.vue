<template>
  <NavBar />
  <div class="container my-4" style="max-width: 600px;">
    <h2 class="mb-4">Agregar Veterinario</h2>
    <form @submit.prevent="agregarvet(form)" novalidate>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          id="nombre"
          v-model="form.nombre"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input
          type="text"
          id="telefono"
          v-model="form.telefono"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección</label>
        <input
          type="text"
          id="direccion"
          v-model="form.direccion"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="especialidad" class="form-label">Especialidad</label>
        <input
          type="text"
          id="especialidad"
          v-model="form.especialidad"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="experiencia" class="form-label">Años de experiencia</label>
        <input
          type="number"
          id="experiencia"
          v-model.number="form.experiencia"
          class="form-control"
          min="0"
          required
        />
      </div>

      <div class="form-check mb-3">
        <input
          type="checkbox"
          id="disponibilidad"
          v-model="form.disponibilidad"
          class="form-check-input"
        />
        <label for="disponibilidad" class="form-check-label">
          Disponibilidad
        </label>
      </div>

      <button class="btn btn-primary" type="submit" :disabled="loading">
        {{ loading ? 'Guardando...' : 'Agregar Veterinario' }}
      </button>
    </form>
    <button class="btn btn-warning mx-2" type="submit" @click="editarVeterinario(form.id)" v-if="form.id">
      Editar Veterinario
    </button>

    <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
      {{ errorMessage }}
    </div>
  </div>

  <div class="container mt-4">
    <h2 class="mb-4">Lista de Veterinarios</h2>
    <div class="row">
      <div
        class="col-md-4"
        v-for="veterinario in veterinarios"
        :key="veterinario.id"
      >
        <div class="card mb-3 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">{{ veterinario.nombre }}</h5>
            <p class="card-text mb-1">
              <strong>Teléfono:</strong> {{ veterinario.telefono }}
            </p>
            <p class="card-text mb-1">
              <strong>Especialidad:</strong> {{ veterinario.especialidad }}
            </p>
            <p>
              <strong>Disponibilidad:</strong> {{ veterinario.disponibilidad ? 'Sí' : 'No' }}
            </p>
          </div>
          <div class="card-footer">
            <button class="btn btn-warning" @click="editarVeterinario(veterinario.id)">Editar</button>
            <button class="btn btn-danger mx-2" @click="eliminarVeterinario(veterinario.id)">🗑️</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="veterinarios.length === 0" class="alert alert-info mt-3">
      No hay veterinarios registrados.
    </div>
  </div>
</template>



<script setup>
import { onMounted, reactive, ref } from 'vue'
import api from '../api.js'
import NavBar from '../components/NavBar.vue'

const form = reactive({
  nombre: '',
  telefono: '',
  email: '',
  direccion: '',
  especialidad: '',
  experiencia: null,
  disponibilidad: false,
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const veterinarios = ref([]) // lista inicial vacía

// 🔄 Cargar lista de veterinarios
async function cargarVeterinarios() {
  try {
    const response = await api.get('/veterinarios/')
    veterinarios.value = response.data
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Error al cargar la lista de veterinarios.'
  }
}

// ➕ Agregar veterinario
async function agregarvet() {
  try {
    loading.value = true
    const response = await api.post('/veterinarios/', form)
    if (response.status === 201) {
      successMessage.value = 'Veterinario agregado exitosamente.'
      // Resetear formulario
      Object.assign(form, {
        nombre: '',
        telefono: '',
        email: '',
        direccion: '',
        especialidad: '',
        experiencia: null,
        disponibilidad: false,
      })
      await cargarVeterinarios() // 🔄 actualizar lista
    } else {
      errorMessage.value = 'Error al agregar el veterinario.'
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Error al agregar el veterinario.'
  } finally {
    loading.value = false
  }
}

async function editarVet(id) {
  const veterinario = veterinarios.value.find((v) => v.id === id)
  if (veterinario) {
    Object.assign(form, {
      id: veterinario.id,
      nombre: veterinario.nombre,
      telefono: veterinario.telefono,
      email: veterinario.email,
      direccion: veterinario.direccion,
      especialidad: veterinario.especialidad,
      experiencia: veterinario.experiencia,
      disponibilidad: veterinario.disponibilidad,
    })
  }
}

async function editarVeterinario(id) {
  try {
    loading.value = true
    const response = await api.put(`/veterinarios/${id}/`, form)
    if (response.status === 200) {
      successMessage.value = 'Veterinario editado exitosamente.'
      // Resetear formulario
      Object.assign(form, {
        nombre: '',
        telefono: '',
        email: '',
        direccion: '',
        especialidad: '',
        experiencia: null,
        disponibilidad: false,
      })
      await cargarVeterinarios() // 🔄 actualizar lista
    } else {
      errorMessage.value = 'Error al editar el veterinario.'
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Error al editar el veterinario.'
  } finally {
    loading.value = false
  }
}
// 🗑️ Eliminar veterinario
async function eliminarVeterinario(id) {
  try {
    loading.value = true
    const response = await api.delete(`/veterinarios/${id}/`)
    if (response.status === 204) {
      successMessage.value = 'Veterinario eliminado exitosamente.'
      await cargarVeterinarios() // 🔄 actualizar lista
    } else {
      errorMessage.value = 'Error al eliminar el veterinario.'
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Error al eliminar el veterinario.'
  } finally {
    loading.value = false
  }
}

// 📦 Cargar lista al montar el componente
onMounted(cargarVeterinarios)
</script>

