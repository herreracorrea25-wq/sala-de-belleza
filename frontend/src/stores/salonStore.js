import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiUrl } from '../utils/api'

export const useSalonStore = defineStore('salon', () => {
  // Estado básico
  const citas = ref([])
  const estilistas = ref([])
  const clientes = ref([])

  // Acciones para cargar datos del backend
  const obtenerDatos = async () => {
    try {
      const resEst = await fetch(apiUrl('/api/estilistas'))
      estilistas.value = await resEst.json()

      const resCli = await fetch(apiUrl('/api/clientes'))
      clientes.value = await resCli.json()
    } catch (error) {
      console.error("Error al conectar con el backend", error)
    }
  }

  return { citas, estilistas, clientes, obtenerDatos }
}, {
  persist: true // Activando el plugin básico de persistencia
})