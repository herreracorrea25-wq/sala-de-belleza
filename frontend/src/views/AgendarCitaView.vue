<template>
  <q-page padding style="max-width: 500px; margin: 0 auto;">
    <div class="text-h5 q-mb-md">➕ Agendar Nueva Cita</div>

    <q-form @submit.prevent="guardarCita" class="q-gutter-md">
      <!-- Selector de Cliente -->
      <q-select
        filled
        v-model="form.clienteId"
        :options="clientesOptions"
        label="Seleccione el Cliente"
        emit-value
        map-options
        required
      />

      <!-- Selector de Estilista -->
      <q-select
        filled
        v-model="form.estilistaId"
        :options="estilistasOptions"
        label="Seleccione el Estilista"
        emit-value
        map-options
        required
      />

      <!-- Fecha -->
      <q-input filled v-model="form.fecha" type="date" label="Fecha de la Cita" required />

      <!-- Hora Inicio -->
      <q-input filled v-model="form.horaInicio" type="time" label="Hora de Inicio" required />

      <!-- Hora Fin -->
      <q-input filled v-model="form.horaFin" type="time" label="Hora de Finalización" required />

      <!-- Botón de guardar -->
      <div>
        <q-btn label="Guardar Cita" type="submit" color="primary" class="full-width" />
      </div>
    </q-form>

    <!-- Mensaje de éxito o error -->
    <q-banner v-if="mensaje" :class="esError ? 'bg-red-2 text-red-9' : 'bg-green-2 text-green-9'" class="q-mt-md">
      {{ mensaje }}
    </q-banner>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiUrl } from '../utils/api';

const router = useRouter();
const clientesOptions = ref([]);
const estilistasOptions = ref([]);
const mensaje = ref('');
const esError = ref(false);

const form = ref({
  clienteId: '',
  estilistaId: '',
  fecha: '',
  horaInicio: '',
  horaFin: ''
});

// Cargar listas para los selects adaptadas al formato de Quasar (label / value)
onMounted(async () => {
  try {
    const [resCli, resEst] = await Promise.all([
      fetch(apiUrl('/api/clientes')),
      fetch(apiUrl('/api/estilistas'))
    ]);
    
    const clientes = await resCli.json();
    clientesOptions.value = clientes.map(c => ({ label: c.nombre, value: c._id }));

    const estilistas = await resEst.json();
    estilistasOptions.value = estilistas.map(e => ({ label: `${e.nombre} (${e.especialidad})`, value: e._id }));
  } catch (error) {
    console.error("Error cargando selects:", error);
  }
});

const guardarCita = async () => {
  try {
    const res = await fetch(apiUrl('/api/citas'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    const data = await res.json();

    if (!res.ok) {
      esError.value = true;
      mensaje.value = data.error;
    } else {
      esError.value = false;
      mensaje.value = '¡Cita registrada con éxito!';
      setTimeout(() => router.push('/'), 1500);
    }
  } catch (err) {
    esError.value = true;
    mensaje.value = 'Error de conexión con el servidor.';
  }
};
</script>