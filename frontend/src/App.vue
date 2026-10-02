<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Cabecera con Quasar -->
    <q-header elevated class="bg-purple-8">
      <q-toolbar>
        <q-toolbar-title>✨ L'Élégance Studio</q-toolbar-title>
        <q-btn flat to="/" label="Agenda" />
        <q-btn flat to="/agendar" label="Agendar" />
        <q-btn flat to="/clientes" label="Clientes" />
      </q-toolbar>
    </q-header>

    <!-- Contenedor de las vistas -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>