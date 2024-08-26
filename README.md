### TeamHub
Aplicación React que incluye la configuración de una API, rutas, componentes y estilos.

## Estructura del Proyecto y resumen de lo que hace cada parte del código:

- **src/**: Código fuente de la aplicación
  - **components/**:Componentes reutilizables
    `CreateChannelModal:` Modal para crear un nuevo canal, incluye un formulario para ingresar los detalles del canal.
    
    `CreateMessageModal:` Modal para crear un nuevo mensaje dentro de un canal, permite escribir y enviar mensajes.
    
    `CreateServerModal:` Modal para crear un nuevo servidor, incluye un formulario para ingresar los detalles del servidor.
    
    `EditChannelModal:` Modal para editar un canal existente, permite modificar el nombre y otros atributos del canal.
    
    `EditMessageModal:` Modal para editar un mensaje existente, permite modificar el contenido del mensaje.
    
    `EditServerModal:` Modal para editar un servidor existente, permite modificar el nombre y otros atributos del servidor.
    
    `Layout:` Componente que define la estructura general de la aplicación, incluyendo encabezado, pie de página, y áreas de contenido.
    
    `Navbar:` Barra de navegación que incluye enlaces a diferentes secciones de la aplicación, como servidores, canales, y perfil.
    
    `Notification:` Componente para mostrar notificaciones en la aplicación, con soporte para diferentes tipos de alertas y auto-cierre.
    
    `PrivateRoute:` Componente que protege las rutas privadas, asegurando que solo los usuarios autenticados puedan acceder a ciertas páginas.
    
  - **context/**: Contexto de autenticación
    
    `AuthContext:` Provee el contexto de autenticación para la aplicación. Maneja el estado del usuario autenticado y proporciona funciones para iniciar y cerrar sesión.
    
  - **styles/**: Estilos, cargar todos los CSS aquí
    
    `NotFound:` Archivo de estilos CSS específico para la página de "No encontrado", personalizando su apariencia.
    
    `Notification:` Archivo de estilos CSS para el componente de notificaciones, definiendo su apariencia y comportamiento visual.
    
    `Pagination:` Archivo de estilos CSS para los controles de paginación, mejorando la presentación de los botones "Anterior" y "Siguiente".
    
  - **services/**: Servicios
    
    `authService:` Módulo que maneja todas las operaciones relacionadas con la autenticación, como iniciar sesión, registrar usuarios y obtener tokens de autenticación.
    
  - **pages/**: Páginas de la aplicación
    
    `ChannelList:` Página que muestra la lista de canales disponibles dentro de un servidor, permitiendo al usuario seleccionar uno para ver los mensajes.
    
    `Dashboard:` Página principal o tablero de la aplicación donde se resumen las actividades recientes y se muestran enlaces a las diferentes secciones.
    
    `Home:` Página de inicio, que generalmente se muestra a los usuarios antes de iniciar sesión o al entrar en la aplicación.
    
    `Login:` Página que contiene el formulario de inicio de sesión para que los usuarios accedan a la aplicación.
    
    `MemberList:` Página que muestra la lista de miembros dentro de un canal o servidor, permitiendo ver detalles de cada miembro.
    
    `MessageList:` Página que muestra la lista de mensajes dentro de un canal seleccionado, permitiendo la interacción con dichos mensajes.
    
    `NotFound:` Página que se muestra cuando un usuario intenta acceder a una ruta que no existe dentro de la aplicación.
    
    `Profile:` Página que muestra la información del perfil del usuario autenticado, permitiendo la edición de datos personales.
    
    `ServerList:` Página que muestra la lista de servidores a los que pertenece un usuario, permitiendo seleccionar uno para ver los canales dentro del mismo.
    
  - **hooks/**: Hooks personalizados
    
    `useApi:` Hook personalizado para manejar las solicitudes HTTP hacia la API. Facilita la comunicación con los endpoints y maneja respuestas y errores.
    
    `useAuthStatus:` Hook para verificar el estado de autenticación del usuario. Determina si un usuario está autenticado o no.
    
    `useChannel:` Hook para manejar la lógica relacionada con los canales, como obtener información de un canal específico.
    
    `useMembers:` Hook para manejar la lógica relacionada con los miembros de un servidor o canal, permitiendo la obtención de la lista de miembros.
    
    `useMessages:` Hook para manejar la lógica relacionada con los mensajes, incluyendo la obtención y envío de mensajes en un canal.
    
    `useServers:` Hook para manejar la lógica relacionada con los servidores, como la obtención de la lista de servidores a los que pertenece un usuario.
    
  `api:` Archivo que configura las instancias y opciones para realizar solicitudes HTTP hacia la API utilizada por la aplicación.
  
  `App:` Componente principal de la aplicación, que define las rutas y la estructura básica de la misma.
  
  `index:` Punto de entrada de la aplicación React, donde se monta el componente principal App en el DOM.
  
  `package.json:` Configuración del proyecto
  
  `vite.config.js:` Configuración de Vite
