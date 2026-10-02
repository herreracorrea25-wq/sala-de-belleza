import { createRouter, createWebHistory } from 'vue-router'
import AgendaView from '../views/AgendaView.vue'
import AgendarCitaView from '../views/AgendarCitaView.vue'
import ClientesView from '../views/ClientesView.vue'

const routes = [
    { path: '/', name: 'Agenda', component: AgendaView },
    { path: '/agendar', name: 'Agendar', component: AgendarCitaView },
    { path: '/clientes', name: 'Clientes', component: ClientesView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router