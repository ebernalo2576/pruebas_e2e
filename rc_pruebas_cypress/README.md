# Proyecto de Pruebas Automatizadas - Ghost

Este proyecto contiene un conjunto de pruebas automatizadas para verificar las funcionalidades principales de la plataforma Ghost. Cada funcionalidad ha sido estructurada en escenarios de prueba que garantizan la correcta operación de las características clave de Ghost.

## Funcionalidades

### 1. Login
   - **EP001** - Debería permitir iniciar sesión con un usuario existente.

---

### 2. Post
   - **EP002** - Debería permitir crear un post con un título y descripción aleatoria.
   - **EP003** - Debería mostrar los posts creados en la lista de posts.
   - **EP004** - Debería visualizar un post y validar título y contenido.
   - **EP005** - Debería permitir al usuario editar un post existente.
   - **EP006** - Debería permitir despublicar un post existente.
   - **EP007** - Debería permitir al usuario eliminar un post existente.

---

### 3. Tag
   - **EP008** - Debería mostrar un error al intentar crear un tag sin datos.
   - **EP009** - Debería permitir crear un tag con slug válido.

   - **EP010** - Debería permitir crear un tag con slug válido.


   - **EP008** - Crear un nuevo tag con menos de 191 caracteres en el campo slug (Aleatorio).
   - **EP009** - Crear un nuevo tag con menos de 191 caracteres en el campo slug (A priori).
   - **EP010** - Crear un nuevo tag con menos de 191 caracteres en el campo slug (Pseudo-aleatorio).
   - **EP011** - Crear un nuevo tag con más de 500 caracteres en el campo description (Aleatorio).
   - **EP012** - Crear un nuevo tag con más de 500 caracteres en el campo description (A priori).
   - **EP013** - Crear un nuevo tag con más de 500 caracteres en el campo description (Pseudo-aleatorio).
   - **EP014** - Crear un nuevo tag con menos de 191 caracteres en el campo name (Aleatorio).
   - **EP015** - Crear un nuevo tag con menos de 191 caracteres en el campo name (A priori).
   - **EP016** - Crear un nuevo tag con menos de 191 caracteres en el campo name (Pseudo-aleatorio).
   - **EP017** - Crear un nuevo tag (A priori).
   - **EP018** - Crear un nuevo tag (Aleatorio).
   - **EP019** - Crear un nuevo tag (Pseudo-aleatorio).
   - **EP020** - Crear un nuevo tag sin datos en los campos (A priori).
   - **EP021** - Crear un nuevo tag sin datos en los campos (Aleatorio).
   - **EP022** - Crear un nuevo tag sin datos en los campos (Pseudo-aleatorio).
   - **EP023** - Editar información de un tag existente (A priori).
   - **EP024** - Editar información de un tag existente (Aleatorio).
   - **EP025** - Editar información de un tag existente (Pseudo-aleatorio).
   - **EP026** - Editar información de un tag existente dejando campos vacíos (A priori).
   - **EP027** - Editar información de un tag existente dejando campos vacíos (Aleatorio).
   - **EP028** - Editar información de un tag existente dejando campos vacíos (Pseudo-aleatorio).

---

### 4. Página
   - **EP029** - Debería permitir crear y visualizar una nueva página.
   - **EP030** - Debería permitir ver una página existente en la lista de páginas.
   - **EP031** - Debería validar los detalles de una página existente.
   - **EP032** - Debería permitir al usuario editar una página existente.
   - **EP033** - Debería permitir despublicar una página existente.
   - **EP034** - Debería permitir eliminar una página existente.

---

### 5. Miembro
   - **EP035** - Debería permitir crear y visualizar un nuevo miembro (A priori).
   - **EP036** - Debería permitir ver la lista de miembros.
   - **EP037** - Debería permitir al usuario editar un miembro existente (A priori).
   - **EP038** - Debería permitir eliminar un miembro existente.
   - **EP039** - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (A priori).
   - **EP040** - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (Pseudo-aleatorio).
   - **EP041** - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (Aleatorio).
   - **EP042** - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (A priori).
   - **EP043** - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (Pseudo-aleatorio).
   - **EP044** - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (Aleatorio).
   - **EP045** - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (A priori).
   - **EP046** - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (Pseudo-aleatorio).
   - **EP047** - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (Aleatorio).
   - **EP048** - Debería mostrar un error al intentar CREAR un miembro con un email vacío (A priori).
   - **EP049** - Debería mostrar un error al intentar CREAR un miembro con un email vacío (Pseudo-aleatorio).
   - **EP050** - Debería mostrar un error al intentar CREAR un miembro con un email vacío (Aleatorio).
   - **EP051** - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (A priori).
   - **EP052** - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (Pseudo-aleatorio).
   - **EP053** - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (Aleatorio).
   - **EP054** - Debería permitir al usuario EDITAR exitosamente un miembro existente con un email y nombre válidos (Pseudo-aleatorio).
   - **EP055** - Debería permitir al usuario EDITAR exitosamente un miembro existente con un email y nombre válidos (Aleatorio).
   - **EP056** - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (A priori).
   - **EP057** - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Pseudo-aleatorio).
   - **EP058** - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Aleatorio).
   - **EP059** - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (A priori).
   - **EP060** - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Pseudo-aleatorio).
   - **EP061** - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Aleatorio).
   - **EP062** - Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre válidos (Pseudo-aleatorio).
   - **EP063** - Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre válidos (Aleatorio).

---

### 6. Configuración
   - **EP064** - Debería permitir al usuario cambiar el título y configuración del sitio.

---
