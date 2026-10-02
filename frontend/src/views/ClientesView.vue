<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">👥 Clientes Habituales</div>

    <!-- Lista de clientes -->
    <q-list bordered separator class="q-mb-lg">
      <q-item v-for="c in clientes" :key="c._id">
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ c.nombre }}</q-item-label>
          <q-item-label caption>Teléfono: {{ c.telefono }} | Email: {{ c.email }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="clientes.length === 0">
        <q-item-section class="text-center text-grey">No hay clientes registrados.</q-item-section>
      </q-item>
    </q-list>

    <!-- Formulario para agregar cliente -->
    <div class="text-h6 q-mb-sm">Registrar Nuevo Cliente</div>
    <q-form @submit.prevent="agregarCliente" class="q-gutter-md" style="max-width: 400px;">
      <q-input filled v-model="nuevo.nombre" label="Nombre completo" required />
      <q-input filled v-model="nuevo.telefono" label="Teléfono" required />
      <q-input filled v-model="nuevo.email" type="email" label="Correo electrónico" required />
      <q-btn label="Registrar Cliente" type="submit" color="secondary" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const clientes = ref([]);
const nuevo = ref({ nombre: '', telefono: '', email: '' });

const cargarClientes = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/clientes');
    clientes.value = await res.json();
  } catch (error) {
    console.error("Error al cargar clientes:", error);
  }
};

const agregarCliente = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo.value)
    });
    if (res.ok) {
      nuevo.value = { nombre: '', telefono: '', email: '' };
      cargarClientes();
    }
  } catch (error) {
    console.error("Error al guardar cliente:", error);
  }
};

onMounted(cargarClientes);
</script>