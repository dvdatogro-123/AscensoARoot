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
  { cmd: 'systemctl reboot', level: 5, step: 0, text: 'Reinicia la computadora.', example: 'systemctl reboot' }
];
