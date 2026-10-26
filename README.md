# Ascenso a Root

App educativa para Android, hecha como Producto Integrador de Aprendizaje (PIA) de **Sistemas Operativos** (FIME, UANL, Equipo 1 · Grupo 003). Sirve para repasar los temas del semestre con **Ubuntu** como sistema de referencia.

- Funciona **sin conexión** una vez instalada y no pide permisos.
- La terminal es **simulada**: valida lo que escribes, pero nunca ejecuta comandos reales ni modifica el teléfono.
- El progreso se guarda solo en el teléfono, en el almacenamiento local de la app.

---

## Cómo funciona la app

### Flujo de pantallas

```text
Portada (Avance PIA) → Inicio (astronauta) → Dashboard
                                                │
          Barra inferior: Dashboard · AFs · [Mapa] · Equipo · Ajustes
```

| Pantalla | Qué contiene |
|---|---|
| **Portada** | Logos de la UANL y la FIME, materia, maestra y semestre. Botón *Continuar*. |
| **Inicio** | Astronauta y botón *Comenzar expedición*. |
| **Dashboard** | Introducción del PIA, porcentaje de avance, misiones completadas, XP y acceso a la siguiente misión. |
| **AFs** | Las 4 actividades fundamentales del semestre. Al tocar una, el PDF se abre en un visor dentro de la app. |
| **Mapa** | Botón central de la barra. Un solo recorrido de la Tierra (abajo) a Root (arriba): 4 mundos de 5 niveles, separados por barreras con candado. |
| **Equipo** | Integrantes en orden alfabético, con foto, matrícula y programa. |
| **Ajustes** | Avisos, sonido, restablecer progreso, **Créditos / Conclusión** y *Acerca de*. |
| **Créditos / Conclusión** | Conclusión del semestre y créditos del equipo. Se abre desde Ajustes o **sola al terminar la última misión**. |

### Misiones

Son **20 niveles en 4 mundos**, uno por cada AF. Cada mundo tiene su propio fondo y una barrera arriba que se abre al completar sus 5 niveles. El nivel 5 de cada mundo es el jefe.

| Mundo | AF | Fondo |
|---|---|---|
| 1 · Salir de la Tierra | AF1 · Arquitectura, desempeño y tipos de SO | La Tierra y la nave en su plataforma |
| 2 · Navegar en el espacio | AF2 · Concurrencia | Espacio con nebulosas |
| 3 · Estación espacial | AF3 · Almacenaje, memoria y archivos | La estación espacial |
| 4 · Llegar a Root | AF4 · Redes y seguridad | El planeta Root y su escudo |

Los niveles se están programando por partes. Un nivel sin pasos aparece en el mapa como *Próximamente* y no se puede abrir.

- Cada misión vale **100 XP** y tiene pistas.
- *Restablecer progreso* borra las misiones completadas, pero conserva los ajustes de sonido y avisos.

### Botón Atrás de Android

- En una misión, regresa al Mapa.
- En Créditos, regresa a Ajustes.
- En el resto de los apartados, regresa a Inicio.
- En la Portada y en Inicio no cierra la app.

---

## Cómo está hecha

Android solo aporta el contenedor. Todo el juego es HTML, CSS y JavaScript local, que se muestra dentro de una `WebView`.

| Ruta | Para qué sirve |
|---|---|
| `app/src/main/assets/app.js` | Pantallas, misiones, validación de comandos, progreso, integrantes, AFs y conclusión. |
| `app/src/main/assets/styles.css` | Diseño: tema oscuro con naranja, tarjetas, barra inferior y diseño adaptable. |
| `app/src/main/assets/index.html` | Página de entrada que carga el CSS y el JS. |
| `app/src/main/assets/afs/` | Los 4 PDFs de las AFs (`AF1.pdf` a `AF4.pdf`). |
| `app/src/main/assets/icons/` | Íconos de la barra inferior. |
| `app/src/main/assets/equipo/` | Fotos de los integrantes. |
| `app/src/main/java/com/equipo/ascensoaroot/MainActivity.kt` | Crea la WebView, maneja el botón Atrás y manda los enlaces a PDF al visor. |
| `app/src/main/java/com/equipo/ascensoaroot/PdfViewerActivity.kt` | Visor de PDF propio, hecho con `PdfRenderer`. No necesita Internet ni otra app. |
| `app/src/main/AndroidManifest.xml` | Declara las dos pantallas Android, la orientación vertical y el ícono. |
| `tests/commands.test.cjs` | Pruebas de las pantallas y del motor de misiones. |

Datos técnicos: paquete `com.equipo.ascensoaroot`, Android 8.0 o superior (`minSdk 26`), `targetSdk 35`, Kotlin 2.0.21 y JDK 17.

---

## Cómo usarla

### Requisitos

- **Android Studio** (versión reciente) con **Android SDK 35**. Ya incluye el JDK que se necesita.
- La **primera** sincronización de Gradle necesita Internet para descargar dependencias. Después, todo funciona sin conexión.

### 1. Abrir el proyecto

1. Clona el repositorio o descarga la carpeta.
2. En Android Studio elige **File > Open** y selecciona la carpeta `ascenso-a-root`, la que contiene `settings.gradle.kts`.
3. Espera a que termine **Gradle Sync**.

### 2. En el emulador

1. Abre **Tools > Device Manager > Create Device** (en algunas versiones es **Add a new device > Create Virtual Device**).
2. Elige un teléfono, por ejemplo *Pixel 7*, y una imagen del sistema con **API 26 o superior** (se recomienda API 34 o 35).
3. Arranca el emulador y, en la barra superior, selecciona el módulo **app** y ese emulador.
4. Presiona **Run ▶** (`Shift + F10`). La app se instala y se abre.

### 3. En un celular Android (por cable USB)

1. En el teléfono activa las **Opciones de desarrollador**: *Ajustes > Acerca del teléfono* y toca **7 veces** *Número de compilación*. En algunas marcas está en *Información de software*.
2. En *Opciones de desarrollador* activa **Depuración por USB**.
3. Conecta el teléfono a la computadora y acepta el aviso **¿Permitir depuración USB?**
4. En Android Studio selecciona tu teléfono en la lista de dispositivos y presiona **Run ▶**.

### 4. En un celular sin cable (instalando el APK)

1. Genera el APK desde PowerShell, en la raíz del proyecto:
   ```powershell
   .\gradlew.bat assembleDebug
   ```
   O en Android Studio: **Build > Build App Bundle(s) / APK(s) > Build APK(s)**.
2. El archivo queda en:
   ```text
   app\build\outputs\apk\debug\app-debug.apk
   ```
3. Pásalo al teléfono (Drive, WhatsApp, cable…) y ábrelo. Android pedirá permitir **instalar apps de origen desconocido** para la app con la que lo abriste. Acepta e instala.

> Es un APK de depuración (*debug*). Sirve para probar y entregar avances, pero no está firmado para publicarse en Play Store.

Si ya tienes `adb` y el teléfono conectado, también puedes instalarlo con:

```powershell
adb install -r app\build\outputs\apk\debug\app-debug.apk
```

### 5. Ver solo la interfaz en la computadora

Para revisar cambios de diseño sin compilar, sirve la carpeta `assets` con un servidor local y ábrela en el navegador:

```powershell
cd app\src\main\assets
python -m http.server 8000
```

Luego entra a `http://localhost:8000`. Usa el modo de dispositivo móvil del navegador (`F12` y luego `Ctrl + Shift + M`).

- Si abres `index.html` con doble clic, los íconos de la barra no se ven, porque el navegador bloquea las máscaras de imagen en archivos locales. Con el servidor sí aparecen.
- En el navegador, los PDFs de las AFs se abren en una pestaña normal. El visor propio solo existe en Android.

---

## Pruebas

Con Node.js instalado, desde la raíz del proyecto:

```powershell
node --test tests/commands.test.cjs
```

Las pruebas revisan que haya 4 mundos de 5 niveles, que todas las pantallas se muestren, que las barreras se abran al completar un mundo y que el motor complete un nivel de prueba paso a paso y guarde el avance. No prueban la parte Android ni el diseño visual.

---

## Dónde editar

| Quiero cambiar… | Lugar |
|---|---|
| Textos, pasos y comandos de las misiones | Arreglo `missions` en `app.js` (cada nivel con su `steps`) |
| Nombres, AF y fondo de los mundos | Arreglo `worlds` y objeto `scenery` en `app.js`; estilos `.world-*` en `styles.css` |
| Introducción del PIA | `dashboard()` en `app.js` |
| Integrantes | Arreglo `teamMembers` en `app.js` y fotos en `assets/equipo/` |
| AFs (títulos, fechas, PDFs) | Arreglo `activities` en `app.js` y archivos en `assets/afs/` |
| Conclusión y créditos | `credits()` en `app.js` |
| Botones de la barra inferior | `nav()` en `app.js` e íconos en `assets/icons/` |
| Colores y estilos | `styles.css` |
| Nombre visible de la app | `app/src/main/res/values/strings.xml` |
| Ícono del teléfono | `app/src/main/res/drawable-nodpi/app_logo.png` |

---

## Notas

- La versión que se muestra en *Ajustes > Acerca de* (`1.7.0`) se escribe a mano en `app.js`. La versión del APK es `versionName` en `app/build.gradle.kts` (hoy `1.7.0`). Conviene mantener ambas iguales.
- No se versionan `app/build/`, `.gradle/`, `.idea/`, `.kotlin/`, `local.properties` ni los APK, porque están en `.gitignore`.
