<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        VetApp
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link 
              to="/calendar" 
              class="nav-link" 
              active-class="active" 
              exact
            >
              Inicio
            </router-link>
          </li>

          <li class="nav-item">
            <router-link 
              to="/veterinarios" 
              class="nav-link" 
              active-class="active"
            >
              Veterinarios
            </router-link>
          </li>

          <!-- Dropdown ejemplo -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Módulos
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" to="/inventario">Inventario</router-link></li>
              <li><router-link class="dropdown-item" to="/estadisticas">Estadísticas</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><router-link class="dropdown-item" to="/configuracion">Configuración</router-link></li>
            </ul>
          </li>
          
          <!-- Botón Login/Perfil -->
          <li class="nav-item ms-lg-3">
            <router-link to="/login" class="btn btn-outline-light px-3">
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<style scoped>
.navbar-brand svg {
  transform: rotate(-10deg);
}
.nav-link.active {
  font-weight: 600;
  text-decoration: underline;
}
</style>
