/* Ascenso a Root: contenido de los niveles. Se carga antes de app.js. */
// Cada paso: say (lo que dice Ubuntu), hint, answers { comando: salida } y errors { comando: explicación }.
// Una respuesta puede ser texto o { out, note, set, anim }: note es un comentario de Ubuntu,
// set guarda datos para el panel y anim lanza una animación antes de avanzar.
// En los textos, {user} se reemplaza por el nombre de usuario del jugador.

const pilotNote = 'En un sistema real esta operación requiere sudo. Usted tiene autorización de piloto.';
const dependencyError = 'Error: dependencia combustible.service inactiva. Un servicio no puede iniciar si sus dependencias están detenidas.';
const lsblkTypo = 'Comando no encontrado. Verifique la escritura: l-s-b-l-k (list block devices).';
const navModes = {
  'cat /sistemas/navegacion/por_lotes.txt': { out: 'MODO: POR LOTES\nAgrupa tareas y las ejecuta en secuencia, sin interacción.\nEficiente para cálculos largos.\nTiempo de respuesta: no garantizado.', set: { readLotes: true } },
  'cat /sistemas/navegacion/tiempo_compartido.txt': { out: 'MODO: TIEMPO COMPARTIDO\nReparte el procesador entre varios usuarios y programas en turnos rápidos.\nUso general.\nTiempo de respuesta: variable.', set: { readCompartido: true } },
  'cat /sistemas/navegacion/tiempo_real.txt': { out: 'MODO: TIEMPO REAL\nGarantiza respuesta dentro de un límite fijo de milisegundos.\nUso: control de vuelo, equipo médico, robótica.\nTiempo de respuesta: garantizado.', set: { readReal: true } }
};
const launchAbort = 'Despegue abortado. Escudo térmico inactivo. Sin protección térmica no es posible abandonar la atmósfera.';
const shieldNeedsSensor = 'Fallo: el escudo térmico requiere sensor-termico activo.';

// Piezas del panel de la nave
function rocket(firing) {
  return `<div class="rocket${firing ? ' firing' : ''}"><img src="figuras/cohete.png" alt=""><i class="rocket-flame"></i></div>`;
}
function readout(label, value, status, note, bar) {
  return `<div class="readout ${status}"><span class="readout-label">${label}</span><strong class="readout-value">${value}</strong>${bar === undefined ? '' : `<span class="gauge-bar"><i style="--fill:${bar}%"></i></span>`}<span class="readout-state">${note}</span></div>`;
}
function serviceModule(name, unit, status) {
  const label = { active: 'Activo', fail: 'Falla', off: 'Detenido', idle: 'Sin datos' }[status];
  return `<div class="module ${status}"><span class="module-head"><i class="led"></i>${name}</span><code>${unit}</code><span class="module-state">${label}</span></div>`;
}

const world1Levels = [
  {
    tag: 'Cabina',
    steps: [
      { say: 'Sistemas en reposo. Actividad detectada en cabina. Identifíquese. Comando: whoami.',
        hint: 'Escriba whoami y pulse Ejecutar.',
        answers: { 'whoami': '{user}' },
        errors: { 'who am i': 'En Linux se escribe junto: whoami.', 'whoiam': 'Verifique la escritura: w-h-o-a-m-i.' } },
      { say: 'Usuario {user} verificado. Mi identificación se encuentra en /etc/os-release. cat muestra el contenido de un archivo. Consúltela.',
        hint: 'Escriba cat /etc/os-release.',
        answers: { 'cat /etc/os-release': 'NAME="Ubuntu"\nVERSION="24.04 LTS"' },
        errors: { 'cat os-release': 'Ese archivo no está aquí. Se encuentra en la carpeta /etc: escriba cat /etc/os-release.', 'cat': 'Indique qué archivo mostrar: cat /etc/os-release.' } },
      { say: 'Soy Ubuntu, sistema operativo de esta nave. Administro procesador, memoria, almacenamiento y dispositivos. Para ver la versión de mi kernel: uname -r.',
        hint: 'Escriba uname -r.',
        answers: { 'uname -r': '6.8.0-generic', 'uname': { out: 'Linux', note: 'Linux. Ese es mi kernel. Con -r vería su versión.' } } }
    ],
    ending: 'Kernel Linux 6.8 en línea. El kernel controla el hardware; yo le permito a usted utilizarlo. Asignación confirmada: compañeros de misión. Siguiente procedimiento: verificación de sistemas previa al despegue.',
    panel(v) {
      const s = v.step;
      const lights = Array.from({ length: 12 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
      return `<div class="cabin${s === 0 ? ' is-dark' : ''}">
        <div class="eye${s >= 2 ? ' on' : ''}${s >= 3 ? ' core' : ''}"><img src="figuras/ojo-ubuntu.png" alt=""><i class="eye-core"></i></div>
        <p class="eye-status">${s >= 2 ? 'Ubuntu en línea' : 'Ubuntu en reposo'}</p>
        <div class="readouts">
          ${readout('Usuario', s >= 1 ? safe(v.user) : '???', s >= 1 ? 'ok' : 'pending', s >= 1 ? 'Verificado' : 'Pendiente')}
          ${readout('Sistema', s >= 2 ? 'Ubuntu' : '???', s >= 2 ? 'ok' : 'pending', s >= 2 ? '24.04 LTS' : 'Pendiente')}
          ${readout('Kernel', s >= 3 ? 'Linux 6.8' : '???', s >= 3 ? 'ok' : 'pending', s >= 3 ? 'En línea' : 'Pendiente')}
        </div>
        <div class="cabin-lights${s >= 3 ? ' on' : ''}" aria-hidden="true">${lights}</div>
      </div>`;
    }
  },
  {
    tag: 'Plataforma de lanzamiento',
    steps: [
      { say: 'Verificación previa al despegue. Primer sistema: procesador. Comando: lscpu.',
        hint: 'Escriba lscpu.',
        answers: { 'lscpu': 'Arquitectura:        x86_64\nCPU(s):              4\nNombre del modelo:   Nave-Core 3.2 GHz' } },
      { say: 'Procesador en línea. Siguiente: memoria. Use free -h; la -h muestra los valores en formato legible para humanos.',
        hint: 'Escriba free -h.',
        answers: {
          'free -h': '        total   usado   libre\nMem:    8.0Gi   2.1Gi   5.9Gi',
          'free': { out: '        total     usado     libre\nMem:  8048432   2110204   5938228', note: 'Valores en kilobytes. Con -h se muestran en formato legible.' }
        } },
      { say: 'Memoria dentro de parámetros. Último sistema: almacenamiento. Comando: lsblk.',
        hint: 'Escriba lsblk.',
        answers: { 'lsblk': 'NAME     SIZE   MOUNTPOINT\nsda      128G\n├─sda1    96G   /\n└─sda2    32G   /datos' },
        errors: { 'lsblck': lsblkTypo, 'lsbkl': lsblkTypo, 'lsbk': lsblkTypo, 'lsblkk': lsblkTypo, 'lsbl': lsblkTypo } }
    ],
    ending: 'Procesador, memoria y almacenamiento verificados. Estos son los recursos que administro. Estado de la nave: apta para la siguiente fase.',
    panel(v) {
      const s = v.step;
      return `<div class="pad-grid">
        <div class="pad-scene"><i class="tower" aria-hidden="true"></i>${rocket(false)}<i class="pad-base" aria-hidden="true"></i></div>
        <div class="gauges">
          ${readout('Procesador', s >= 1 ? '4 núcleos' : '???', s >= 1 ? 'ok' : 'pending', s >= 1 ? 'x86_64 · 3.2 GHz' : 'Pendiente')}
          ${readout('Memoria', s >= 2 ? '8.0 GiB' : '???', s >= 2 ? 'ok' : 'pending', s >= 2 ? 'Usado 2.1 GiB · 26 %' : 'Pendiente', s >= 2 ? 26 : 0)}
          ${readout('Almacenamiento', s >= 3 ? '128 GB' : '???', s >= 3 ? 'ok' : 'pending', s >= 3 ? 'sda1 / · sda2 /datos' : 'Pendiente')}
        </div>
      </div>`;
    }
  },
  {
    tag: 'Sala de máquinas',
    steps: [
      { say: 'Encendido de propulsores: sin respuesta. Hay servicios con falla. Para listarlos: systemctl --failed.',
        hint: 'Escriba systemctl --failed.',
        answers: { 'systemctl --failed': '  UNIT                 ACTIVE   SUB\n● propulsores.service  failed   failed\n\n1 servicio con falla.' },
        errors: { 'systemctl start propulsores': dependencyError } },
      { say: 'Servicio propulsores con falla. Consulte su estado para conocer la causa: systemctl status propulsores.',
        hint: 'Escriba systemctl status propulsores.',
        answers: { 'systemctl status propulsores': '● propulsores.service - Propulsores principales\n   Active: failed\n   Requiere: combustible.service (inactivo)' },
        errors: { 'systemctl status': 'Especifique el servicio: systemctl status propulsores.', 'systemctl start propulsores': dependencyError } },
      { say: `Causa identificada: propulsores depende de combustible, que está detenido. Inicie primero ese servicio con systemctl start combustible. ${pilotNote}`,
        hint: 'Escriba systemctl start combustible.',
        answers: {
          'systemctl start combustible': 'combustible.service: active (running)',
          'service combustible start': { out: 'combustible.service: active (running)', note: 'Sintaxis heredada. En esta nave se utiliza systemctl.' }
        },
        errors: { 'systemctl start propulsores': dependencyError } },
      { say: 'Dependencia satisfecha. Inicie propulsores.',
        hint: 'Escriba systemctl start propulsores.',
        answers: {
          'systemctl start propulsores': 'propulsores.service: active (running)',
          'service propulsores start': { out: 'propulsores.service: active (running)', note: 'Sintaxis heredada. En esta nave se utiliza systemctl.' }
        } }
    ],
    ending: 'Propulsores en línea. Un servicio es un programa que ejecuto en segundo plano, sin intervención directa. Los administra systemd, el primer proceso que inicio al arrancar: PID 1. El kernel controla el hardware; los servicios operan en el espacio de usuario. Siguiente procedimiento: prueba de rendimiento.',
    panel(v) {
      const s = v.step;
      return `<div class="engine-grid">
        <div class="pad-scene small">${rocket(s >= 4)}</div>
        <div class="engine-chain">
          ${serviceModule('Combustible', 'combustible.service', s >= 3 ? 'active' : 'off')}
          <div class="pipe${s >= 2 ? ' marked' : ''}${s >= 3 ? ' full' : ''}" aria-hidden="true"><i></i></div>
          ${serviceModule('Propulsores', 'propulsores.service', s >= 4 ? 'active' : 'fail')}
        </div>
      </div>
      <p class="panel-foot">Dependencia <code>combustible → propulsores</code></p>`;
    }
  },
  {
    tag: 'Rendimiento y navegación',
    extras: navModes,
    steps: [
      { say: 'Prueba de rendimiento. Consulte el tiempo activo y la carga del sistema: uptime.',
        hint: 'Escriba uptime.',
        answers: { 'uptime': ' 09:41:07 up 12 min,  1 usuario,  load average: 3.60, 2.90, 1.40' } },
      { say: 'Tres valores: promedio de carga en 1, 5 y 15 minutos. Tendencia ascendente: 1.4 → 2.9 → 3.6, consecuencia del encendido de servicios. Para interpretar la carga actual debe conocer cuántos núcleos tengo: nproc.',
        hint: 'Escriba nproc.',
        answers: { 'nproc': '4' } },
      { say: 'Carga de 3.6 sobre 4 núcleos: 90 % de capacidad. Aceptable para despegar. El módulo de navegación no tiene modo asignado. Los modos están en /sistemas/navegacion. ls muestra lo que hay dentro de una carpeta.',
        hint: 'Escriba ls /sistemas/navegacion.',
        answers: { 'ls /sistemas/navegacion': 'por_lotes.txt  tiempo_compartido.txt  tiempo_real.txt' },
        errors: { 'ls': 'Aquí no están los modos. Indique la carpeta: ls /sistemas/navegacion.' } },
      { say: 'Lea cada modo con cat y determine cuál exige la navegación. El vuelo requiere respuesta inmediata.',
        hint: 'Por ejemplo: cat /sistemas/navegacion/tiempo_real.txt. Puede leer los tres.',
        answers: navModes },
      { say: 'Cuando haya decidido, inicie el modo con systemctl start navegacion-<modo>.',
        hint: 'La navegación exige respuesta garantizada. Escriba systemctl start navegacion-tiempo-real.',
        answers: { 'systemctl start navegacion-tiempo-real': 'navegacion-tiempo-real.service: active (running)' },
        errors: {
          'systemctl start navegacion-por-lotes': { message: 'Modo rechazado. El procesamiento por lotes no garantiza tiempo de respuesta. La navegación no puede esperar.', set: { rejectLotes: true } },
          'systemctl start navegacion-tiempo-compartido': { message: 'Modo rechazado. El tiempo de respuesta variable es insuficiente para control de vuelo.', set: { rejectCompartido: true } }
        } }
    ],
    ending: 'Navegación en tiempo real en línea. Cada tipo de sistema operativo responde a una necesidad distinta: un error de milisegundos en vuelo es inaceptable. Rendimiento y navegación verificados. Siguiente procedimiento: secuencia de despegue.',
    panel(v) {
      const s = v.step, f = v.flags;
      const trend = s >= 1 ? [[1.4, '15 min'], [2.9, '5 min'], [3.6, '1 min']].map(([load, label]) => `<span class="trend-bar"><i style="--h:${load / 4 * 100}%"></i><small>${label}</small></span>`).join('') : '';
      const slot = (name, read, rejected, active) => {
        const status = active ? 'active' : rejected ? 'fail' : read ? 'read' : 'idle';
        const label = { active: 'Activo', fail: 'Rechazado', read: 'Leído', idle: 'Sin leer' }[status];
        return `<div class="nav-slot ${status}"><span>${name}</span><small>${label}</small></div>`;
      };
      return `<div class="perf-grid">
        <div class="load-card">
          <span class="readout-label">Carga del sistema</span>
          <strong class="load-value">${s >= 1 ? '3.6' : '???'}${s >= 2 ? '<small> / 4 núcleos</small>' : ''}</strong>
          <span class="gauge-bar"><i style="--fill:${s >= 2 ? 90 : 0}%"></i></span>
          <span class="readout-state">${s >= 2 ? '90 % · Alto, dentro de límite' : s >= 1 ? 'Falta conocer los núcleos' : 'Pendiente'}</span>
          <div class="trend">${trend}</div>
        </div>
        <div class="nav-module">
          <span class="readout-label">Módulo de navegación</span>
          ${s >= 3 ? slot('Por lotes', f.readLotes, f.rejectLotes, false) + slot('Tiempo compartido', f.readCompartido, f.rejectCompartido, false) + slot('Tiempo real', f.readReal, false, s >= 5) : '<div class="nav-slot idle"><span>Sin modo asignado</span><small>???</small></div>'}
          <div class="radar${s >= 5 ? ' on' : ''}"><i></i><small>${s >= 5 ? 'Radar en línea' : 'Radar en espera'}</small></div>
        </div>
      </div>`;
    }
  },
  {
    tag: 'Despegue',
    boss: true,
    steps: [
      { say: 'Todos los sistemas verificados. Para iniciar el despegue, reinicie la nave: systemctl reboot.',
        hint: 'Escriba systemctl reboot.',
        answers: { 'systemctl reboot': { anim: 'boot' } } },
      { say: 'Un servicio falló. Usted ya sabe cómo encontrarlo.',
        hint: 'Liste los servicios con falla: systemctl --failed.',
        answers: { 'systemctl --failed': '  UNIT                    ACTIVE   SUB\n● escudo-termico.service  failed   failed' },
        errors: { 'systemctl start despegue': launchAbort } },
      { say: 'Averigüe la causa.',
        hint: 'Consulte el estado del servicio: systemctl status escudo-termico.',
        answers: { 'systemctl status escudo-termico': '● escudo-termico.service - Escudo térmico\n   Active: failed\n   Requiere: sensor-termico.service (detenido)' },
        errors: { 'systemctl start escudo-termico': shieldNeedsSensor, 'systemctl start despegue': launchAbort } },
      { say: 'Causa identificada: el escudo térmico depende de un sensor detenido. Resuelva la dependencia.',
        hint: 'El escudo necesita el sensor. Enciéndalo: systemctl start sensor-termico.',
        answers: { 'systemctl start sensor-termico': 'sensor-termico.service: active (running)' },
        errors: { 'systemctl start escudo-termico': shieldNeedsSensor, 'systemctl start despegue': launchAbort } },
      { say: 'Sensor térmico en línea. Falta el sistema que dependía de él.',
        hint: 'Ahora encienda el escudo: systemctl start escudo-termico.',
        answers: { 'systemctl start escudo-termico': 'escudo-termico.service: active (running)' },
        errors: { 'systemctl start despegue': launchAbort } },
      { say: 'Todos los sistemas en línea. Confirme el despegue.',
        hint: 'Escriba systemctl start despegue.',
        answers: { 'systemctl start despegue': { anim: 'launch' } } }
    ],
    ending: 'Despegue exitoso. Usted presenció mi arranque completo: el firmware revisa el hardware, GRUB carga el kernel, el kernel toma los dispositivos y systemd inicia los servicios. Cuando algo falla, se diagnostica capa por capa. Abandonando la atmósfera. Próximo destino: espacio profundo.',
    panel(v) {
      const s = v.step, f = v.flags;
      const stages = ['BIOS', 'GRUB', 'Kernel', 'Servicios'].map((name, i) => {
        const reached = (f.boot || 0) > i;
        const status = i === 3 && s >= 5 ? 'ok' : i === 3 && f.bootFail ? 'fail' : reached ? 'ok' : 'idle';
        return `<span class="boot-stage ${status}">${name}</span>`;
      }).join('<i class="boot-sep" aria-hidden="true">›</i>');
      const mod = (name, status) => `<span class="mini-module ${status}"><i class="led"></i>${name}</span>`;
      const shield = s >= 5 ? 'active' : f.bootFail ? 'fail' : 'idle';
      return `<div class="launch-grid">
        <div class="pad-scene${f.launch ? ' launching' : ''}"><i class="tower" aria-hidden="true"></i>${rocket(s >= 5 && Boolean(f.count || f.launch))}<i class="pad-base" aria-hidden="true"></i><span class="smoke" aria-hidden="true"><i></i><i></i><i></i></span></div>
        <div class="launch-side">
          <div class="countdown"><small>T-menos</small><strong>${f.launch ? '0' : f.count || '—'}</strong></div>
          ${mod('Sensor térmico', s >= 4 ? 'active' : f.bootFail ? 'off' : 'idle')}
          ${mod('Escudo térmico', shield)}
          ${mod('Propulsores', 'active')}
          ${mod('Navegación', 'active')}
        </div>
      </div>
      <div class="boot-bar">${stages}</div>`;
    }
  }
];

// Mundo 2: en los textos, {pid}, {pidA}, {pidB} y {killed} vienen de setup() o de set (state.flags).
// Un paso puede tener check(comando, flags) para respuestas que dependen del comando, como kill con cualquier PID.
const protectedPids = {
  1: 'PID 1 es systemd, el primer proceso del sistema. Si se detiene, la nave se apaga. Operación cancelada.',
  812: 'PID 812 es soporte_vital. Produce el oxígeno de la tripulación. Operación cancelada.',
  903: 'PID 903 es navegacion. Sin él la nave pierde el rumbo. Operación cancelada.',
  1210: 'PID 1210 es bash, su propia terminal. Si lo detiene, se cierra su sesión. Operación cancelada.'
};
function killTarget(command) { return command.match(/^kill(?: -9| -15)? (\S+)$/)?.[1] ?? null; }
function killCheck(command) {
  if (command === 'kill') return { ok: false, message: 'Indique el número del proceso: kill <PID>.' };
  const target = killTarget(command);
  if (target === null) return undefined;
  if (!/^\d+$/.test(target)) return { ok: false, message: 'kill necesita el número PID, no el nombre del proceso. Consulte la lista con ps -e.' };
  if (protectedPids[target]) return { ok: false, message: protectedPids[target] };
  return { ok: false, message: `kill: (${target}) - No existe ese proceso. Verifique el PID con ps -e.` };
}
function randomPid() { return 2000 + Math.floor(Math.random() * 6000); }
const psStart = '  PID TTY      TIME     CMD\n    1 ?        00:00:02 systemd\n  812 ?        00:00:41 soporte_vital\n  903 ?        00:00:12 navegacion\n 1210 pts/0    00:00:00 bash\n';
const psEnd = ' 9412 pts/0    00:00:00 ps';
const lifeSupportKill = 'Negativo. soporte_vital produce el oxígeno de la tripulación. Detenerlo no es una opción. Reduzca su prioridad.';
const hullBlocks = 'La terminal quedaría ocupada durante toda la reparación y no podría corregir el rumbo. Agregue & al final: reparar-casco &.';
const fuelLog = '10:21:04.120  motor-izq  lee tanque: 50 L\n10:21:04.121  motor-der  lee tanque: 50 L\n10:21:04.300  motor-der  consume 10 L → escribe 40 L\n10:21:04.302  motor-izq  consume  5 L → escribe 45 L\nREGISTRO: 45 L · MEDICIÓN: 35 L';
const fuelLogFixed = '10:23:10.050  motor-izq  toma el semáforo · lee 50 L\n10:23:10.051  motor-der  espera el semáforo…\n10:23:10.250  motor-izq  consume  5 L → escribe 45 L · libera\n10:23:10.251  motor-der  toma el semáforo · lee 45 L\n10:23:10.450  motor-der  consume 10 L → escribe 35 L · libera\nREGISTRO: 35 L · MEDICIÓN: 35 L';
const robotsFile = 'robot-a   tiene: llave      espera: soldador\nrobot-b   tiene: soldador   espera: llave';
const motorBlocked = 'Fallo: reparación del motor principal incompleta. Los robots no han terminado.';
const robotTools = { 'robot-a': 'la llave', 'robot-b': 'el soldador' };
// kill en el jefe: un robot solo se detiene después de leer robots.txt, en el paso 3.
function robotCheck(step) {
  return (command, f) => {
    const target = killTarget(command);
    const robot = target === String(f.pidA) ? 'robot-a' : target === String(f.pidB) ? 'robot-b' : null;
    if (!robot) {
      if (step === 3 && f.killed && command === `systemctl start ${f.killed}`) return { ok: false, message: 'Sin semáforo, los robots pueden volver a bloquearse. Active primero semaforo-herramientas.' };
      return killCheck(command);
    }
    if (step < 2) return { ok: false, message: 'Antes de detener un robot, averigüe por qué no avanza. Su registro está en /nave/robots.txt.' };
    if (step > 2) return { ok: false, message: robot === f.killed ? `kill: (${target}) - No existe ese proceso.` : 'No es necesario. El abrazo mortal ya se rompió.' };
    const other = robot === 'robot-a' ? 'robot-b' : 'robot-a';
    return { ok: true, set: { killed: robot, other }, note: `Proceso ${target} terminado. ${robot} soltó ${robotTools[robot]}; ${other} la tomó y completó su parte de la reparación.` };
  };
}

function procRow(name, detail, status, cpu) {
  return `<div class="proc ${status}"><i class="led"></i><span class="proc-name">${name}</span><code>${detail}</code>${cpu === undefined ? '' : `<span class="gauge-bar"><i style="--fill:${cpu}%"></i></span>`}</div>`;
}
function unknownProcs(count, bars) {
  return Array.from({ length: count }, () => procRow('???', 'PID ???', 'idle', bars ? 0 : undefined)).join('');
}

const world2Levels = [
  {
    tag: 'Comunicaciones',
    setup: () => ({ pid: randomPid() }),
    steps: [
      { say: 'Interferencia en comunicaciones. La provoca un programa en ejecución. A un programa en ejecución se le llama proceso. Para ver todos los procesos de la nave: ps -e.',
        hint: 'Escriba ps -e.',
        answers: {
          'ps -e': `${psStart} {pid} ?        00:00:58 señal_fantasma\n${psEnd}`,
          'ps -A': `${psStart} {pid} ?        00:00:58 señal_fantasma\n${psEnd}`,
          'ps': { out: `  PID TTY      TIME     CMD\n 1210 pts/0    00:00:00 bash\n${psEnd}`, note: 'Sin -e solo veo los procesos de su terminal. Agregue -e para verlos todos.' }
        },
        check: killCheck },
      { say: 'Cada proceso tiene un número único: su PID. señal_fantasma no pertenece a ningún sistema de la nave. Para detener un proceso se usa kill seguido de su PID. Búsquelo en la lista.',
        hint: 'El PID de señal_fantasma es {pid}. Escriba kill {pid}.',
        answers: {
          'kill {pid}': { out: '', note: 'Proceso {pid} terminado.' },
          'kill -9 {pid}': { out: '', note: 'Proceso {pid} terminado a la fuerza. Sin -9, kill le pide al proceso que se cierre por sí mismo; es la forma recomendada.' }
        },
        check: killCheck },
      { say: 'Interferencia eliminada. Confirme con ps -e que el proceso ya no existe.',
        hint: 'Escriba ps -e.',
        answers: { 'ps -e': psStart + psEnd, 'ps -A': psStart + psEnd },
        check: killCheck }
    ],
    ending: 'Comunicaciones estables. Un programa es un archivo guardado; un proceso es ese programa en ejecución. Yo ejecuto muchos a la vez y los distingo por su PID. Siguiente procedimiento: revisión del procesador.',
    panel(v) {
      const s = v.step, gone = s >= 2;
      const bars = Array.from({ length: 5 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
      const rows = s >= 1
        ? procRow('systemd', 'PID 1', 'active') + procRow('soporte_vital', 'PID 812', 'active') + procRow('navegacion', 'PID 903', 'active') + procRow('señal_fantasma', gone ? 'Terminado' : `PID ${v.flags.pid}`, gone ? 'off' : 'fail')
        : unknownProcs(4);
      return `<div class="w2-stack">
        <div class="comms">${readout('Señal', gone ? 'Estable' : 'Interferencia', gone ? 'ok' : 'fail', gone ? 'Señal limpia' : 'Origen desconocido')}<span class="signal${gone ? ' clean' : ''}" aria-hidden="true">${bars}</span></div>
        <div class="proc-list">${rows}</div>
      </div>`;
    }
  },
  {
    tag: 'Procesador',
    steps: [
      { say: 'La navegación responde con lentitud. Algún proceso acapara el procesador. top muestra qué procesos lo usan más.',
        hint: 'Escriba top.',
        answers: { 'top': { out: 'top - 10:14:02 up 47 min,  load average: 3.92, 3.10, 2.20\n  PID USUARIO  NI  %CPU  %MEM  COMMAND\n  812 {user}    0  97.3   4.1  soporte_vital\n  903 {user}    0   1.8   2.0  navegacion\n    1 root      0   0.2   0.3  systemd', note: 'En una terminal real, top se actualiza cada segundo y se cierra con la tecla q.' } },
        errors: { 'kill 812': lifeSupportKill },
        check: killCheck },
      { say: 'soporte_vital usa 97 % del procesador y deja sin turno a la navegación. No puede detenerse: produce el oxígeno. Puede, en cambio, bajar su prioridad. La columna NI muestra el valor nice: va de -20 (más prioridad) a 19 (menos). Comando: renice 10 -p 812.',
        hint: 'Escriba renice 10 -p 812.',
        answers: {
          'renice 10 -p 812': '812 (process ID) old priority 0, new priority 10',
          'renice -n 10 -p 812': '812 (process ID) old priority 0, new priority 10',
          'renice +10 -p 812': '812 (process ID) old priority 0, new priority 10',
          'renice 10 812': { out: '812 (process ID) old priority 0, new priority 10', note: 'Correcto. Sin -p, renice también entiende que 812 es un PID.' }
        },
        errors: {
          'kill 812': lifeSupportKill,
          'renice -10 -p 812': 'Un valor negativo le daría más prioridad y el problema empeoraría. Use 10.',
          'renice 10 -p 903': 'PID 903 es navegacion, el proceso afectado. Bajarle la prioridad lo haría más lento. El que acapara es 812.',
          'renice 10': 'Indique a qué proceso: renice 10 -p 812.'
        },
        check: killCheck },
      { say: 'Prioridad ajustada. Verifique el nuevo reparto del procesador con top.',
        hint: 'Escriba top.',
        answers: { 'top': 'top - 10:15:30 up 48 min,  load average: 3.95, 3.30, 2.40\n  PID USUARIO  NI  %CPU  %MEM  COMMAND\n  812 {user}   10  58.4   4.1  soporte_vital\n  903 {user}    0  39.1   2.0  navegacion\n    1 root      0   0.2   0.3  systemd' },
        errors: { 'kill 812': lifeSupportKill },
        check: killCheck }
    ],
    ending: 'Navegación en tiempo normal. El planificador reparte el procesador en turnos muy cortos entre los procesos. Un valor nice alto hace que un proceso ceda turnos a los demás: soporte_vital sigue funcionando, pero ya no acapara. Siguiente procedimiento: reparación del casco.',
    panel(v) {
      const s = v.step, fixed = s >= 2;
      const rows = s >= 1
        ? procRow('soporte_vital', `PID 812 · NI ${fixed ? 10 : 0} · ${fixed ? '58' : '97'} %`, fixed ? 'active' : 'fail', fixed ? 58 : 97) + procRow('navegacion', `PID 903 · NI 0 · ${fixed ? '39' : '2'} %`, 'active', fixed ? 39 : 2) + procRow('systemd', 'PID 1 · NI 0 · 0 %', 'active', 0)
        : unknownProcs(3, true);
      return `<div class="w2-stack">
        <div class="readout-pair">${readout('Oxígeno', '21 %', 'ok', 'Estable')}${readout('Navegación', s >= 3 ? 'Normal' : 'Lenta', s >= 3 ? 'ok' : 'fail', s >= 3 ? 'Estable' : 'Sin turno')}</div>
        <div class="proc-list">${rows}</div>
      </div>`;
    }
  },
  {
    tag: 'Casco exterior',
    steps: [
      { say: 'Daño en el casco por micrometeoritos. La reparación tarda varios minutos y el rumbo también necesita corrección. Si ejecuta reparar-casco de la forma normal, la terminal queda ocupada hasta que termine. Con & al final, el comando corre en segundo plano y la terminal queda libre.',
        hint: 'Escriba reparar-casco & (con un espacio antes de &).',
        answers: { 'reparar-casco &': '[1] 2231', 'reparar-casco&': '[1] 2231' },
        errors: { 'reparar-casco': hullBlocks, 'ajustar-rumbo': 'Primero inicie la reparación del casco en segundo plano: reparar-casco &.' } },
      { say: 'Reparación en curso como trabajo [1], con PID 2231. La terminal sigue libre. Corrija el rumbo: ajustar-rumbo.',
        hint: 'Escriba ajustar-rumbo.',
        answers: { 'ajustar-rumbo': 'Corrigiendo rumbo… desvío 12° → 0°\nTrayectoria estable.' },
        errors: { 'reparar-casco &': 'La reparación ya está en curso como trabajo [1].', 'reparar-casco': 'La reparación ya está en curso como trabajo [1].' } },
      { say: 'Rumbo corregido mientras el casco seguía en reparación. Para ver los trabajos en segundo plano: jobs.',
        hint: 'Escriba jobs.',
        answers: { 'jobs': '[1]+  Ejecutando    reparar-casco &' } }
    ],
    ending: 'Reparación del casco completada: [1]+ Hecho. Dos tareas avanzaron al mismo tiempo; eso es concurrencia. Con un solo núcleo alterno entre ellas en turnos de milisegundos; con varios núcleos pueden correr en paralelo. Siguiente procedimiento: revisión del tanque de combustible.',
    panel(v) {
      const s = v.step, done = v.done;
      const hull = done ? 100 : [0, 35, 70][s];
      return `<div class="pad-grid">
        <div class="pad-scene small">${rocket(true)}</div>
        <div class="gauges">
          ${readout('Casco', done ? 'Reparado' : s >= 1 ? `Reparando · ${hull} %` : 'Dañado', done ? 'ok' : s >= 1 ? 'ok' : 'fail', done ? '[1] Hecho' : s >= 1 ? '[1] Segundo plano' : 'Micrometeoritos', hull)}
          ${readout('Rumbo', s >= 2 ? '0°' : '12°', s >= 2 ? 'ok' : 'fail', s >= 2 ? 'Trayectoria estable' : 'Desviado')}
          ${readout('Terminal', 'Libre', 'ok', s >= 1 ? 'Lista para otro comando' : 'Esperando comando')}
        </div>
      </div>`;
    }
  },
  {
    tag: 'Tanque de combustible',
    steps: [
      { say: 'Alerta: el registro de combustible no coincide con la medición del tanque. Dos motores consumen del mismo tanque al mismo tiempo. Revise el registro: cat /nave/combustible.log.',
        hint: 'Escriba cat /nave/combustible.log.',
        answers: { 'cat /nave/combustible.log': fuelLog },
        errors: { 'cat combustible.log': 'Ese archivo no está aquí. Se encuentra en /nave: cat /nave/combustible.log.' } },
      { say: 'Se consumieron 15 L de 50: deben quedar 35. Ambos motores leyeron 50 L antes de que el otro escribiera, y la última escritura borró la anterior. Es una condición de carrera. Leer y escribir el tanque es una sección crítica: solo un proceso a la vez debe ejecutarla. Un semáforo lo garantiza. Inicie semaforo-combustible.',
        hint: 'Escriba systemctl start semaforo-combustible.',
        answers: { 'systemctl start semaforo-combustible': 'semaforo-combustible.service: active (running)' },
        errors: {
          'systemctl stop motor-izq': 'Detener un motor no resuelve el problema: ambos deben funcionar. Sincronícelos con un semáforo.',
          'systemctl stop motor-der': 'Detener un motor no resuelve el problema: ambos deben funcionar. Sincronícelos con un semáforo.'
        } },
      { say: 'Semáforo activo. Repetí el consumo desde 50 L con los motores sincronizados. Revise el registro.',
        hint: 'Escriba cat /nave/combustible.log.',
        answers: { 'cat /nave/combustible.log': fuelLogFixed } }
    ],
    ending: 'Registro y medición coinciden: 35 L. Con el semáforo, un motor espera mientras el otro usa el tanque, y ningún consumo se pierde. Cuando varios procesos comparten un dato, la sección crítica debe protegerse. Siguiente procedimiento: reparación del motor principal.',
    panel(v) {
      const s = v.step, sem = s >= 2, fixed = s >= 3;
      return `<div class="tank-grid">
        <div class="tank-side">
          <span class="mini-module active"><i class="led"></i>Motor izq.</span>
          ${readout('Registro', s >= 1 ? (fixed ? '35 L' : '45 L') : '???', s >= 1 ? (fixed ? 'ok' : 'fail') : 'pending', s >= 1 ? (fixed ? 'Coincide' : 'No coincide') : 'Pendiente')}
        </div>
        <div class="tank-center">
          <div class="tank"><i style="--fill:70%"></i><small>35 L</small></div>
          <span class="lamp${sem ? ' on' : ''}"><i></i>Semáforo</span>
        </div>
        <div class="tank-side">
          <span class="mini-module active"><i class="led"></i>Motor der.</span>
          ${readout('Medición', '35 L', 'ok', 'Sensor')}
        </div>
      </div>
      <p class="panel-foot">Sección crítica <code>leer → consumir → escribir</code></p>`;
    }
  },
  {
    tag: 'Taller de robots',
    boss: true,
    setup: () => { const pidA = randomPid(); return { pidA, pidB: pidA + 1 + Math.floor(Math.random() * 400) }; },
    steps: [
      { say: 'Motor principal detenido. Su reparación está asignada a dos robots, pero no hay avance. Usted ya sabe cómo ver lo que está en ejecución.',
        hint: 'Liste los procesos: ps -e.',
        answers: { 'ps -e': `${psStart} {pidA} ?        00:03:12 robot-a\n {pidB} ?        00:03:12 robot-b\n${psEnd}`, 'ps -A': `${psStart} {pidA} ?        00:03:12 robot-a\n {pidB} ?        00:03:12 robot-b\n${psEnd}` },
        errors: { 'systemctl start motor-principal': motorBlocked },
        check: robotCheck(0) },
      { say: 'Ambos robots están en ejecución, pero ninguno avanza. Su registro de herramientas está en /nave/robots.txt.',
        hint: 'Lea el archivo: cat /nave/robots.txt.',
        answers: { 'cat /nave/robots.txt': robotsFile },
        errors: { 'systemctl start motor-principal': motorBlocked },
        check: robotCheck(1) },
      { say: 'Cada robot retiene una herramienta y espera la del otro. Ninguno la soltará: es un abrazo mortal. Rompa el ciclo.',
        hint: 'Detenga uno de los robots con kill y su PID, por ejemplo kill {pidB}.',
        answers: {},
        errors: { 'systemctl start motor-principal': motorBlocked },
        check: robotCheck(2) },
      { say: 'Ciclo roto. Si reinicia ahora el robot detenido, el abrazo mortal puede repetirse. Primero imponga orden en el uso de las herramientas.',
        hint: 'Active el semáforo de herramientas: systemctl start semaforo-herramientas.',
        answers: { 'systemctl start semaforo-herramientas': 'semaforo-herramientas.service: active (running)' },
        errors: { 'systemctl start motor-principal': motorBlocked },
        check: robotCheck(3) },
      { say: 'Semáforo activo: cada robot deberá tomar las dos herramientas a la vez o ninguna. Reinicie el robot que detuvo.',
        hint: 'Escriba systemctl start {killed}.',
        answers: { 'systemctl start {killed}': '{killed}.service: active (running)\nReparación del motor principal: completada.' },
        errors: { 'systemctl start motor-principal': motorBlocked },
        check: robotCheck(4) },
      { say: 'Ambos robots en línea. Encienda el motor principal.',
        hint: 'Escriba systemctl start motor-principal.',
        answers: { 'systemctl start motor-principal': { anim: 'engine' } },
        check: robotCheck(5) }
    ],
    ending: 'Motor principal en línea. Un abrazo mortal ocurre cuando cada proceso retiene un recurso y espera otro que nadie soltará. Usted rompió el ciclo al quitarle su herramienta a un robot, y el semáforo impide que vuelva a formarse: ningún robot retiene una herramienta mientras espera otra. Próximo destino: estación espacial.',
    panel(v) {
      const s = v.step, f = v.flags;
      const robot = (id, label, pid, has, wants) => {
        const killed = f.killed === id;
        const status = s < 1 ? 'idle' : s < 3 ? 'fail' : killed && s < 5 ? 'off' : 'active';
        const state = s < 1 ? 'Sin datos' : s < 2 ? 'Sin avance' : s < 3 ? `Tiene: ${has}<br>Espera: ${wants}` : killed ? (s < 5 ? 'Detenido' : 'En línea') : 'Parte completada';
        return `<div class="module robot ${status}"><span class="module-head"><i class="led"></i>${label}</span><code>PID ${s >= 1 ? pid : '???'}</code><span class="module-state">${state}</span></div>`;
      };
      return `<div class="deadlock">
        ${robot('robot-a', 'Robot A', f.pidA, 'llave', 'soldador')}
        <span class="cycle${s >= 2 && s < 3 ? ' locked' : ''}" aria-hidden="true">⇄</span>
        ${robot('robot-b', 'Robot B', f.pidB, 'soldador', 'llave')}
      </div>
      <div class="boss-row">
        <span class="mini-module ${s >= 4 ? 'active' : ''}"><i class="led"></i>Semáforo</span>
        <div class="readout ${f.thrust ? 'ok' : 'pending'}"><span class="readout-label">Motor principal</span><span class="gauge-bar"><i style="--fill:${f.thrust || 0}%"></i></span><span class="readout-state">${f.thrust ? `Empuje ${f.thrust} %` : 'Detenido'}</span></div>
      </div>`;
    }
  }
];

// Mundo 3: la carpeta actual vive en state.flags.cwd (la muestra la cabecera de la terminal).
// Una respuesta puede traer message: se muestra como error aunque el paso avance (por ejemplo, Permiso denegado).
const sudoCheck = command => /^sudo\b/.test(command) ? { ok: false, message: 'sudo todavía no está disponible para usted. Lo obtendrá al llegar a Root.' } : undefined;
// Combina varias revisiones: la primera que responde gana.
function checks(...fns) { return (command, f) => { for (const fn of fns) { const r = fn(command, f); if (r) return r; } }; }
// Muestra una salida sin avanzar ni marcar error, para comandos cuya salida cambia en este paso.
const showIn = (cmd, out) => command => command === cmd ? { ok: false, extra: true, out } : undefined;
const lsIn = out => showIn('ls', out);
const cdUp = 'cd .. sube una carpeta. Desde aquí lo llevaría a otra ubicación. El código está en acceso: cd acceso.';
const freeFull = '        total   usado   libre\nMem:    8.0Gi   7.8Gi   0.2Gi\nSwap:   4.0Gi   3.1Gi   0.9Gi';
const freeKb = 'Valores en kilobytes. Con -h se muestran en formato legible.';
const dfFull = 'Disco       Tamaño  Usado  Libre  Uso%  Montado en\n/dev/sda1     96G    94G     2G   98%  /';
const lsRegistros = 'total 42G\n-rw-r--r--  1 {user} {user}   41G  registro_2019.log\n-rw-r--r--  1 {user} {user}  1.2G  registro_2026.log';
const keepCurrentLog = 'Negativo. registro_2026.log es el registro actual de la estación y no tiene respaldo. El antiguo es el de 2019.';
const deniedDoor = 'bash: ./abrir-compuerta: Permiso denegado';
const lsDoor = '-rw-r--r--  1 {user} {user}  2.1K  abrir-compuerta\n-rw-r--r--  1 {user} {user}    38  codigo.txt';
const deniedCore = 'bash: ./reiniciar-nucleo: Permiso denegado';
const lsBackup = 'total 40G\n-rw-r--r--  1 {user} {user}   38G  respaldo_2020.log\n-rw-r--r--  1 {user} {user}  1.3G  registro_2026.log';
// Jefe: ./reiniciar-nucleo explica cuál falla lo sigue bloqueando.
function coreCheck(step) {
  return command => {
    if (command !== './reiniciar-nucleo' || step >= 7) return undefined;
    if (step < 3) return { ok: false, message: 'Reinicio fallido: memoria insuficiente.' };
    if (step < 6) return { ok: false, message: 'Reinicio fallido: no hay espacio en disco para guardar el registro.' };
    return { ok: false, message: 'bash: ./reiniciar-nucleo: No existe el archivo. El programa está en /estacion/energia.' };
  };
}

function treeNode(name, depth, status) {
  return `<div class="tree-node ${status}" style="--d:${depth}"><span>${name}</span>${status === 'here' ? '<b>Aquí</b>' : ''}</div>`;
}

const world3Levels = [
  {
    tag: 'Sistema de archivos',
    steps: [
      { say: 'Acoplamiento completado. La estación guarda su información en archivos, organizados en carpetas dentro de carpetas, todas a partir de la raíz: /. Para saber en qué carpeta se encuentra: pwd.',
        hint: 'Escriba pwd.',
        answers: { 'pwd': '/home/{user}' },
        check: sudoCheck },
      { say: 'Usted está en su carpeta personal. Para entrar a otra carpeta se usa cd seguido de su ruta. Entre a la estación: cd /estacion.',
        hint: 'Escriba cd /estacion.',
        answers: { 'cd /estacion': { out: '', set: { cwd: '/estacion' } } },
        errors: { 'cd estacion': 'Desde su carpeta personal no existe estacion. La ruta completa empieza con /: cd /estacion.', 'cd': 'Indique a qué carpeta: cd /estacion.' },
        check: checks(sudoCheck, lsIn('Documentos  Descargas')) },
      { say: 'Ahora se encuentra en /estacion. Vea qué contiene.',
        hint: 'Escriba ls.',
        answers: { 'ls': 'acceso  energia  registros', 'ls /estacion': 'acceso  energia  registros' },
        check: sudoCheck },
      { say: 'El código de acoplamiento está en la carpeta acceso. Entre.',
        hint: 'Escriba cd acceso.',
        answers: { 'cd acceso': { out: '', set: { cwd: '/estacion/acceso' } }, 'cd /estacion/acceso': { out: '', set: { cwd: '/estacion/acceso' } } },
        errors: { 'cd ..': cdUp, 'cd energia': 'El código está en acceso, no en energia.', 'cd registros': 'El código está en acceso, no en registros.' },
        check: sudoCheck },
      { say: 'Lea el código: está en el archivo codigo.txt.',
        hint: 'Escriba cat codigo.txt.',
        answers: { 'cat codigo.txt': 'CÓDIGO DE ACCESO: ESTACION-7741', 'cat /estacion/acceso/codigo.txt': 'CÓDIGO DE ACCESO: ESTACION-7741' },
        check: checks(sudoCheck, lsIn('abrir-compuerta  codigo.txt')) }
    ],
    ending: 'Acceso concedido. Un sistema de archivos organiza la información en un árbol que empieza en la raíz /. Una ruta es el camino desde la raíz hasta un archivo: /estacion/acceso/codigo.txt. Siguiente procedimiento: revisión de la memoria.',
    panel(v) {
      const s = v.step, cwd = v.flags.cwd || `/home/${v.user}`;
      const node = (name, depth, path) => treeNode(name, depth, s >= 1 && cwd === path ? 'here' : 'known');
      const hidden = Array.from({ length: 3 }, () => treeNode('???', 2, 'unknown')).join('');
      return `<div class="fs-grid">
        <div class="tree">
          ${node('/', 0, '/')}${node(`home/${safe(v.user)}`, 1, `/home/${v.user}`)}${node('estacion', 1, '/estacion')}
          ${s >= 3 ? node('acceso', 2, '/estacion/acceso') + treeNode('energia', 2, 'known') + treeNode('registros', 2, 'known') : hidden}
          ${s >= 4 ? treeNode('codigo.txt', 3, v.done ? 'open' : 'file') : ''}
        </div>
        <div class="gauges">
          ${readout('Ruta actual', s >= 1 ? safe(cwd).replace(/\/(?=.)/g, '/<wbr>') : '???', s >= 1 ? 'ok' : 'pending', s >= 1 ? 'Verificada' : 'Pendiente')}
          ${readout('Compuerta', v.done ? 'Abierta' : 'Cerrada', v.done ? 'ok' : 'fail', v.done ? 'ESTACION-7741' : 'Sin código')}
        </div>
      </div>`;
    }
  },
  {
    tag: 'Memoria de la estación',
    setup: () => ({ pid: randomPid() }),
    steps: [
      { say: 'Los sistemas de la estación responden con lentitud. Revise la memoria con free -h.',
        hint: 'Escriba free -h.',
        answers: { 'free -h': freeFull, 'free': { out: '        total     usado     libre\nMem:  8048432   7864120    184312\nSwap: 4194300   3250176    944124', note: freeKb } },
        check: checks(sudoCheck, killCheck) },
      { say: 'La RAM está casi llena. Cuando eso pasa, uso el swap: una parte del disco que funciona como memoria de respaldo. Es mucho más lento que la RAM. Averigüe qué proceso la consume: top.',
        hint: 'Escriba top.',
        answers: { 'top': { out: 'top - 11:02:40 up 2:13,  load average: 2.10, 1.90, 1.60\n  PID USUARIO  %CPU  %MEM  COMMAND\n {pid} {user}    6.2  71.4  fuga_memoria\n  812 {user}    9.8   4.1  soporte_vital\n  903 {user}    3.1   2.0  navegacion', note: 'Esta vez observe la columna %MEM: cuánta memoria usa cada proceso.' } },
        check: checks(sudoCheck, killCheck) },
      { say: 'fuga_memoria pide memoria y nunca la libera. Deténgalo con kill y su PID.',
        hint: 'El PID de fuga_memoria es {pid}. Escriba kill {pid}.',
        answers: { 'kill {pid}': { out: '', note: 'Proceso {pid} terminado. Memoria liberada.' }, 'kill -9 {pid}': { out: '', note: 'Proceso {pid} terminado a la fuerza. Memoria liberada.' } },
        check: checks(sudoCheck, killCheck) },
      { say: 'Verifique la memoria.',
        hint: 'Escriba free -h.',
        answers: { 'free -h': '        total   usado   libre\nMem:    8.0Gi   2.3Gi   5.7Gi\nSwap:   4.0Gi   0.2Gi   3.8Gi', 'free': { out: '        total     usado     libre\nMem:  8048432   2411724   5636708\nSwap: 4194300    209715   3984585', note: freeKb } },
        check: checks(sudoCheck, killCheck) }
    ],
    ending: 'Memoria estable. La RAM es rápida pero limitada; la memoria virtual amplía el espacio usando el disco, a costa de velocidad. Una fuga de memoria es un proceso que reserva memoria y no la devuelve. Siguiente procedimiento: revisión del almacén.',
    panel(v) {
      const s = v.step, fixed = s >= 4;
      const rows = s >= 2
        ? procRow('fuga_memoria', s >= 3 ? 'Terminado' : `PID ${v.flags.pid} · 71 %`, s >= 3 ? 'off' : 'fail', s >= 3 ? undefined : 71) + procRow('soporte_vital', 'PID 812 · 4 %', 'active', 4) + procRow('navegacion', 'PID 903 · 2 %', 'active', 2)
        : unknownProcs(3, true);
      return `<div class="w2-stack">
        <div class="readout-pair">
          ${readout('RAM · rápida', s >= 1 ? (fixed ? '2.3 / 8.0 GiB' : '7.8 / 8.0 GiB') : '???', s >= 1 ? (fixed ? 'ok' : 'fail') : 'pending', s >= 1 ? (fixed ? '29 % · Estable' : '97 % · Casi llena') : 'Pendiente', s >= 1 ? (fixed ? 29 : 97) : 0)}
          ${readout('Swap · lenta', s >= 1 ? (fixed ? '0.2 / 4.0 GiB' : '3.1 / 4.0 GiB') : '???', s >= 1 ? 'ok' : 'pending', s >= 1 ? (fixed ? '5 % · En reposo' : '77 % · En uso') : 'Pendiente', s >= 1 ? (fixed ? 5 : 77) : 0)}
        </div>
        <div class="proc-list">${rows}</div>
      </div>`;
    }
  },
  {
    tag: 'Almacenamiento',
    steps: [
      { say: 'No es posible guardar los datos del acoplamiento. Revise el espacio en disco: df -h.',
        hint: 'Escriba df -h.',
        answers: { 'df -h': dfFull, 'df': { out: 'Disco       Bloques    Usados  Disponibles  Uso%  Montado en\n/dev/sda1  100663296  98566144    2097152    98%  /', note: 'Valores en bloques de 1 KB. Con -h se muestran en formato legible.' } },
        check: sudoCheck },
      { say: 'Disco casi lleno. Los registros de la estación ocupan mucho espacio. Vea sus tamaños: ls -lh /estacion/registros. Con -l veo los detalles de cada archivo y con -h los tamaños en formato legible.',
        hint: 'Escriba ls -lh /estacion/registros.',
        answers: { 'ls -lh /estacion/registros': lsRegistros, 'ls -l /estacion/registros': { out: 'total 44040192\n-rw-r--r--  1 {user} {user}  44023414784  registro_2019.log\n-rw-r--r--  1 {user} {user}   1288490188  registro_2026.log', note: 'Tamaños en bytes. Con -h se leen mejor.' } },
        errors: { 'ls /estacion/registros': 'Así solo veo los nombres. Agregue -lh para ver los tamaños: ls -lh /estacion/registros.' },
        check: sudoCheck },
      { say: 'El registro de 2019 es antiguo y ya fue respaldado en la Tierra. Bórrelo con rm y su ruta. Lo que se borra con rm no va a una papelera: desaparece.',
        hint: 'Escriba rm /estacion/registros/registro_2019.log.',
        answers: { 'rm /estacion/registros/registro_2019.log': '' },
        errors: {
          'rm /estacion/registros/registro_2026.log': keepCurrentLog,
          'rm registro_2019.log': 'Ese archivo no está en su carpeta actual. Use la ruta completa: rm /estacion/registros/registro_2019.log.',
          'rm -r /estacion/registros': 'Eso borraría la carpeta completa, incluido el registro actual. Borre solo el archivo de 2019.',
          'rm': 'Indique qué archivo borrar.'
        },
        check: sudoCheck },
      { say: 'Archivo eliminado. Verifique el espacio.',
        hint: 'Escriba df -h.',
        answers: { 'df -h': 'Disco       Tamaño  Usado  Libre  Uso%  Montado en\n/dev/sda1     96G    53G    43G   55%  /' },
        errors: { 'rm /estacion/registros/registro_2026.log': keepCurrentLog },
        check: sudoCheck }
    ],
    ending: 'Datos del acoplamiento guardados. La memoria se borra al apagar; el almacenamiento conserva la información. Por eso el disco también se administra: cuando se llena, nada nuevo se puede guardar. Siguiente procedimiento: compuerta interior.',
    panel(v) {
      const s = v.step, freed = s >= 3, pct = s >= 4 ? 55 : 98;
      const files = s >= 2
        ? procRow('registro_2019.log', freed ? 'Borrado' : '41G', freed ? 'off' : 'fail', freed ? undefined : 100) + procRow('registro_2026.log', '1.2G', 'active', 3)
        : unknownProcs(2, true);
      return `<div class="disk-grid">
        <div class="disk-ring ${s >= 1 ? (pct > 90 ? 'fail' : 'ok') : 'idle'}" style="--pct:${s >= 1 ? pct : 0}%"><strong>${s >= 1 ? `${pct} %` : '???'}</strong><small>/dev/sda1</small></div>
        <div class="w2-stack">
          <span class="readout-label">/estacion/registros</span>
          <div class="proc-list">${files}</div>
          <p class="disk-note${v.done ? ' ok' : ''}">${v.done ? 'Datos del acoplamiento guardados' : 'Datos del acoplamiento: sin espacio'}</p>
        </div>
      </div>`;
    }
  },
  {
    tag: 'Compuerta interior',
    steps: [
      { say: 'La compuerta interior se abre con el programa abrir-compuerta, que está en /estacion/acceso. Entre a esa carpeta.',
        hint: 'Escriba cd /estacion/acceso.',
        answers: { 'cd /estacion/acceso': { out: '', set: { cwd: '/estacion/acceso' } } },
        errors: { 'cd acceso': 'Desde su carpeta personal no existe acceso. Use la ruta completa: cd /estacion/acceso.' },
        check: sudoCheck },
      { say: 'Para ejecutar un programa de la carpeta actual se escribe ./ antes de su nombre. Ejecútelo: ./abrir-compuerta.',
        hint: 'Escriba ./abrir-compuerta.',
        answers: { './abrir-compuerta': { message: deniedDoor } },
        errors: { 'abrir-compuerta': 'Para ejecutar un programa de la carpeta actual se escribe ./ antes del nombre: ./abrir-compuerta.', 'chmod +x abrir-compuerta': 'Primero ejecútelo para ver qué ocurre: ./abrir-compuerta.' },
        check: checks(sudoCheck, lsIn('abrir-compuerta  codigo.txt')) },
      { say: 'Permiso denegado. Cada archivo indica qué se puede hacer con él. Revise los permisos: ls -l.',
        hint: 'Escriba ls -l.',
        answers: { 'ls -l': lsDoor, 'ls -l abrir-compuerta': '-rw-r--r--  1 {user} {user}  2.1K  abrir-compuerta' },
        check: checks(sudoCheck, lsIn('abrir-compuerta  codigo.txt')) },
      { say: 'Las letras rw-r--r-- son los permisos: r es leer, w es escribir y x es ejecutar. El primer grupo es el suyo y no tiene x. Agréguela: chmod +x abrir-compuerta.',
        hint: 'Escriba chmod +x abrir-compuerta.',
        answers: { 'chmod +x abrir-compuerta': '', 'chmod u+x abrir-compuerta': { out: '', note: 'Correcto. u+x agrega la x solo para usted, el dueño.' } },
        errors: { 'chmod 777 abrir-compuerta': 'Eso daría a cualquiera permiso de modificarlo. Solo hace falta agregar x: chmod +x abrir-compuerta.', 'chmod +x': 'Indique el archivo: chmod +x abrir-compuerta.' },
        check: checks(sudoCheck, lsIn('abrir-compuerta  codigo.txt')) },
      { say: 'Permiso agregado. Ejecute el programa de nuevo.',
        hint: 'Escriba ./abrir-compuerta.',
        answers: { './abrir-compuerta': 'Abriendo compuerta interior…\nCompuerta interior: abierta.' },
        check: checks(sudoCheck, lsIn('abrir-compuerta  codigo.txt'), showIn('ls -l', '-rwxr-xr-x  1 {user} {user}  2.1K  abrir-compuerta\n-rw-r--r--  1 {user} {user}    38  codigo.txt')) }
    ],
    ending: 'Compuerta abierta. Cada archivo indica quién puede leerlo, modificarlo o ejecutarlo. Así el sistema de archivos protege la información y evita que se ejecuten programas por error. Siguiente procedimiento: núcleo de energía.',
    panel(v) {
      const s = v.step, exec = s >= 4;
      const group = (who, perm, mine) => `<div class="perm${mine ? ' mine' : ''}"><small>${who}</small><code>${perm}</code></div>`;
      const owner = s < 3 ? '???' : exec ? 'rwx' : 'rw<i>-</i>';
      return `<div class="door-grid">
        <div class="door ${v.done ? 'open' : s >= 2 ? 'fail' : 'idle'}"><i></i><i></i><span>${v.done ? 'Abierta' : 'Sellada'}</span></div>
        <div class="w2-stack">
          <span class="readout-label">Permisos · abrir-compuerta</span>
          <div class="perms">${group('Dueño', owner, true)}${group('Grupo', s < 3 ? '???' : exec ? 'r-x' : 'r--')}${group('Otros', s < 3 ? '???' : exec ? 'r-x' : 'r--')}</div>
          <p class="perm-legend"><b>r</b> leer · <b>w</b> escribir · <b>x</b> ejecutar</p>
          ${readout('Ejecución', v.done ? 'Completada' : exec ? 'Permitida' : s >= 2 ? 'Denegada' : 'Sin probar', exec ? 'ok' : s >= 2 ? 'fail' : 'pending', exec ? 'Tiene x' : s >= 3 ? 'Falta x' : 'Pendiente')}
        </div>
      </div>`;
    }
  },
  {
    tag: 'Núcleo de energía',
    boss: true,
    setup: () => ({ pid: randomPid() }),
    steps: [
      { say: 'Alerta: el núcleo de energía de la estación se apaga y el reinicio está fallando. Hay varias causas. Empiece por la memoria.',
        hint: 'Revise la memoria: free -h.',
        answers: { 'free -h': '        total   usado   libre\nMem:    8.0Gi   7.9Gi   0.1Gi\nSwap:   4.0Gi   3.6Gi   0.4Gi' },
        check: checks(sudoCheck, coreCheck(0), killCheck) },
      { say: 'Memoria casi agotada. Encuentre el proceso que la consume.',
        hint: 'Use top y observe la columna %MEM.',
        answers: { 'top': '  PID USUARIO  %CPU  %MEM  COMMAND\n {pid} {user}    7.4  74.2  fuga_nucleo\n  812 {user}    9.8   4.1  soporte_vital\n  903 {user}    3.1   2.0  navegacion' },
        check: checks(sudoCheck, coreCheck(1), killCheck) },
      { say: 'Resuélvalo.',
        hint: 'Detenga fuga_nucleo: kill {pid}.',
        answers: { 'kill {pid}': { out: '', note: 'Proceso {pid} terminado. Memoria liberada.' }, 'kill -9 {pid}': { out: '', note: 'Proceso {pid} terminado. Memoria liberada.' } },
        check: checks(sudoCheck, coreCheck(2), killCheck) },
      { say: 'Primera falla resuelta. El reinicio también necesita guardar un registro. Revise el disco.',
        hint: 'Revise el espacio: df -h.',
        answers: { 'df -h': 'Disco       Tamaño  Usado  Libre  Uso%  Montado en\n/dev/sda1     96G    95G     1G   99%  /' },
        check: checks(sudoCheck, coreCheck(3), killCheck) },
      { say: 'Disco lleno. Los registros están en /estacion/registros. Vea qué ocupa espacio.',
        hint: 'Vea los tamaños: ls -lh /estacion/registros.',
        answers: { 'ls -lh /estacion/registros': lsBackup },
        check: checks(sudoCheck, coreCheck(4), killCheck) },
      { say: 'El respaldo de 2020 ya existe también en la Tierra. Libere espacio.',
        hint: 'Bórrelo: rm /estacion/registros/respaldo_2020.log.',
        answers: { 'rm /estacion/registros/respaldo_2020.log': '' },
        errors: { 'rm /estacion/registros/registro_2026.log': keepCurrentLog.replace('El antiguo es el de 2019.', 'El que puede borrarse es el respaldo de 2020.') },
        check: checks(sudoCheck, coreCheck(5), killCheck) },
      { say: 'Segunda falla resuelta. El programa de reinicio está en /estacion/energia.',
        hint: 'Entre a la carpeta: cd /estacion/energia.',
        answers: { 'cd /estacion/energia': { out: '', set: { cwd: '/estacion/energia' } } },
        check: checks(sudoCheck, coreCheck(6), killCheck) },
      { say: 'Ejecute el programa de reinicio.',
        hint: 'Escriba ./reiniciar-nucleo.',
        answers: { './reiniciar-nucleo': { message: deniedCore } },
        check: checks(sudoCheck, lsIn('reiniciar-nucleo'), killCheck) },
      { say: 'Tercera falla. Usted ya sabe qué le falta a este archivo.',
        hint: 'Le falta el permiso de ejecución: chmod +x reiniciar-nucleo.',
        answers: { 'chmod +x reiniciar-nucleo': '', 'chmod u+x reiniciar-nucleo': '' },
        check: checks(sudoCheck, lsIn('reiniciar-nucleo'), showIn('ls -l', '-rw-r--r--  1 {user} {user}  3.4K  reiniciar-nucleo'), killCheck) },
      { say: 'Las tres fallas están resueltas. Reinicie el núcleo.',
        hint: 'Escriba ./reiniciar-nucleo.',
        answers: { './reiniciar-nucleo': { anim: 'core' } },
        check: checks(sudoCheck, lsIn('reiniciar-nucleo'), killCheck) }
    ],
    ending: 'Núcleo de energía en línea. Memoria, almacenamiento y permisos: cuando uno falla, la estación entera se detiene. Administrarlos es lo que mantiene a un sistema rápido, estable y protegido. Próximo destino: Root.',
    panel(v) {
      const s = v.step, core = v.flags.core || 0;
      const fault = (n, name, solvedAt, seenAt, detail) => {
        const status = s >= solvedAt ? 'active' : s >= seenAt ? 'fail' : 'idle';
        return procRow(`${n} · ${name}`, status === 'active' ? 'Resuelta' : status === 'fail' ? detail : 'Sin revisar', status);
      };
      return `<div class="core-grid">
        <div class="core${core ? ' on' : ''}" style="--power:${core / 100}"><i></i><strong>${core} %</strong></div>
        <div class="w2-stack">
          <span class="readout-label">Fallas del reinicio</span>
          <div class="proc-list">
            ${fault(1, 'Memoria', 3, 1, 'RAM 98 %')}
            ${fault(2, 'Disco', 6, 4, 'Disco 99 %')}
            ${fault(3, 'Permisos', 9, 8, 'Sin x')}
          </div>
          <p class="disk-note${core ? ' ok' : ''}">${core ? 'Reinicio en curso' : 'Reinicio del núcleo bloqueado'}</p>
        </div>
      </div>`;
    }
  }
];

// Bitácora: un comando se registra al completar el paso donde se enseña.
const glossary = [
  { cmd: 'whoami', level: 1, step: 0, text: 'Dice quién eres en la computadora.', example: 'whoami' },
  { cmd: 'cat', level: 1, step: 1, text: 'Muestra lo que contiene un archivo.', example: 'cat /etc/os-release' },
  { cmd: 'uname -r', level: 1, step: 2, text: 'Muestra la versión del kernel, el corazón del sistema.', example: 'uname -r' },
  { cmd: 'lscpu', level: 2, step: 0, text: 'Muestra información del procesador.', example: 'lscpu' },
  { cmd: 'free -h', level: 2, step: 1, text: 'Muestra cuánta memoria hay y cuánta se usa. La -h la muestra en GB.', example: 'free -h' },
  { cmd: 'lsblk', level: 2, step: 2, text: 'Muestra los discos de almacenamiento.', example: 'lsblk' },
  { cmd: 'systemctl --failed', level: 3, step: 0, text: 'Muestra los servicios que fallaron.', example: 'systemctl --failed' },
  { cmd: 'systemctl status', level: 3, step: 1, text: 'Muestra cómo está un servicio y por qué falló.', example: 'systemctl status propulsores' },
  { cmd: 'systemctl start', level: 3, step: 2, text: 'Enciende un servicio.', example: 'systemctl start combustible' },
  { cmd: 'uptime', level: 4, step: 0, text: 'Dice cuánto tiempo lleva encendida y qué tan ocupada está.', example: 'uptime' },
  { cmd: 'nproc', level: 4, step: 1, text: 'Dice cuántos núcleos tiene el procesador.', example: 'nproc' },
  { cmd: 'ls', level: 4, step: 2, text: 'Muestra lo que hay dentro de una carpeta.', example: 'ls /sistemas/navegacion' },
  { cmd: 'systemctl reboot', level: 5, step: 0, text: 'Reinicia la computadora.', example: 'systemctl reboot' },
  { cmd: 'ps -e', level: 6, step: 0, text: 'Muestra todos los procesos (programas en ejecución) con su número PID.', example: 'ps -e' },
  { cmd: 'kill', level: 6, step: 1, text: 'Detiene un proceso usando su número PID.', example: 'kill 4821' },
  { cmd: 'top', level: 7, step: 0, text: 'Muestra qué procesos usan más el procesador, en tiempo real.', example: 'top' },
  { cmd: 'renice', level: 7, step: 1, text: 'Cambia la prioridad de un proceso. Un número más alto le da menos turnos de procesador.', example: 'renice 10 -p 812' },
  { cmd: '&', level: 8, step: 0, text: 'Al final de un comando, lo ejecuta en segundo plano y deja libre la terminal.', example: 'reparar-casco &' },
  { cmd: 'jobs', level: 8, step: 2, text: 'Muestra los trabajos que corren en segundo plano.', example: 'jobs' },
  { cmd: 'pwd', level: 11, step: 0, text: 'Dice en qué carpeta se encuentra.', example: 'pwd' },
  { cmd: 'cd', level: 11, step: 1, text: 'Entra a otra carpeta. cd .. sube una carpeta.', example: 'cd /estacion' },
  { cmd: 'df -h', level: 13, step: 0, text: 'Muestra cuánto espacio queda en el disco.', example: 'df -h' },
  { cmd: 'ls -lh', level: 13, step: 1, text: 'Muestra los archivos con sus detalles y su tamaño.', example: 'ls -lh /estacion/registros' },
  { cmd: 'rm', level: 13, step: 2, text: 'Borra un archivo. No hay papelera: desaparece.', example: 'rm /estacion/registros/registro_2019.log' },
  { cmd: './', level: 14, step: 1, text: 'Ejecuta un programa que está en la carpeta actual.', example: './abrir-compuerta' },
  { cmd: 'ls -l', level: 14, step: 2, text: 'Muestra los permisos de los archivos: r leer, w escribir, x ejecutar.', example: 'ls -l' },
  { cmd: 'chmod +x', level: 14, step: 3, text: 'Da permiso de ejecución a un archivo.', example: 'chmod +x abrir-compuerta' }
];
