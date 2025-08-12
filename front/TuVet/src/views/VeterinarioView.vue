<template>
  <NavBar />
  <div class="container my-4">
    <h1 class="mb-4">Veterinarios</h1>
    
    <form @submit.prevent="addVeterinario" class="mb-5">
      <div class="row g-3">
        <div class="col-md-6">
          <input 
            type="text" 
            v-model="nuevoVeterinario.nombre" 
            placeholder="Nombre" 
            required 
            class="form-control"
          />
        </div>
        <div class="col-md-6">
          <input 
            type="text" 
            v-model="nuevoVeterinario.telefono" 
            placeholder="Teléfono" 
            required 
            class="form-control"
          />
        </div>
        <div class="col-md-6">
          <input 
            type="email" 
            v-model="nuevoVeterinario.email" 
            placeholder="Email" 
            required 
            class="form-control"
          />
        </div>
        <div class="col-md-6">
          <input 
            type="text" 
            v-model="nuevoVeterinario.especialidad" 
            placeholder="Especialidad" 
            required 
            class="form-control"
          />
        </div>
        <div class="col-md-6">
          <input 
            type="number" 
            v-model="nuevoVeterinario.experiencia" 
            placeholder="Años de experiencia" 
            required 
            min="0"
            class="form-control"
          />
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div class="form-check">
            <input 
              type="checkbox" 
              v-model="nuevoVeterinario.disponibilidad" 
              id="disponibilidadCheckbox" 
              class="form-check-input"
            />
            <label class="form-check-label" for="disponibilidadCheckbox">
              Disponibilidad
            </label>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary mt-3">
        Agregar Veterinario
      </button>
    </form>

    <ul class="list-group">
      <li 
        v-for="veterinario in veterinarios" 
        :key="veterinario.id" 
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ veterinario.nombre }}
        <button 
          @click="deleteVeterinario(veterinario.id)" 
          class="btn btn-danger btn-sm"
        >
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useVeterinariosStore } from '../stores/veterinarios';
import NavBar from '../components/NavBar.vue';

const veterinariosStore = useVeterinariosStore();

// Obtener los estados del store
const veterinarios = veterinariosStore.veterinarios;
const nuevoVeterinario = veterinariosStore.nuevoVeterinario;

// Métodos para agregar y eliminar veterinarios
const addVeterinario = () => {
  veterinariosStore.addVeterinario();
};

const deleteVeterinario = (id) => {
  veterinariosStore.deleteVeterinario(id);
};

// Cargar veterinarios al montar el componente
onMounted(() => {
  veterinariosStore.fetchVeterinarios();
});
</script>
