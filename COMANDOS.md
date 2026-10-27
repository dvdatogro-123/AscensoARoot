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
