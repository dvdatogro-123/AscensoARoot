# Ascenso a Root · Comandos para resolver el juego

Estos son los comandos que completan los 20 niveles, en orden. Cada bloque se escribe en la terminal del nivel, un comando a la vez.

Donde dice `<PID …>`, el número cambia en cada partida: hay que leerlo en la lista que muestran `ps -e` o `top` dentro del mismo nivel.

---

## Mundo 1 · Salir de la Tierra (AF1)

### Nivel 1 · Despertar
```
whoami
cat /etc/os-release
uname -r
```

### Nivel 2 · Verificación de sistemas
```
lscpu
free -h
lsblk
```

### Nivel 3 · Encendido de propulsores
```
systemctl --failed
systemctl status propulsores
systemctl start combustible
systemctl start propulsores
```

### Nivel 4 · Prueba de rendimiento
```
uptime
nproc
ls /sistemas/navegacion
cat /sistemas/navegacion/tiempo_real.txt
systemctl start navegacion-tiempo-real
```

### Nivel 5 · Secuencia de despegue (jefe)
```
systemctl reboot
systemctl --failed
systemctl status escudo-termico
systemctl start sensor-termico
systemctl start escudo-termico
systemctl start despegue
```

---

## Mundo 2 · Navegar en el espacio (AF2)

### Nivel 1 · Sistemas en vuelo
```
ps -e
kill <PID de señal_fantasma>
ps -e
```

### Nivel 2 · Proceso desbocado
```
top
renice 10 -p 812
top
```

### Nivel 3 · Trabajo en paralelo
```
reparar-casco &
ajustar-rumbo
jobs
```

### Nivel 4 · Sección crítica
```
cat /nave/combustible.log
systemctl start semaforo-combustible
cat /nave/combustible.log
```

### Nivel 5 · Abrazo mortal (jefe)
```
ps -e
cat /nave/robots.txt
kill <PID de robot-b>
systemctl start semaforo-herramientas
systemctl start robot-b
systemctl start motor-principal
```
También se puede detener `robot-a`. En ese caso, el quinto comando es `systemctl start robot-a`.

---

## Mundo 3 · Estación espacial (AF3)

### Nivel 1 · Acoplamiento
```
pwd
cd /estacion
ls
cd acceso
cat codigo.txt
```

### Nivel 2 · Memoria al límite
```
free -h
top
kill <PID de fuga_memoria>
free -h
```

### Nivel 3 · Almacén lleno
```
df -h
ls -lh /estacion/registros
rm /estacion/registros/registro_2019.log
df -h
```

### Nivel 4 · Compuerta sellada
```
cd /estacion/acceso
./abrir-compuerta
ls -l
chmod +x abrir-compuerta
./abrir-compuerta
```
El primer `./abrir-compuerta` responde *Permiso denegado*. Es parte del nivel.

### Nivel 5 · Falla del núcleo (jefe)
```
free -h
top
kill <PID de fuga_nucleo>
df -h
ls -lh /estacion/registros
rm /estacion/registros/respaldo_2020.log
cd /estacion/energia
./reiniciar-nucleo
chmod +x reiniciar-nucleo
./reiniciar-nucleo
```

---

## Mundo 4 · Llegar a Root (AF4)

### Nivel 1 · Contacto con Root
```
ip a
ping -c 4 root
ping -c 4 estacion
```

### Nivel 2 · Puerta trasera
```
ss -tuln
ps -e
kill <PID de actualizador>
ss -tuln
```

### Nivel 3 · Muro de fuego
```
ufw status
sudo ufw status
sudo ufw deny 31337
sudo ufw enable
sudo ufw status
```
El primer `ufw status` responde que se necesita ser root. Es parte del nivel.

### Nivel 4 · Transmisión alterada
```
ls /transmision
cat /transmision/firma.txt
sha256sum /transmision/ruta_a.txt /transmision/ruta_b.txt
cat /transmision/ruta_a.txt
```

### Nivel 5 · Ascenso a Root (jefe)
```
ss -tuln
ps -e
kill <PID de minero>
sudo ufw deny 4444
cat /transmision/firma_llave.txt
sha256sum /transmision/llave_root.txt
ping -c 4 root
sudo -i
whoami
```
Después de `sudo -i`, el prompt cambia de `$` a `#` y `whoami` responde `root`. Al terminar este nivel se abre la conclusión.

---

## Resumen · Todos los comandos del juego

Estos son todos los comandos que se usan en los 20 niveles. Con ellos se completa el juego de principio a fin; no se necesita ningún otro.

| Comando | Qué hace | Mundo |
|---|---|---|
| `whoami` | Muestra con qué usuario se trabaja | 1, 4 |
| `cat <archivo>` | Muestra el contenido de un archivo | 1, 2, 3, 4 |
| `uname -r` | Muestra la versión del kernel | 1 |
| `lscpu` | Muestra la información del procesador | 1 |
| `free -h` | Muestra la memoria RAM usada y libre | 1, 3 |
| `lsblk` | Lista los discos y sus particiones | 1 |
| `systemctl --failed` | Lista los servicios con falla | 1 |
| `systemctl status <servicio>` | Muestra el estado de un servicio | 1 |
| `systemctl start <servicio>` | Inicia un servicio | 1, 2 |
| `systemctl reboot` | Reinicia el sistema | 1 |
| `uptime` | Muestra cuánto tiempo lleva encendido el sistema | 1 |
| `nproc` | Muestra cuántos núcleos tiene el procesador | 1 |
| `ls <carpeta>` | Lista lo que hay en una carpeta | 1, 3, 4 |
| `ls -l` / `ls -lh` | Lista con permisos y tamaños | 3 |
| `ps -e` | Lista todos los procesos con su PID | 2, 4 |
| `top` | Muestra los procesos en tiempo real (CPU y memoria) | 2, 3 |
| `kill <PID>` | Detiene un proceso | 2, 3, 4 |
| `renice 10 -p <PID>` | Le baja la prioridad a un proceso | 2 |
| `<programa> &` | Ejecuta un programa en segundo plano | 2 |
| `jobs` | Lista los trabajos en segundo plano | 2 |
| `pwd` | Muestra la carpeta actual | 3 |
| `cd <carpeta>` | Cambia de carpeta | 3 |
| `df -h` | Muestra el espacio usado y libre del disco | 3 |
| `rm <archivo>` | Borra un archivo | 3 |
| `chmod +x <archivo>` | Le da permiso de ejecución a un archivo | 3 |
| `./<programa>` | Ejecuta un programa de la carpeta actual | 3 |
| `ip a` | Muestra las direcciones de red | 4 |
| `ping -c 4 <destino>` | Prueba la conexión enviando 4 paquetes | 4 |
| `ss -tuln` | Lista los puertos abiertos | 4 |
| `ufw status` | Muestra el estado del firewall | 4 |
| `sudo <comando>` | Ejecuta un comando como administrador | 4 |
| `sudo ufw deny <puerto>` | Bloquea un puerto en el firewall | 4 |
| `sudo ufw enable` | Activa el firewall | 4 |
| `sha256sum <archivos>` | Calcula la huella de uno o más archivos | 4 |
| `sudo -i` | Abre una sesión como root | 4 |

---

## Errores comunes

Estos son los errores que más se cometen al jugar. El juego avisa en cada caso y explica cómo corregirlo.

| Error | Qué pasa | Cómo se corrige |
|---|---|---|
| Escribir `who am i` o `whoiam` | El juego no lo acepta | Se escribe junto: `whoami` |
| Escribir mal `lsblk` (`lsblck`, `lsbk`…) | *Comando no encontrado* | Letra por letra: l-s-b-l-k |
| Escribir solo el nombre del archivo (`cat os-release`, `cat firma.txt`) | El archivo no está en la carpeta actual | Usar la ruta completa: `cat /etc/os-release` |
| Iniciar un servicio antes que el que necesita (`propulsores` antes que `combustible`) | *Dependencia inactiva* | Iniciar primero la dependencia |
| `systemctl status` sin nombre | Falta indicar el servicio | `systemctl status propulsores` |
| Poner un PID copiado de otra partida | *No existe ese proceso* | El PID cambia cada vez: leerlo con `ps -e` o `top` |
| `kill 812` en el Mundo 2, Nivel 2 | No se permite: es el soporte vital | Bajarle la prioridad: `renice 10 -p 812` |
| `renice -10` | Un número negativo da más prioridad | Usar `10` (positivo) |
| Olvidar el `&` en `reparar-casco` | La terminal se queda ocupada | `reparar-casco &` |
| `cd estacion` sin la `/` | No existe desde la carpeta personal | `cd /estacion` |
| `ls` sin `-lh` en los registros | Solo se ven los nombres, no los tamaños | `ls -lh /estacion/registros` |
| Borrar `registro_2026.log` | No se permite: es el registro actual | Borrar el antiguo (2019, o el respaldo de 2020 en el jefe) |
| Escribir `abrir-compuerta` sin `./` | Linux no lo busca en la carpeta actual | `./abrir-compuerta` |
| `chmod 777` | Da demasiados permisos | Basta con `chmod +x` |
| Usar `ifconfig` o `netstat` | Son comandos antiguos | En Ubuntu se usan `ip a` y `ss -tuln` |
| `ufw status` sin `sudo` | Se necesita ser root | `sudo ufw status` |
| `sudo ufw allow` en lugar de `deny` | Dejaría el puerto abierto | `sudo ufw deny <puerto>` |
| `sudo ufw enable` antes de bloquear el puerto | El orden importa | Primero `deny`, después `enable` |
| `sha256sum` con un solo archivo en el Mundo 4, Nivel 4 | No se pueden comparar las huellas | Poner los dos archivos en el mismo comando |
| Leer `ruta_b.txt` | Es la ruta alterada y lleva lejos de Root | Usar la ruta cuya huella coincide con la firma: `ruta_a.txt` |

Si un comando no corresponde al paso actual, la terminal responde *Comando no reconocido para este paso*. En ese caso se puede tocar **Ver pista** (si los *Avisos en la app* están activados en Ajustes). 
