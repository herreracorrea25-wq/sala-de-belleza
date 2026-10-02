# Sala de belleza

Aplicación para gestionar clientes, estilistas y citas. El frontend está hecho
con Vue y Vite; el backend usa Express y MongoDB.

## Despliegue en Render

El frontend y el backend se despliegan como dos servicios conectados al mismo
repositorio de GitHub.

### Backend (Web Service)

1. En Render, elige **New + > Web Service** y conecta
   `herreracorrea25-wq/sala-de-belleza`.
2. Configura la rama `master`, **Root Directory** `backend`,
   **Build Command** `npm install` y **Start Command** `npm start`.
3. En **Environment Variables**, agrega `MONGO_URI` con la URI de conexión de
   MongoDB Atlas. No la guardes en el repositorio.
4. Crea el servicio y copia su URL pública, por ejemplo
   `https://sala-belleza-api.onrender.com`.

Render proporciona el puerto en `PORT`; el servidor también funciona localmente
en el puerto 4000.

### Frontend (Static Site)

1. En Render, elige **New + > Static Site** y conecta el mismo repositorio.
2. Configura la rama `master`, **Root Directory** `frontend`,
   **Build Command** `npm install && npm run build` y **Publish Directory**
   `dist`.
3. En **Environment Variables**, agrega `VITE_API_URL` con la URL del backend
   creada arriba, sin una barra al final.
4. En **Redirects/Rewrites**, agrega una regla de tipo **Rewrite**:
   `/*` → `/index.html`. Esto permite la navegación de Vue Router al recargar
   una página.
5. Crea el sitio. Si cambias `VITE_API_URL`, vuelve a desplegar el frontend
   para que Vite incorpore el valor durante la compilación.

El plan gratuito de Render puede suspender el Web Service cuando está inactivo;
la primera solicitud después de la suspensión puede tardar en responder.
