<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">📅 Agenda Diaria del Salón</div>

    <!-- Selector de fecha -->
    <div class="row q-mb-md">
      <q-input filled v-model="fechaSeleccionada" type="date" label="Seleccionar Fecha" @update:model-value="cargarAgenda" />
    </div>

    <!-- Tabla sencilla de Quasar para ver las citas -->
    <q-table
      title="Citas Programadas"
      :rows="citas"
      :columns="columns"
      row-key="_id"
      no-data-label="No hay citas registradas para esta fecha"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const fechaSeleccionada = ref(new Date().toISOString().split('T')[0]);
const citas = ref([]);

// Definición de columnas para la tabla de Quasar
const columns = [
  { name: 'hora', label: 'Horario', align: 'left', field: row => `${row.horaInicio} - ${row.horaFin}`, sortable: true },
  { name: 'cliente', label: 'Cliente', align: 'left', field: row => row.clienteId?.nombre || 'Sin cliente' },
  { name: 'estilista', label: 'Estilista Asignado', align: 'left', field: row => row.estilistaId?.nombre || 'Sin estilista' }
];

const cargarAgenda = async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/citas?fecha=${fechaSeleccionada.value}`);
    citas.value = await res.json();
  } catch (error) {
    console.error("Error al cargar la agenda:", error);
  }
};

onMounted(cargarAgenda);
</script>