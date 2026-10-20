# Ascenso a Root

App educativa para Android sobre comandos básicos de Ubuntu. La interfaz está hecha con HTML, CSS y JavaScript local; Kotlin la muestra con `WebView` y `WebViewAssetLoader`. Funciona sin conexión y no pide permisos.

## Estado de esta primera versión

- Inicio con el astronauta proporcionado por el equipo.
- Interfaz adaptable: el contenedor ocupa la altura visible del teléfono, el menú inferior permanece en la misma posición y el contenido largo se desplaza dentro de cada pantalla.
- Dashboard con porcentaje, misiones completadas y XP.
- Mapa de cinco misiones con desbloqueo progresivo.
- Terminal **simulada**: acepta los comandos previstos para cada misión y explica el resultado. Nunca ejecuta comandos del teléfono ni modifica Ubuntu.
- Cada misión muestra el paso actual; repetir un comando completado o escribirlo con errores produce una indicación concreta para continuar.
- En la misión 4 puedes elegir el nombre de la copia y moverla con `mv nombre proyectos` o `mv nombre proyectos/`. La pista y el paso siguiente usan el nombre elegido.
- Al completar las cinco misiones, el mapa permite repetirlas y muestra un mensaje de ruta terminada.
- Ajustes de sonido y avisos internos; opción para restablecer el progreso.
- Progreso guardado localmente con `localStorage` del WebView.

## Abrir y ejecutar

1. Instalar Android Studio con Android SDK 35 y JDK 17.
2. Abrir esta carpeta como proyecto en Android Studio.
3. Esperar la sincronización de Gradle. El proyecto incluye Gradle Wrapper 8.9.
4. Ejecutar el módulo `app` en un teléfono Android o emulador con Android 8.0 o superior.
5. Para generar un APK de prueba, usar **Build > Build APK(s)**.

La primera sincronización necesita internet para descargar las dependencias. Después, la interfaz y las misiones funcionan sin conexión.

Para revisar solo la interfaz en la computadora, abre `app/src/main/assets/index.html` en un navegador. La versión Android usa ese mismo contenido dentro de `WebView`.

## Pruebas

Con Node.js instalado, ejecuta `node --test tests/commands.test.cjs`. Las pruebas cubren la ruta de cinco misiones, los comandos alternativos de la misión 4 y los errores vistos en la grabación.

## Dónde editar

- `app/src/main/assets/index.html`: entrada de la interfaz.
- `app/src/main/assets/styles.css`: estética y adaptación a pantalla móvil.
- `app/src/main/assets/app.js`: pantallas, misiones, progreso y ajustes.
- `app/src/main/assets/astronauta.png`: imagen proporcionada por el equipo.
- `app/src/main/assets/app_logo.png`: logo usado dentro de la app.
- `app/src/main/res/drawable-nodpi/app_logo.png`: ícono que aparece en el teléfono.
- `app/src/main/java/com/equipo/ascensoaroot/MainActivity.kt`: contenedor Android.
- `app/src/main/AndroidManifest.xml`: configuración de la actividad y ajuste al abrir el teclado.
- `app/src/main/res/values/strings.xml`: nombre visible de la app.

El identificador de paquete es `com.equipo.ascensoaroot`.

## Pendiente para una entrega final

- Probar el APK en teléfonos reales, incluidos tamaños de pantalla distintos.
- Sustituir los símbolos provisionales por los íconos y tipografía definitivos si el equipo los crea.
- Revisar el texto pedagógico de cada misión con la rúbrica del PIA.
- Preparar manual y APK firmado si la entrega lo solicita.
