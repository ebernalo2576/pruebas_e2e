# Pruebas Automatizadas Equipo 7

- Eduard Bernal (e.bernalo@uniandes.edu.co)
- Hector Lopez (hv.lopez@uniandes.edu.co)
- Nestor Martinez (na.martinezv1@uniandes.edu.co)
- Andres Felipe Romero (af.romerob1@uniandes.edu.co)

Link de la Wiki: [Aqui](https://github.com/ebernalo2576/pruebas_e2e/wiki)

# Kraken
## Requisitos Previos

- **Docker**: Asegúrese de tener Docker instalado en su máquina.
- **ADB (Android Developer Tools)**: Para macOS, puede instalarlo ejecutando:
  ```bash
  brew install android-developer-tools
  ```
- **Node.js**: Instale las dependencias del proyecto con `npm`.

## Instrucciones de Configuración

1. **Ejecutar la Aplicación Ghost en Docker**

   Ejecute el siguiente comando para iniciar Ghost versión 5.96 en un contenedor Docker:
   ```bash
   docker run --name my-ghost-596 -e url=http://localhost:3001 -e NODE_ENV=development -p 3001:2368 ghost:5.96
   ```

   Esto ejecutará Ghost en el puerto `3001` de su máquina local.

2. Clona este repositorio en tu máquina local usando el siguiente comando:

  ```bash
  git clone https://github.com/ebernalo2576/pruebas_e2e
  cd pruebas_e2e/pruebas_kraken
  ```

3. **Instalar Dependencias del Proyecto**

   Desde el directorio `pruebas_kraken`, ejecute:
   ```bash
   npm install
   ```

## Ejecución de Pruebas

Configurar los valores **USERNAME1** y **PASSWORD1** con las credenciales correctas para el login de Ghost en el archivo *pruebas_kraken/properties.json*


Para ejecutar todas las pruebas E2E del proyecto, simplemente ejecute:
```bash
npx kraken-node run
```


Tambien se puede ejecutar con el comando desde otro sistema operativo como Windows:
```bash
./node_modules/.bin/kraken-node run
```

### Nota:
Kraken ejecutará todas las pruebas en el proyecto simultáneamente. Si desea ejecutar un archivo de pruebas individual, renombrar todos los demás archivos cambiando la extension *.feature* y luego ejecutar el siguiente comando:

```bash
npx kraken-node run
```

---

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:
- **features**: Contiene los archivos `.feature` con los escenarios de prueba.
- **step_definitions**: Contiene las implementaciones de cada paso definido en los archivos `.feature`.
- **page_objects**: Incluye los objetos de página que representan las distintas páginas y funcionalidades de Ghost.

¡Listo! Ahora puedes ejecutar y personalizar tus pruebas según sea necesario.

# Cypress
## 1. Requisitos Previos

   - Node.js (versión 20.18.0 es la recomendada)
   - Git
   - Cypress (si no está instalado, se instalará como parte de este proyecto)


### 2. Instalación


#### Paso 1: Clonar el Repositorio
Clona este repositorio en tu máquina local usando el siguiente comando:

```bash
git clone https://github.com/ebernalo2576/pruebas_e2e
cd pruebas_e2e/pruebas_cypress
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
