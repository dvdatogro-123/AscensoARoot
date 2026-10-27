# Ascenso a Root · Explicación de los niveles

*Ascenso a Root* es un viaje de la Tierra al planeta Root, en 4 mundos de 5 niveles. Cada mundo corresponde a una actividad fundamental (AF) de la materia. El jugador maneja la nave desde una terminal de Linux simulada. **Ubuntu**, la inteligencia de la nave, explica cada comando con palabras sencillas, y el panel de arriba cambia con cada comando.

Cómo funciona cada nivel:

- Cada nivel enseña como máximo uno o dos comandos nuevos.
- El nivel 5 de cada mundo es el **jefe**: no enseña nada nuevo y se resuelve con lo aprendido en el mundo.
- Cada nivel vale 100 XP. El jefe vale 200 XP, y cada pista que se pide en él resta 50.
- La **Bitácora** guarda los comandos aprendidos, con su explicación y un ejemplo.
- Los comandos completos para resolver cada nivel están en [COMANDOS.md](COMANDOS.md).

---

## Mundo 1 · Salir de la Tierra

**AF1 · Arquitectura, desempeño y tipos de sistemas operativos**

La nave está en la plataforma de lanzamiento y Ubuntu acaba de despertar. El jugador tiene que conocer el sistema, revisar sus recursos y lograr el despegue.

| # | Nivel | Qué pasa | Qué aprende | Comandos nuevos |
|---:|---|---|---|---|
| 1 | Despertar | Ubuntu se enciende y pide identificarse. | Qué es un sistema operativo y qué es el kernel: el kernel controla el hardware y el sistema permite usarlo. | `whoami`, `cat`, `uname -r` |
| 2 | Verificación de sistemas | Revisión previa al despegue. | Los recursos que administra el sistema: procesador, memoria y almacenamiento. | `lscpu`, `free -h`, `lsblk` |
| 3 | Encendido de propulsores | Los propulsores no encienden porque dependen del combustible, que está detenido. | Qué es un servicio (un programa que corre en segundo plano), sus dependencias y systemd, el primer proceso (PID 1). | `systemctl --failed`, `status`, `start` |
| 4 | Prueba de rendimiento | Se mide la carga del sistema y se elige el modo de navegación. | Cómo leer la carga contra los núcleos del procesador, y los tipos de sistema: por lotes, tiempo compartido y tiempo real. | `uptime`, `nproc`, `ls` |
| 5 | Secuencia de despegue (jefe) | La nave reinicia y un servicio falla durante el arranque. | Las etapas del arranque (BIOS, GRUB, kernel y servicios) y cómo diagnosticar una falla capa por capa. | `systemctl reboot` y lo aprendido |

---

## Mundo 2 · Navegar en el espacio

**AF2 · Concurrencia**

La nave viaja por el espacio con muchos programas funcionando a la vez. El jugador aprende a ver y controlar esos procesos, y a evitar que choquen entre sí.

| # | Nivel | Qué pasa | Qué aprende | Comandos nuevos |
|---:|---|---|---|---|
| 1 | Sistemas en vuelo | Un proceso desconocido, `señal_fantasma`, provoca interferencia en las comunicaciones. | Qué es un proceso (un programa en ejecución), qué es su PID y cómo detenerlo. El PID cambia en cada partida. | `ps -e`, `kill` |
| 2 | Proceso desbocado | `soporte_vital` acapara el procesador, pero no se puede detener porque produce el oxígeno. | La prioridad de los procesos (valor nice) y cómo el planificador reparte los turnos del procesador. | `top`, `renice` |
| 3 | Trabajo en paralelo | Hay que reparar el casco y corregir el rumbo al mismo tiempo. | Ejecutar programas en segundo plano y la diferencia entre concurrencia y paralelismo. | `&`, `jobs` |
| 4 | Sección crítica | Dos motores usan el mismo tanque a la vez y el registro marca 45 L cuando quedan 35 L. | La condición de carrera, la sección crítica y cómo un semáforo hace que los procesos esperen su turno. | (repasa `cat` y `systemctl`) |
| 5 | Abrazo mortal (jefe) | Dos robots se bloquean: cada uno tiene la herramienta que el otro necesita. | El interbloqueo (abrazo mortal): cómo romperlo deteniendo un proceso y cómo evitarlo con un semáforo. | lo aprendido |

---

## Mundo 3 · Estación espacial

**AF3 · Almacenaje, memoria y archivos**

La nave se acopla a una estación espacial con problemas de memoria, de espacio en disco y de permisos.

| # | Nivel | Qué pasa | Qué aprende | Comandos nuevos |
|---:|---|---|---|---|
| 1 | Acoplamiento | Hay que encontrar el código de acceso dentro de las carpetas de la estación. | Cómo se organiza el sistema de archivos: un árbol que empieza en la raíz `/`, y las rutas. La terminal muestra en qué carpeta está el jugador. | `pwd`, `cd` |
| 2 | Memoria al límite | La estación va lenta porque un proceso, `fuga_memoria`, no libera la memoria que usa. | La diferencia entre la RAM (rápida) y el swap o memoria virtual (más lenta, usa el disco), y qué es una fuga de memoria. | (repasa `free -h`, `top`, `kill`) |
| 3 | Almacén lleno | No hay espacio en el disco para guardar los datos del acoplamiento. | Revisar el espacio en disco, ver el tamaño de los archivos y borrar con cuidado: `rm` no manda a una papelera. | `df -h`, `ls -lh`, `rm` |
| 4 | Compuerta sellada | El programa que abre la compuerta no se puede ejecutar. | Los permisos de los archivos: `r` leer, `w` escribir y `x` ejecutar. El sistema de archivos también protege. | `./`, `ls -l`, `chmod +x` |
| 5 | Falla del núcleo (jefe) | El núcleo de energía no reinicia por tres fallas seguidas: memoria, disco y permisos. | Cómo la memoria, el almacenamiento y los permisos sostienen juntos un sistema estable. | lo aprendido |

---

## Mundo 4 · Llegar a Root

**AF4 · Redes y seguridad en sistemas distribuidos**

La nave llega a Root, una red de equipos. Antes de aterrizar hay que limpiar la nave de amenazas y demostrar que es segura. Aquí aparece por primera vez `sudo`, y al final el jugador se convierte en root.

| # | Nivel | Qué pasa | Qué aprende | Comandos nuevos |
|---:|---|---|---|---|
| 1 | Contacto con Root | La nave entra en órbita y busca comunicación. Root responde, la estación que quedó atrás ya no. | Qué es un sistema distribuido, qué es una dirección IP y cómo comprobar si otro equipo responde. | `ip a`, `ping -c` |
| 2 | Puerta trasera | Hay un puerto abierto que no pertenece a la nave. Lo abrió `actualizador`, un troyano. | Qué es un puerto y qué es un troyano: malware disfrazado de un programa útil. | `ss -tuln` |
| 3 | Muro de fuego | El firewall está apagado y solo root puede cambiarlo. | Qué es un firewall, el control de acceso, qué hace `sudo` y el principio de menor privilegio. | `sudo`, `ufw` |
| 4 | Transmisión alterada | Root envía sus coordenadas por dos rutas y un intruso modifica una. | La integridad de la información: la huella de un archivo revela si alguien lo modificó. | `sha256sum` |
| 5 | Ascenso a Root (jefe) | Un minero de criptomonedas hace que Root bloquee a la nave. Hay que detenerlo, verificar la llave y descender. | La defensa en profundidad y el cryptojacking. Con `sudo -i` el jugador se vuelve root: el prompt cambia de `$` a `#` y `whoami` responde `root`. | `sudo -i` y lo aprendido |

Al terminar el nivel 20 se abre la conclusión del proyecto.

---

## Resumen

| Mundo | AF | Comandos que se aprenden |
|---|---|---|
| 1 · Salir de la Tierra | AF1 | `whoami`, `cat`, `uname -r`, `lscpu`, `free -h`, `lsblk`, `systemctl`, `uptime`, `nproc`, `ls` |
| 2 · Navegar en el espacio | AF2 | `ps -e`, `kill`, `top`, `renice`, `&`, `jobs` |
| 3 · Estación espacial | AF3 | `pwd`, `cd`, `df -h`, `ls -lh`, `rm`, `./`, `ls -l`, `chmod +x` |
| 4 · Llegar a Root | AF4 | `ip a`, `ping -c`, `ss -tuln`, `sudo`, `ufw`, `sha256sum`, `sudo -i` |

El primer comando del juego es `whoami` y responde el nombre del jugador. El último también es `whoami`, y ahora responde `root`.
