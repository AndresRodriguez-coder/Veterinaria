// src/stores/useVeterinarios.ts
import { defineStore } from 'pinia';
import api from '../api';  // Asegúrate de usar la ruta correcta

export const useVeterinariosStore = defineStore('veterinarios', {
  state: () => ({
    veterinarios: [],
    nuevoVeterinario: {
      nombre: '',
      telefono: '',
      email: '',
      especialidad: '',
      experiencia: null,
      disponibilidad: true,
    },
  }),
  actions: {
    async fetchVeterinarios() {
      const response = await api.get('api/veterinarios/');
      this.veterinarios = response.data;
    },
    async addVeterinario() {
      await api.post('api/veterinarios/', this.nuevoVeterinario);
      await this.fetchVeterinarios();
      this.resetNuevoVeterinario();
    },
    async deleteVeterinario(id) {
      await api.delete(`api/veterinarios/${id}/`);
      await this.fetchVeterinarios();
    },
    resetNuevoVeterinario() {
      this.nuevoVeterinario = {
        nombre: '',
        telefono: '',
        email: '',
        especialidad: '',
        experiencia: null,
        disponibilidad: true,
      };
    },
  },
});