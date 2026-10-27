# Ascenso a Root

App educativa para Android, hecha como Producto Integrador de Aprendizaje (PIA) de **Sistemas Operativos** (FIME, UANL, Equipo 1 · Grupo 003). Sirve para repasar los temas del semestre con **Ubuntu** como sistema de referencia.

- Funciona **sin conexión** una vez instalada y no pide permisos.
- La terminal es **simulada**: valida lo que escribes, pero nunca ejecuta comandos reales ni modifica el teléfono.
- El progreso se guarda solo en el teléfono, en el almacenamiento local de la app.

---

## Cómo funciona la app

### Flujo de pantallas

```text
Portada (Avance PIA) → Inicio (astronauta) → Registro de usuario (solo la primera vez) → Dashboard
                                                                                          │
          Barra inferior: Dashboard · AFs · [Mapa] · Equipo · Ajustes
```

| Pantalla | Qué contiene |
|---|---|
| **Portada** | Logos de la UANL y la FIME, materia, maestra y semestre. Botón *Continuar*. |
| **Inicio** | Astronauta y botón *Comenzar expedición*. |
| **Registro de usuario** | Solo la primera vez. Ubuntu pide un nombre de usuario y lo ajusta al formato de Linux (minúsculas, sin espacios ni acentos). Si queda vacío, es `explorador`. Ese nombre aparece en `whoami` y en la terminal. |
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

Los **20 niveles** están programados. Si en el futuro se agrega un nivel sin pasos, aparece en el mapa como *Próximamente* y no se puede abrir.

| # | Nivel del Mundo 1 | Comandos | Panel de la nave |
|---:|---|---|---|
| 1 | Despertar | `whoami`, `cat /etc/os-release`, `uname -r` | Cabina: se enciende el ojo de Ubuntu, su núcleo y las luces |
| 2 | Verificación de sistemas | `lscpu`, `free -h`, `lsblk` | Medidores de procesador, memoria y almacenamiento |
| 3 | Encendido de propulsores | `systemctl --failed`, `status`, `start` | Servicios combustible → propulsores; el cohete enciende motores |
| 4 | Prueba de rendimiento | `uptime`, `nproc`, `ls`, `cat`, `systemctl start` | Carga del sistema con tendencia y modos de navegación |
| 5 | Secuencia de despegue (jefe) | `systemctl reboot` y lo aprendido | Animación del arranque, cuenta regresiva y despegue |

| # | Nivel del Mundo 2 | Comandos | Panel de la nave |
|---:|---|---|---|
| 1 | Sistemas en vuelo | `ps -e`, `kill` | Señal con interferencia y lista de procesos; `señal_fantasma` tiene un PID distinto en cada partida |
| 2 | Proceso desbocado | `top`, `renice` | Uso de procesador por proceso; `soporte_vital` no se puede detener, solo bajar su prioridad |
| 3 | Trabajo en paralelo | `&`, `jobs` | Casco reparándose en segundo plano mientras se corrige el rumbo |
| 4 | Sección crítica | `cat`, `systemctl start` | Tanque compartido: condición de carrera (45 L contra 35 L) y semáforo |
| 5 | Abrazo mortal (jefe) | lo aprendido | Dos robots bloqueados; se detiene uno (cualquiera), se activa el semáforo y enciende el motor principal |

| # | Nivel del Mundo 3 | Comandos | Panel de la nave |
|---:|---|---|---|
| 1 | Acoplamiento | `pwd`, `cd` | Árbol de carpetas con "Aquí" en la carpeta actual; la cabecera de la terminal muestra la ruta |
| 2 | Memoria al límite | `free -h`, `top`, `kill` | RAM y swap; `fuga_memoria` tiene un PID distinto en cada partida |
| 3 | Almacén lleno | `df -h`, `ls -lh`, `rm` | Disco al 98 % y registros con su tamaño; el registro actual no se puede borrar |
| 4 | Compuerta sellada | `./`, `ls -l`, `chmod +x` | Compuerta y permisos `rw-` → `rwx` |
| 5 | Falla del núcleo (jefe) | lo aprendido | Tres fallas encadenadas (memoria, disco, permisos) y el núcleo que se enciende |

| # | Nivel del Mundo 4 | Comandos | Panel de la nave |
|---:|---|---|---|
| 1 | Contacto con Root | `ip a`, `ping -c 4` | IP de la nave y enlaces con Root (responde) y con la estación (100 % perdidos) |
| 2 | Puerta trasera | `ss -tuln`, `ps -e`, `kill` | Puertos abiertos; el 31337 lo abrió el troyano `actualizador` (PID aleatorio) |
| 3 | Muro de fuego | `sudo`, `ufw` | Firewall: `ufw` sin `sudo` pide ser root; se bloquea el 31337 y se activa |
| 4 | Transmisión alterada | `sha256sum` | Huella oficial y dos rutas: una coincide y la otra fue alterada |
| 5 | Ascenso a Root (jefe) | `sudo -i` y lo aprendido | Cryptojacking, llave verificada y descenso; el prompt cambia de `$` a `#` y `whoami` responde `root` |

Al completar el nivel 20 se abre la conclusión.

- En cada nivel habla **Ubuntu**, la IA de la nave, de forma seria. Los errores comunes no solo se marcan: Ubuntu explica qué pasó.
- Se aceptan variantes válidas de Linux: espacios extra, `.service` al final o `/` al final de una ruta.
- Bajo la terminal hay atajos: `TAB` (completa la palabra), `↑`/`↓` (historial), `/`, `-`, `&`, `~` y `clear`.
- **Bitácora:** lista los comandos aprendidos, con qué hacen y un ejemplo.
- Cada nivel vale **100 XP**. El jefe vale **200 XP** y cada pista que se ve en él resta 50 (mínimo 50).
- *Restablecer progreso* borra los niveles completados y los XP, pero conserva el nombre de usuario y los ajustes de sonido y avisos.

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
| `app/src/main/assets/app.js` | Pantallas, mapa, motor de los niveles (validación, animaciones, XP, bitácora), registro de usuario, integrantes, AFs y conclusión. |
| `app/src/main/assets/niveles.js` | Contenido de los niveles: lo que dice Ubuntu, comandos, respuestas de la terminal, errores explicados, pistas y el panel de cada nivel. También la bitácora. |
| `app/src/main/assets/figuras/` | Figuras del juego en PNG: `cohete.png` y `ojo-ubuntu.png`. |
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

Las pruebas juegan los 20 niveles con sus comandos reales y revisan que se abran las barreras, que al final el prompt cambie a `#` y se ofrezca la conclusión, que `ufw` sin `sudo` pida ser root, la ruta alterada, las rutas de `cd`, que `rm` no borre el registro actual, el *Permiso denegado* y las fallas del jefe del Mundo 3, los PID aleatorios y los errores de `kill`, que `soporte_vital` no se pueda detener, las dos formas de resolver el jefe del Mundo 2, el ajuste del nombre de usuario, las variantes aceptadas y los errores explicados, los modos rechazados del nivel 4, el arranque, las pistas con descuento y el despegue del jefe, y la bitácora. No prueban la parte Android ni el diseño visual.

---

## Dónde editar

| Quiero cambiar… | Lugar |
|---|---|
| Textos, pasos, comandos y panel de los niveles | `niveles.js` (`world1Levels` a `world4Levels`); se conectan a su mundo en `levelContent` de `app.js` |
| Comandos de la bitácora | Arreglo `glossary` en `niveles.js` |
| Nombres de los niveles en el mapa | Arreglo `missions` en `app.js` |
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

- La versión que se muestra en *Ajustes > Acerca de* (`1.12.0`) se escribe a mano en `app.js`. La versión del APK es `versionName` en `app/build.gradle.kts` (hoy `1.12.0`). Conviene mantener ambas iguales.
- No se versionan `app/build/`, `.gradle/`, `.idea/`, `.kotlin/`, `local.properties` ni los APK, porque están en `.gitignore`.
