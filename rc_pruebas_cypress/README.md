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
   - **EP008** - Debería permitir crear un tag con datos válidos (A priori).
   - **EP009** - Debería permitir crear un tag con datos válidos (Pseudo-aleatorio).
   - **EP010** - Debería permitir crear un tag con datos válidos (Aleatorio).za
   - **EP011** - Debería mostrar un error al intentar crear un tag sin datos (A priori).
   - **EP012** - Debería mostrar un error al intentar crear un tag sin datos (Pseudo-aleatorio).
   - **EP013** - Debería mostrar un error al intentar crear un tag sin datos (Aleatorio).
   - **EP014** - Debería permitir crear un tag con slug válido (A priori).
   - **EP015** - Debería permitir crear un tag con slug válido (Pseudo-aleatorio).
   - **EP016** - Debería permitir crear un tag con slug válido (Aleatorio).
   - **EP017** - Crear un nuevo tag con menos de 191 caracteres en el campo slug (A priori).
   - **EP018** - Crear un nuevo tag con menos de 191 caracteres en el campo slug (Pseudo-aleatorio).
   - **EP019** - Crear un nuevo tag con menos de 191 caracteres en el campo slug (Aleatorio).
   - **EP020** - Debería permitir crear un tag con descripción válida (A priori).
   - **EP021** - Debería permitir crear un tag con descripción válida (Pseudo-aleatorio).
   - **EP022** - Debería permitir crear un tag con descripción válida (Aleatorio).
   - **EP023** - Debería mostrar un error al intentar crear un tag con descripción demasiado larga (A priori).
   - **EP024** - Debería mostrar un error al intentar crear un tag con descripción demasiado larga (Pseudo-aleatorio).
   - **EP025** - Debería mostrar un error al intentar crear un tag con descripción demasiado larga (Aleatorio).
   - **EP026** - Debería mostrar un error al intentar crear un tag con name demasiado largo (A priori).
   - **EP027** - Debería mostrar un error al intentar crear un tag con name demasiado largo (Pseudo-aleatorio).
   - **EP028** - Debería mostrar un error al intentar crear un tag con name demasiado largo (Aleatorio).
   - **EP029** - Debería permitir editar un tag existente (A priori).
   - **EP030** - Debería permitir editar un tag existente (Pseudo-aleatorio).
   - **EP031** - Debería permitir editar un tag existente (Aleatorio).

---

### 4. Página
   - **EP032** - Debería permitir crear y visualizar una nueva página.
   - **EP033** - Debería permitir ver una página existente en la lista de páginas.
   - **EP034** - Debería validar los detalles de una página existente.
   - **EP035** - Debería permitir al usuario editar una página existente.
   - **EP036** - Debería permitir despublicar una página existente.
   - **EP037** - Debería permitir eliminar una página existente.

---

### 5. Miembro
   - **EP038** - Debería permitir crear y visualizar un nuevo miembro (A priori).
   - **EP039** - Debería permitir ver la lista de miembros.
   - **EP040** - Debería permitir al usuario editar un miembro existente (A priori).
   - **EP041** - Debería permitir eliminar un miembro existente.
   - **EP042** - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (A priori).
   - **EP043** - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (Pseudo-aleatorio).
   - **EP044** - Debería mostrar un error al intentar CREAR un miembro con un email duplicado (Aleatorio).
   - **EP045** - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (A priori).
   - **EP046** - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (Pseudo-aleatorio).
   - **EP047** - Debería mostrar un error al intentar EDITAR un miembro con un email duplicado (Aleatorio).
   - **EP048** - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (A priori).
   - **EP049** - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (Pseudo-aleatorio).
   - **EP050** - Debería mostrar un error al intentar crear un miembro con un email excesivamente largo de 200 caracteres (Aleatorio).
   - **EP051** - Debería mostrar un error al intentar CREAR un miembro con un email vacío (A priori).
   - **EP052** - Debería mostrar un error al intentar CREAR un miembro con un email vacío (Pseudo-aleatorio).
   - **EP053** - Debería mostrar un error al intentar CREAR un miembro con un email vacío (Aleatorio).
   - **EP054** - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (A priori).
   - **EP055** - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (Pseudo-aleatorio).
   - **EP056** - Debería mostrar un error al intentar EDITAR un miembro con un email vacío (Aleatorio).
   - **EP057** - Debería permitir al usuario EDITAR exitosamente un miembro existente con un email y nombre válidos (Pseudo-aleatorio).
   - **EP058** - Debería permitir al usuario EDITAR exitosamente un miembro existente con un email y nombre válidos (Aleatorio).
   - **EP059** - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (A priori).
   - **EP060** - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Pseudo-aleatorio).
   - **EP061** - Debería mostrar un error al intentar CREAR un miembro con un email en un formato inválido (Aleatorio).
   - **EP062** - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (A priori).
   - **EP063** - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Pseudo-aleatorio).
   - **EP064** - Debería mostrar un error al intentar EDITAR un miembro con un email en un formato inválido (Aleatorio).
   - **EP065** - Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre válidos (Pseudo-aleatorio).
   - **EP066** - Debería permitir CREAR exitosamente un nuevo miembro con un email y nombre válidos (Aleatorio).

---

### 6. Configuración
   - **EP067** - Debería permitir al usuario cambiar el título y configuración del sitio.

---
