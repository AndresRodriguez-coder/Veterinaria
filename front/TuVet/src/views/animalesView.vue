<template>
    <NavBar />
    <div class="container">
        <h2 class="mb-4">Agregar Animal</h2>
        <form @submit.prevent="agregarAnimal" novalidate>
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
                <label for="especie" class="form-label">Especie</label>
                <input
                    type="text"
                    id="especie"
                    v-model="form.especie"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="raza" class="form-label">Raza</label>
                <input
                    type="text"
                    id="raza"
                    v-model="form.raza"
                    class="form-control"
                    required
                />
            </div>

            <div class="mb-3">
                <label for="finca" class="form-label">Finca</label>
                <input
                    type="text"
                    id="finca"
                    v-model="form.finca"
                    class="form-control"
                    required
                />
            </div>

            <button class="btn btn-primary" type="submit" :disabled="loading">
                {{ loading ? 'Guardando...' : 'Agregar Animal' }}
            </button>

            <!-- boton editar -->

        </form>
            <button class="btn btn-warning mx-2" type="submit" @click="editarAni(form.id)" v-if="form.id">
                Editar Animal
            </button>


        <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
            {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
        </div>
    </div>
    <div class="container mt-4">
        <h2 class="mb-4">Lista de Animales</h2>
        <div class="row">
            <div class="col-md-4" v-for="animal in animales" :key="animal.id">
                <div class="card mb-3 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title text-primary">{{ animal.nombre }}</h5>
                        <p class="card-text mb-1">
                            <strong>Especie:</strong> {{ animal.especie }}
                        </p>
                        <p class="card-text mb-1">
                            <strong>Raza:</strong> {{ animal.raza }}
                        </p>
                        <p class="card-text mb-1">
                            <strong>Finca:</strong> {{ animal.finca }}
                        </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-warning" @click="editarAnimal(animal.id)">Editar</button>
                        <button class="btn btn-danger mx-2" @click="eliminarAnimal(animal.id)">🗑️</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="animales.length === 0" class="alert alert-info mt-3">
            No hay animales registrados.
        </div>
    </div>

</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import api from '../api.js'
import NavBar from '../components/NavBar.vue'

const form = reactive({
  nombre: '',
  especie: '',
  raza: '',
  finca: '',
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const animales = ref([]) // lista inicial vacía

// 🔄 Cargar lista de animales
async function cargarAnimales() {
  try {
    const response = await api.get('/animales/')
    animales.value = response.data
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Error al cargar la lista de animales.'
  }
}

// ➕ Agregar animal
async function agregarAnimal() {
  try {
    loading.value = true
    const response = await api.post('/animales/', form)
    if (response.status === 201) {
      successMessage.value = 'Animal agregado exitosamente.'
      // Resetear formulario
      Object.assign(form, {
        nombre: '',
        especie: '',
        raza: '',
        edad: null,
        vacunas: [],
      })
      await cargarAnimales() // 🔄 actualizar lista
    } else {
      errorMessage.value = 'Error al agregar el animal.'
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Error al agregar el animal.'
  } finally {
    loading.value = false
  }
}
//edoitadatos al form y editarlos

// editar datos al form y editarlos
async function editarAnimal(id) {
    const animal = animales.value.find((a) => a.id === id)
    if (animal) {
        Object.assign(form, {
            id: animal.id,
            nombre: animal.nombre,
            especie: animal.especie,
            raza: animal.raza,
            finca: animal.finca,
        })
    }
}

//hacer put 
async function editarAni(id) {
    try {
        loading.value = true
        const response = await api.put(`/animales/${id}/`, form)
        if (response.status === 200) {
            successMessage.value = 'Animal editado exitosamente.'
            // Resetear formulario
            Object.assign(form, {
                nombre: '',
                especie: '',
                raza: '',
                finca: '',
            })
            await cargarAnimales() // 🔄 actualizar lista
        } else {
            errorMessage.value = 'Error al editar el animal.'
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.detail || 'Error al editar el animal.'
    } finally {
        loading.value = false
    }
}

async function eliminarAnimal(id) {
    try {
        loading.value = true
        const response = await api.delete(`/animales/${id}/`)
        if (response.status === 204) {
            successMessage.value = 'Animal eliminado exitosamente.'
            await cargarAnimales() // 🔄 actualizar lista
        } else {
            errorMessage.value = 'Error al eliminar el animal.'
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.detail || 'Error al eliminar el animal.'
    } finally {
        loading.value = false
    }
}

// 📦 Cargar lista al montar el componente
onMounted(cargarAnimales)
</script>