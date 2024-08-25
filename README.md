### MensApp (casi terminada)
Aplicación React que incluye la configuración de una API, rutas, componentes y estilos.

## Estructura del Proyecto

- **src/**: Código fuente de la aplicación
  - **components/**: Componentes reutilizables
    - `Navbar.jsx`: Barra de navegación
    - `PrivateRoute.jsx`: Ruta privada
    - `Layout.jsx`: Estructura básica
    - `Notification.jsx`: Componente de notificación
  - **context/**: Contexto de autenticación
    - `AuthContext.jsx`: Proveedor de estado de autenticación
  - **styles/**: Estilos, cargar todos los CSS aquí
    - `styles.css`: Estilos globales
    - `Notification.css`: Estilos para notificaciones
  - **services/**: Servicios
    - `authService.jsx`: Servicio de autenticación
  - **pages/**: Páginas de la aplicación
    - `Home.jsx`: Página de inicio
    - `Login.jsx`: Página de inicio de sesión
    - `Profile.jsx`: Página de perfil
    - `NotFound.jsx`: Página 404
    - `ChannelList.jsx`: Lista de canales
    - `ChannelDetail.jsx`: Detalles de un canal
    - `ServerDetail.jsx`: Detalles de un servidor
    - `ServerList.jsx`: Lista de servidores
    - `CreateServer.jsx`: Crear un nuevo servidor
    - `CreateChannel.jsx`: Crear un nuevo canal
  - **hooks/**: Hooks personalizados
    - `useApi.js`: Hook para API
    - `useAuthStatus.js`: Hook para estado de autenticación
    - `useServers.js`: Hook para servidores
    - `useChannel.js`: Hook para canales
  - `App.jsx`: Componente principal
  - `index.jsx`: Punto de entrada
  - `api.js`: Configura Axios para realizar solicitudes a una API
- `index.html`: Archivo HTML principal
- `package.json`: Configuración del proyecto
- `vite.config.js`: Configuración de Vite

### Resumen de lo que hace cada parte del código:

- **API Configuration (src/api.js)**: Configura Axios para realizar solicitudes a una API, incluyendo un interceptor para agregar un token JWT a las cabeceras de las solicitudes.

- **App Component (src/App.jsx)**: Define las rutas de la aplicación utilizando react-router-dom, incluyendo rutas privadas que requieren autenticación.

- **Index File (src/index.jsx)**: Renderiza la aplicación en el DOM y aplica estilos globales.

- **Channel Detail Page (src/pages/ChannelDetail.jsx)**: Muestra los detalles de un canal específico basado en el ID de la URL.

- **Channel List Page (src/pages/ChannelList.jsx)**: Muestra una lista de canales y permite crear y eliminar canales, mostrando notificaciones de éxito o error.

- **Home Page (src/pages/Home.jsx)**: Página de inicio de la aplicación.

- **Login Page (src/pages/Login.jsx)**: Permite a los usuarios iniciar sesión y almacena el token en localStorage.

- **Not Found Page (src/pages/NotFound.jsx)**: Muestra un mensaje de error 404 si la ruta no se encuentra.

- **Profile Page (src/pages/Profile.jsx)**: Muestra información del perfil del usuario.

- **Server Detail Page (src/pages/ServerDetail.jsx)**: Muestra los detalles de un servidor específico y permite actualizar su información.

- **Server List Page (src/pages/ServerList.jsx)**: Muestra una lista de servidores.

- **Layout Component (src/components/Layout.jsx)**: Estructura básica de la aplicación que incluye la barra de navegación.

- **Navbar Component (src/components/Navbar.jsx)**: Barra de navegación que permite a los usuarios navegar entre las diferentes páginas y cerrar sesión.

- **Notification Component (src/components/Notification.jsx)**: Muestra notificaciones de éxito o error.

- **Private Route Component (src/components/PrivateRoute.jsx)**: Redirige a los usuarios no autenticados a la página de inicio de sesión.

- **Auth Context (src/context/AuthContext.jsx)**: Proporciona el estado de autenticación y funciones de inicio y cierre de sesión.

- **Auth Service (src/services/authService.js)**: Servicio para manejar la autenticación.

- **Styles (src/styles/Notification.css y src/styles/styles.css)**: Define estilos para la aplicación, incluyendo notificaciones y estilos globales.

### Detalle de los objetos mas importantes

### App.jsx
He configurado las rutas utilizando `react-router-dom` y he implementado un sistema de autenticación con `PrivateRoute` para proteger ciertas páginas. Aquí te dejo un resumen de lo que hace cada parte:

1. **Importaciones**: Importo los componentes necesarios, incluyendo las páginas y el contexto de autenticación.

2. **AuthProvider**: Proporciono el contexto de autenticación a toda la aplicación, lo que permite que los componentes hijos accedan a la información de autenticación.

3. **Router**: Utilizo `BrowserRouter` para manejar la navegación en la aplicación.

4. **Layout**: El componente `Layout` se utiliza para envolver las rutas, lo que me permite mantener una estructura común (como un encabezado o pie de página) en todas las páginas.

5. **Rutas**:
   - La ruta principal (`/`) lleva a la página de inicio (`Home`).
   - La ruta `/login` lleva a la página de inicio de sesión (`Login`).
   - La ruta `/profile` está protegida y solo es accesible para usuarios autenticados.
   - Las rutas para listar canales y servidores (`/channels` y `/servers`) también están protegidas.
   - He añadido rutas para crear canales y servidores (`/channels/create` y `/servers/create`), que también están protegidas.
   - La ruta `/servers/:id` permite acceder a los detalles de un servidor específico, también protegida.
   - La ruta `*` captura cualquier ruta no definida y muestra una página de "No encontrado" (`NotFound`).

### api.js

Código para la configuración de la API utilizando Axios:

1. **Importación de Axios**: Importo Axios, que es una biblioteca popular para hacer solicitudes HTTP.

2. **Creación de una instancia de Axios**: Utilizo `axios.create` para crear una instancia de Axios con una URL base (`baseURL`). Esto significa que todas las solicitudes que realice con esta instancia utilizarán esta URL como prefijo.

3. **Interceptor de solicitudes**: 
   - Agrego un interceptor de solicitudes que se ejecuta antes de que se envíe la solicitud.
   - Dentro del interceptor, obtengo el token JWT del `localStorage`. Este token se utiliza para autenticar las solicitudes.
   - Si el token existe, lo agrego a los encabezados de la solicitud en el formato `Authorization: Token <token>`.
   - Si hay un error al configurar la solicitud, lo rechazo con `Promise.reject(error)`.

4. **Exportación de la instancia de API**: Finalmente, exporto la instancia de Axios para que pueda ser utilizada en otras partes de la aplicación.

Este enfoque es útil para manejar la autenticación de manera centralizada, ya que no necesitas agregar el token manualmente en cada solicitud. Si necesitas ayuda con algo más específico, como manejar respuestas de la API o errores, házmelo saber.

### index.jsx 

Codigo para inicializar la aplicación React:

1. **Importaciones**:
   - Importo React y ReactDOM, que son esenciales para crear y renderizar componentes de React.
   - Importo el componente principal `App`, que contiene la lógica y las rutas de la aplicación.
   - Importo los estilos globales desde `styles.css`, lo que permite aplicar estilos a toda la aplicación.
   - También importo Bulma, un framework CSS, para utilizar sus estilos y componentes predefinidos.

2. **Creación del root**:
   - Utilizo `ReactDOM.createRoot` para crear un root en el elemento del DOM con el id `root`. Este es el punto de entrada donde se montará la aplicación React.

3. **Renderizado de la aplicación**:
   - Utilizo `root.render` para renderizar el componente `App` dentro de `React.StrictMode`. Este modo ayuda a identificar problemas potenciales en la aplicación y activa advertencias adicionales en el desarrollo.

Este archivo es fundamental para iniciar tu aplicación React y asegurarte de que todos los componentes y estilos se carguen correctamente.

### authService.js` 

Codigo para manejar la autenticación de usuarios:

1. **Importación de Axios**: Importo Axios para realizar solicitudes HTTP.

2. **Definición de la URL de la API**: Establezco una constante `API_URL` que contiene la URL base para las solicitudes de autenticación. En este caso, apunta a la API de autenticación de tu aplicación.

3. **Función de inicio de sesión**:
   - Defino la función `login`, que es una función asíncrona que toma `credentials` como argumento. Este objeto generalmente contiene el nombre de usuario y la contraseña del usuario.
   - Utilizo `axios.post` para enviar una solicitud POST a la URL de la API de autenticación, pasando las credenciales como el cuerpo de la solicitud.
   - La función espera la respuesta de la API y, una vez que la recibe, devuelve `response.data`, que se supone que contiene el token JWT.

Este enfoque es útil para manejar la autenticación de manera centralizada, permitiendo que otros componentes de tu aplicación llamen a esta función para iniciar sesión y obtener el token necesario para las solicitudes autenticadas.

### AuthContext.jsx

Contexto de autenticación:

1. **Creación del contexto**: Utilizo `createContext` para crear un contexto de autenticación llamado `AuthContext`. Este contexto permitirá que los componentes de la aplicación accedan a la información de autenticación.

2. **AuthProvider**: 
   - Defino el componente `AuthProvider`, que envuelve a los componentes hijos y proporciona el estado de autenticación y las funciones relacionadas.
   - Utilizo `useState` para manejar tres estados: `isAuthenticated` (booleano que indica si el usuario está autenticado), `token` (almacena el token JWT) y `userId` (almacena el ID del usuario).
   - La función `login` se modifica para aceptar tanto el `token` como el `userId`, y actualiza el estado correspondiente al iniciar sesión.
   - La función `logout` limpia el `token`, el `userId` y establece `isAuthenticated` en `false` al cerrar sesión.

3. **Provisión del contexto**: 
   - Utilizo `AuthContext.Provider` para proporcionar el estado y las funciones a los componentes hijos. Esto permite que cualquier componente que consuma este contexto tenga acceso a la información de autenticación.

4. **Hook personalizado**: 
   - Defino el hook `useAuth`, que utiliza `useContext` para facilitar el acceso al contexto de autenticación en otros componentes. Esto simplifica la forma en que los componentes pueden acceder a la información de autenticación y las funciones de inicio y cierre de sesión.

Esta estructura es muy útil para manejar la autenticación en tu aplicación de manera centralizada y accesible.
