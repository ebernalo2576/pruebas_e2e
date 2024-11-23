# Proyecto de Pruebas Automatizadas - Ghost

Este proyecto contiene un conjunto de pruebas automatizadas para verificar las funcionalidades principales de la plataforma Ghost. Cada funcionalidad ha sido estructurada en escenarios de prueba que garantizan la correcta operación de las características clave de Ghost.

## Funcionalidades

### 1. Login
   - EP001 - Debería permitir iniciar sesión con un usuario existente

### 2. Post
   - EP002 - Debería permitir crear un post con un título y descripción aleatoria
   - EP003 - Debería mostrar los posts creados en la lista de posts
   - EP004 - Debería visualizar un post y validar título y contenido
   - EP005 - Debería permitir al usuario editar un post existente
   - EP006 - Debería permitir despublicar un post existente
   - EP007 - Debería permitir al usuario eliminar un post existente

### 3. Tag
   - EP008 - Debería permitir crear y visualizar un nuevo tag
   - EP009 - Debería permitir editar un tag existente
   - EP010 - Debería permitir eliminar un tag y verificar que ya no esté en la lista

### 4. Página
   - EP011 - Debería permitir crear y visualizar una nueva página
   - EP012 - Debería permitir ver una página existente en la lista de páginas
   - EP013 - Debería validar los detalles de una página existente
   - EP014 - Debería permitir al usuario editar una página existente
   - EP015 - Debería permitir despublicar una página existente
   - EP016 - Debería permitir eliminar una página existente

### 5. Miembro
   - EP017 - Debería permitir crear y visualizar un nuevo miembro (A priori)
   - EP018 - Debería permitir ver la lista de miembros
   - EP019 - Debería permitir al usuario editar un miembro existente (A priori)
   - EP020 - Debería permitir eliminar un miembro existente
   - EP022 - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (A priori)
   - EP023 - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (Pseudo-aleatorio)
   - EP024 - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (Aleatorio)
   - EP025 - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (A priori)
   - EP026 - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (Pseudo-aleatorio)
   - EP027 - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (Aleatorio)
   - EP028 - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (A priori)
   - EP029 - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (Pseudo-aletorio)
   - EP030 - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (Aleatorio)
   - EP031 - Debería mostrar un error al intentar CREAR un miembro con un email vacío (A priori)
   - EP032 - Debería mostrar un error al intentar CREAR un miembro con un email vacío (Pseudo-aleatorio)
   - EP033 - Debería mostrar un error al intentar CREAR un miembro con un email vacío (Aleatorio)
   - EP034 - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (A priori)
   - EP035 - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (Pseudo-aleatorio)
   - EP036 - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (Aleatorio)
   - EP037 - Debería permitir al usuario EDITAR exitosamente un miembro existente con un email y nombre válidos (Pseudo-aleatorio)
   - EP038 - Debería permitir al usuario EDITAR exitosamente un miembro existente con un email y nombre válidos (Aleatorio)
   - EP039 - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (A priori)
   - EP040 - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Pseudo-aletorio)
   - EP041 - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Aleatorio)
   - EP042 - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (A priori)
   - EP043 - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Pseudo-aletorio)
   - EP044 - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Aleatorio)
   - EP045 - Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre válidos (Pseudo-aletorio)
   - EP046 - Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre válidos (Aletorio)

### 6. Configuración
   - EP021 - Debería permitir al usuario cambiar el título y configuración el sitio 

---

# Cypress

## Instrucciones de Instalación y Ejecución

### 1. Requisitos Previos
   - Ubicarse en la carpeta rc_pruebas_cypress
   - Node.js (versión 16 o superior)
   - Git
   - Cypress (si no está instalado, se instalará como parte de este proyecto)


### 2. Instalación


#### Paso 1: Clonar el Repositorio
Clona este repositorio en tu máquina local usando el siguiente comando:

```bash
git clone https://github.com/ebernalo2576/pruebas_e2e
cd pruebas_e2e/rc_pruebas_cypress
```

#### Paso 2: Instalar las Dependencias
Instala todas las dependencias necesarias usando npm. Esto incluirá Cypress y cualquier otra dependencia requerida para los tests.

```bash
npm install
```

### Paso 3: Configuración del Entorno de Pruebas

Configura el archivo `cypress.env.json` en la raíz del proyecto para agregar las variables de entorno necesarias (por ejemplo, URL de Ghost, credenciales de usuario, etc.). Un ejemplo de configuración:

```json
{
  "GHOST_URL": "http://localhost:2368",
  "GHOST_USER": "tu_usuario@example.com",
  "GHOST_PASSWORD": "tu_contraseña"
}
```

### Ejecución de las Pruebas

#### Opción 1: Ejecución en el Modo Interactivo (Cypress UI)

Para ejecutar las pruebas en el modo interactivo de Cypress (útil para ver cada paso de las pruebas en detalle):

```bash
npx cypress open
```

Luego, selecciona el archivo de prueba que deseas ejecutar en la interfaz de Cypress.

#### Opción 2: Ejecución en Modo Headless (sin interfaz)

Para ejecutar todas las pruebas en modo headless (sin abrir la interfaz de Cypress):

```bash
npx cypress run
```

Esto ejecutará todos los escenarios de prueba de manera continua y mostrará los resultados en la consola.

### Paso 5: Resultados de las Pruebas

- **En Modo Interactivo**: Los resultados se muestran en la interfaz de Cypress en tiempo real mientras se ejecutan las pruebas.
- **En Modo Headless**: Al final de la ejecución, la consola mostrará un resumen del resultado de todas las pruebas (pasadas o fallidas).
- **Capturas y Videos**: Cypress genera capturas de pantalla y videos de cada prueba (especialmente útil para pruebas fallidas). Puedes encontrar estos archivos en las carpetas `cypress/screenshots` y `cypress/videos`.

***

### Notas Adicionales

- Asegúrate de que el servidor de Ghost esté activo y accesible en la URL configurada antes de ejecutar las pruebas.
- En caso de cualquier error en la configuración, revisa el archivo `cypress.env.json` para asegurarte de que las variables de entorno son correctas.

**¡Listo!** Ahora deberías tener todo lo necesario para ejecutar y evaluar los escenarios de prueba en Ghost.