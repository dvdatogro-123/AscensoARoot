/* Ascenso a Root: ejercicios locales. Nunca ejecuta comandos del teléfono. */
const missions = [
  {
    id: 1, title: 'Bienvenida a la terminal', commands: 'pwd', icon: '›',
    objective: 'Descubre en qué carpeta estás.',
    lesson: 'En Ubuntu, la terminal permite escribir órdenes. pwd muestra la ruta de la carpeta actual.',
    steps: [{ command: 'pwd', instruction: 'Muestra la carpeta en la que estás.', hint: 'Escribe pwd y pulsa «Ejecutar».', output: '/home/explorador' }],
    ending: 'pwd significa «print working directory»: muestra tu ubicación actual.'
  },
  {
    id: 2, title: 'Navegar directorios', commands: 'ls · cd', icon: '⌖',
    objective: 'Consulta el contenido de tu carpeta y entra en Documentos.',
    lesson: 'ls muestra archivos y carpetas. cd cambia de directorio.',
    steps: [
      { command: 'ls', instruction: 'Consulta las carpetas disponibles.', hint: 'Escribe ls y pulsa «Ejecutar».', output: 'Documentos  Descargas  Imágenes' },
      { command: 'cd Documentos', instruction: 'Entra en la carpeta Documentos.', hint: 'Escribe cd Documentos, con un espacio y D mayúscula.', output: 'Ahora estás en /home/explorador/Documentos' }
    ],
    ending: 'Ahora sabes listar el contenido de una carpeta y moverte entre directorios.'
  },
  {
    id: 3, title: 'Crear archivos y carpetas', commands: 'mkdir · touch', icon: '+',
    objective: 'Primero crea la carpeta proyectos; después, crea el archivo notas.txt.',
    lesson: 'mkdir crea carpetas. touch crea un archivo vacío si todavía no existe.',
    steps: [
      { command: 'mkdir proyectos', instruction: 'Crea una carpeta llamada proyectos.', hint: 'Escribe mkdir proyectos y pulsa «Ejecutar».', output: 'Carpeta proyectos creada.' },
      { command: 'touch notas.txt', instruction: 'Crea un archivo vacío llamado notas.txt.', hint: 'Escribe touch notas.txt y pulsa «Ejecutar».', output: 'Archivo notas.txt creado.' }
    ],
    ending: 'Creaste una carpeta y un archivo mediante dos comandos distintos.'
  },
  {
    id: 4, title: 'Copiar y mover elementos', commands: 'cp · mv', icon: '↗',
    objective: 'Haz una copia de notas.txt y mueve esa copia a proyectos.',
    lesson: 'cp copia un archivo. mv lo mueve o cambia su nombre.',
    steps: [
      { command: 'cp notas.txt copia.txt', instruction: 'Copia notas.txt. Puedes llamar copia.txt al nuevo archivo.', hint: 'Escribe cp notas.txt copia.txt y pulsa «Ejecutar». También puedes elegir otro nombre para la copia.', output: 'Copia creada: copia.txt' },
      { command: 'mv copia.txt proyectos/', instruction: 'Mueve copia.txt a la carpeta proyectos.', hint: 'Escribe mv copia.txt proyectos/ y pulsa «Ejecutar».', output: 'copia.txt se movió a proyectos/' }
    ],
    ending: 'El archivo original permanece y la copia está dentro de proyectos.'
  },
  {
    id: 5, title: 'Administrador supremo', commands: 'sudo', icon: '✦',
    objective: 'Actualiza la lista de paquetes con permisos de administrador.',
    lesson: 'sudo solicita ejecutar una orden con privilegios de administrador. Debe usarse con cuidado.',
    steps: [{ command: 'sudo apt update', instruction: 'Actualiza la lista de paquetes con sudo.', hint: 'Escribe sudo apt update. Aquí solo se simula el resultado.', output: 'Lista de paquetes actualizada (simulación).' }],
    ending: 'sudo puede otorgar permisos de administrador a una orden. Esta app no ejecutó ningún comando real.'
  }
];

const storageKey = 'ascenso-a-root-v1';
const initialData = { completed: [], sound: true, notices: true };
let data = loadData();
let state = { screen: 'cover', mission: 0, step: 0, lines: [], hint: false, confirmReset: false, acceptedCommands: [], copyName: null };
let renderedScreen = null;
const app = document.getElementById('app');

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return {
      completed: Array.isArray(saved.completed) ? saved.completed.filter(n => Number.isInteger(n) && n >= 1 && n <= 5) : [],
      sound: saved.sound !== false,
      notices: saved.notices !== false
    };
  } catch (_) { return { ...initialData }; }
}
function saveData() { localStorage.setItem(storageKey, JSON.stringify(data)); }
function safe(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function localFile(value) { return value.replace(/^\.\//, ''); }
function localDirectory(value) { return localFile(value).replace(/\/+$/, ''); }
function isProjectDestination(value) {
  const destination = localDirectory(value);
  return destination === 'proyectos' || (!value.endsWith('/') && /^proyectos\/[A-Za-z0-9][A-Za-z0-9._-]*$/.test(destination));
}
function currentInstruction(m) {
  return m.id === 4 && state.step === 1
    ? `Mueve ${state.copyName} a la carpeta proyectos.`
    : m.steps[state.step].instruction;
}
function currentHint(m) {
  return m.id === 4 && state.step === 1
    ? `Escribe mv ${state.copyName} proyectos y pulsa «Ejecutar». También sirve proyectos/.`
    : m.steps[state.step].hint;
}
function checkCommand(m, command) {
  const args = command.split(' ');
  const expected = m.steps[state.step];

  if (m.id === 4 && state.step === 0) {
    if (args[0] === 'mv') {
      return { ok: false, message: 'mv mueve o cambia el nombre del archivo original. Primero crea una copia con cp para conservar notas.txt. Por ejemplo: cp notas.txt copia.txt.' };
    }
    if (args[0] === 'cp') {
      if (args.length !== 3) return { ok: false, message: 'cp necesita un origen y un destino. Ejemplo: cp notas.txt copia.txt.' };
      if (localFile(args[1]) !== 'notas.txt') return { ok: false, message: 'El archivo de origen de esta misión se llama notas.txt.' };
      const copyName = localFile(args[2]);
      if (copyName === 'proyectos' || copyName.startsWith('proyectos/')) {
        return { ok: false, message: 'Ese comando copiaría el archivo directamente a proyectos. En este reto, primero crea una copia aquí y luego muévela con mv.' };
      }
      if (copyName === 'notas.txt') return { ok: false, message: 'La copia necesita un nombre distinto de notas.txt.' };
      if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(copyName)) {
        return { ok: false, message: 'Usa un nombre de archivo sencillo para la copia, por ejemplo: cp notas.txt copia.txt.' };
      }
      return { ok: true, output: `Copia creada: ${copyName}`, copyName };
    }
  }

  if (m.id === 4 && state.step === 1) {
    if (args[0] === 'cp') {
      return { ok: false, message: `La copia ${state.copyName} ya está creada. Ahora muévela con mv ${state.copyName} proyectos.` };
    }
    if (args[0] === 'mv') {
      if (args.length !== 3) return { ok: false, message: `mv necesita un origen y un destino. Ejemplo: mv ${state.copyName} proyectos.` };
      const source = localFile(args[1]);
      if (source === 'notas.txt') return { ok: false, message: `No muevas el archivo original. Mueve la copia ${state.copyName}.` };
      if (source !== state.copyName) return { ok: false, message: `La copia que creaste se llama ${state.copyName}. Usa ese nombre como origen.` };
      if (isProjectDestination(args[2])) return { ok: true, output: `${state.copyName} se movió a ${args[2]}.` };
      if (localDirectory(args[2]) === 'proyecto') {
        return { ok: false, message: `La carpeta se llama proyectos, con s. Escribe mv ${state.copyName} proyectos.` };
      }
      return { ok: false, message: `El destino de esta misión es la carpeta proyectos. Puedes escribir mv ${state.copyName} proyectos o mv ${state.copyName} proyectos/.` };
    }
  }

  if (command === expected.command) return { ok: true, output: expected.output };
  if (m.id === 2 && state.step === 1 && args[0] === 'cd' && args.length === 2 &&
      ['Documentos', './Documentos', '~/Documentos', '/home/explorador/Documentos'].includes(args[1])) {
    return { ok: true, output: expected.output };
  }
  if (m.id === 3 && state.step === 0 && args[0] === 'mkdir' && args.length === 2 && localDirectory(args[1]) === 'proyectos') {
    return { ok: true, output: expected.output };
  }
  if (m.id === 3 && state.step === 1 && args[0] === 'touch' && args.length === 2 && localFile(args[1]) === 'notas.txt') {
    return { ok: true, output: expected.output };
  }
  if (m.id === 5 && command === 'sudo apt-get update') {
    return { ok: true, output: expected.output };
  }
  return { ok: false };
}
function pct() { return Math.round((data.completed.length / missions.length) * 100); }
function nextMissionIndex() { const n = missions.findIndex(m => !data.completed.includes(m.id)); return n === -1 ? missions.length - 1 : n; }
function playTone() {
  if (!data.sound) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 620;
    gain.gain.setValueAtTime(.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .09);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + .09);
    osc.onended = () => ctx.close();
  } catch (_) { /* Sound is optional. */ }
}
function nav(active) {
  // El botón central (main = true) es la acción principal: va elevado y más grande.
  const items = [['dashboard','home','Dashboard'],['afs','docs','AFs'],['map','map','Mapa',true],['team','users','Equipo'],['settings','settings','Ajustes']];
  return `<nav class="bottom-nav" aria-label="Navegación principal">
    ${items.map(([screen,icon,label,main]) => `<button class="nav-item ${main ? 'nav-main' : ''} ${active === screen ? 'active' : ''}" data-action="nav" data-screen="${screen}" aria-label="${label}" ${active === screen ? 'aria-current="page"' : ''}><span class="nav-icon"><span class="nav-plate"><span class="nav-glyph ic-${icon}" aria-hidden="true"></span></span></span><span class="nav-label">${label}</span></button>`).join('')}
  </nav>`;
}
function sectionHeader(title, sub, aside) {
  return `<h1>${title}</h1><div class="section-kicker"><span class="tech-label">${sub}</span><span>${aside}</span></div>`;
}

function cover () {
  return `<main class="content cover-content">
    <div class="cover-logos">
      <div class="logo-plate"><img src="logo-uanl.png" alt="Logo de la Universidad Autónoma de Nuevo León" /></div>
      <div class="logo-plate"><img src="logo-fime.png" alt="Logo de la Facultad de Ingeniería Mecánica y Eléctrica" /></div>
    </div>
    <div class="eyebrow">Avance PIA</div>
    <h1>SISTEMAS<br><em>OPERATIVOS</em></h1>
    <p class="cover-school">Universidad Autónoma de Nuevo León<br>Facultad de Ingeniería Mecánica y Eléctrica</p>
    <div class="hud-card cover-card">
      <div class="bar">Datos de la entrega</div>
      <div class="inner">
        <p><span class="tech-label">Maestro</span><strong>Dra. Marín Martínez Norma Edith</strong></p>
        <p><span class="tech-label">Materia</span><strong>Sistemas Operativos</strong></p>
        <p><span class="tech-label">Semestre</span><strong>5to semestre</strong></p>
      </div>
    </div>
    <button class="primary-btn full" data-action="cover-continue">Continuar ▶</button>
  </main>`; 
}

// Orden alfabético por apellido. Cada integrante conserva su propia foto.
const teamMembers = [
  { id: '2178081', name: 'Cisneros Moreno Valeria Nohemí', program: 'ITS', photo: 'equipo/04.png' },
  { id: '2097304', name: 'Esparza Leyva Jaime Sebastian', program: 'ITS', photo: 'equipo/08.png' },
  { id: '2144053', name: 'Lozano Garza Camila del Carmen', program: 'IAS', photo: 'equipo/01.png' },
  { id: '2158392', name: 'Martinez Tamez Julio César', program: 'IAS', photo: 'equipo/09.png' },
  { id: '1320176', name: 'Maycott López Gilberto', program: 'IAS', photo: 'equipo/10.png' },
  { id: '2161066', name: 'Ramirez Fabian Maria de los Angeles', program: 'IAS', photo: 'equipo/06.png' },
  { id: '2169669', name: 'Sánchez Juárez Emiliano', program: 'ITS', photo: 'equipo/07.png' },
  { id: '2226699', name: 'Sánchez Santiago Osmar Abdi', program: 'ITS', photo: 'equipo/03.png' },
  { id: '2144813', name: 'Torres Guerrero David Alonso', program: 'ITS', photo: 'equipo/05.png', leader: true },
  { id: '2160859', name: 'Vera Moreno Oscar Elias', program: 'ITS', photo: 'equipo/02.png' }
];

function team() {
  return `<main class="content team-content">
    ${sectionHeader('Integrantes','Equipo de trabajo',`${teamMembers.length} integrantes`)}
    <div class="team-list" role="list">${teamMembers.map(m => `<div class="team-row" role="listitem">
      <div class="team-photo"><img src="${m.photo}" alt="Foto de ${safe(m.name)}" /></div>
      <div class="team-info"><strong>${safe(m.name)}</strong><small>Matrícula ${safe(m.id)}${m.leader ? ' · <b class="team-leader">Líder</b>' : ''}</small></div>
      <span class="team-chip">${safe(m.program)}</span>
    </div>`).join('')}</div>
  </main>${nav('team')}`;
}

// Actividades fundamentales: cada enlace abre su PDF en el visor de la app (PdfViewerActivity).
const activities = [
  { id: 'AF1', title: 'Arquitectura, desempeño y tipo de un sistema operativo', date: '11 de agosto de 2026', pages: 37, file: 'afs/AF1.pdf' },
  { id: 'AF2', title: 'La concurrencia en los sistemas operativos', date: '18 de agosto de 2026', pages: 29, file: 'afs/AF2.pdf' },
  { id: 'AF3', title: 'Almacenaje, memoria y archivos', date: '15 de septiembre de 2026', pages: 23, file: 'afs/AF3.pdf' },
  { id: 'AF4', title: 'Redes y seguridad en sistemas distribuidos', date: '13 de octubre de 2026', pages: 42, file: 'afs/AF4.pdf' },
  { id: 'DD', title: 'Diccionario de datos', date: '25 de octubre de 2026', pages: 15, file: 'afs/DiccionarioDatos.pdf' },
  { id: 'MA', title: 'Ascenso a root', date: '25 de octubre de 2026', pages: 65, file: 'afs/Avance_de_PIA.pdf' },
];
function afs() {
  return `<main class="content">
    ${sectionHeader('Actividades','Evidencias del semestre',`${activities.length} documentos`)}
    <p class="map-summary">Toca una actividad fundamental para abrir su PDF.</p>
    <div class="af-list">${activities.map(a => `<a class="hud-card af-card" href="${a.file}?titulo=${encodeURIComponent(`${a.id} · ${a.title}`)}">
      <span class="af-badge">${a.id}</span>
      <span class="af-info"><strong>${safe(a.title)}</strong><small>Entrega: ${a.date} · ${a.pages} págs. · PDF</small></span>
      <span class="af-arrow" aria-hidden="true">▶</span>
    </a>`).join('')}</div>
  </main>${nav('afs')}`;
}

function home() {
  return `<main class="content home-content">
    <div class="eyebrow">Expedición al sistema operativo</div>
    <h1>ASCENSO<br><em>A ROOT</em></h1>
    <p class="home-copy">Supera misiones, domina los comandos y descubre cómo funciona Ubuntu.</p>
    <div class="home-hero"><img src="astronauta.png" alt="Astronauta naranja despegando" /></div>
    <div class="home-actions"><button class="primary-btn full" data-action="start">Comenzar expedición ▶</button>
      <div class="home-points"><span><b>✓</b> Aprende desde cero</span><span><b>✓</b> 5 desafíos interactivos</span></div>
    </div>
  </main>`;
}
function dashboard() {
  const next = missions[nextMissionIndex()];
  return `<main class="content">
    <div class="hud-card pia-intro"><div class="bar">Introducción · PIA Sistemas Operativos</div><div class="inner">
      <p>Un sistema operativo es el software que administra los recursos de una computadora (procesador, memoria, archivos y dispositivos) y funciona como intermediario entre el usuario y el hardware. Para nuestro Producto Integrador de Aprendizaje elegimos <b>Ubuntu</b>, una distribución de Linux libre y ampliamente utilizada, como eje para repasar el semestre.</p>
      <span class="tech-label">Objetivo</span>
      <p><b>Ascenso a Root</b> es una app móvil educativa que integra los temas vistos en clase: arquitectura y tipos de sistemas operativos, concurrencia, administración de memoria y archivos, y redes y seguridad en sistemas distribuidos.</p>
      <span class="tech-label">Contenido de la app</span>
      <ul>
        <li><b>Misiones:</b> desafíos con una terminal simulada para practicar comandos básicos de Ubuntu (pwd, ls, cd, mkdir, touch, cp, mv y sudo) sin ejecutar nada real en el teléfono.</li>
        <li><b>AFs:</b> las cuatro actividades fundamentales que desarrollamos en el semestre, una por cada tema: arquitectura y tipos de sistemas operativos (AF1), concurrencia (AF2), almacenaje, memoria y archivos (AF3), y redes y seguridad en sistemas distribuidos (AF4).</li>
      </ul>
    </div></div>
    <div class="section-kicker"><span class="tech-label">Tu progreso</span><span>¡Hola, explorador!</span></div>
    <div class="hud-card progress-panel"><div class="progress-ring" style="--pct:${pct()}%"><span>${pct()}%</span></div><div class="tech-label">Ruta Ubuntu completada</div></div>
    <h3>Estadísticas generales</h3>
    <div class="stats-grid">
      <div class="hud-card stat"><span class="icon">⬡</span><strong class="stat-number">${data.completed.length}/${missions.length}</strong><span class="stat-label">Misiones</span></div>
      <div class="hud-card stat"><span class="icon">✦</span><strong class="stat-number">${data.completed.length * 100} XP</strong><span class="stat-label">Puntos</span></div>
    </div>
    <div class="hud-card continue-card glow"><div class="bar">${data.completed.length === missions.length ? 'Ruta completada' : 'Continuar ruta'}</div><div class="inner">
      <strong>${String(next.id).padStart(2,'0')}: ${next.title}</strong><small>COMANDO: ${safe(next.commands)}</small>
      <button class="primary-btn full" data-action="open-mission" data-index="${nextMissionIndex()}">${data.completed.length === missions.length ? 'Repetir misión' : '¡Comenzar ahora!'} ▶</button>
    </div></div>
  </main>${nav('dashboard')}`;
}
function map() {
  const unlocked = data.completed.length + 1;
  const complete = data.completed.length === missions.length;
  return `<main class="content">
    ${sectionHeader('Mapa de misiones','Introducción a Ubuntu',`${pct()}% completado`)}
    <p class="map-summary">${complete ? '¡Ruta completada! Toca cualquier misión para practicar de nuevo.' : 'Completa un nivel para desbloquear el siguiente. Toca una misión disponible para jugar.'}</p>
    <div class="mission-map"><svg class="map-route" viewBox="0 0 342 520" preserveAspectRatio="none" aria-hidden="true"><path d="M38 52 C135 52 210 156 304 156 C304 206 80 206 38 260 C38 314 260 314 304 364 C304 414 80 414 38 468" /></svg>${missions.map((m,i) => {
      const complete = data.completed.includes(m.id), locked = m.id > unlocked;
      const symbol = complete ? '✓' : locked ? '🔒' : m.icon;
      return `<div class="map-row"><button class="map-node ${complete ? 'complete' : ''} ${locked ? 'locked' : ''}" data-action="open-mission" data-index="${i}" ${locked ? 'disabled' : ''} aria-label="${locked ? 'Bloqueada: ' : ''}Misión ${m.id}, ${m.title}">${symbol}</button><div class="map-info"><strong class="mission-name">${String(m.id).padStart(2,'0')}: ${m.title}</strong><div class="mission-command">COMANDO: <b>${safe(m.commands)}</b></div></div></div>`;
    }).join('')}</div>
    <button class="primary-btn full" data-action="open-mission" data-index="${nextMissionIndex()}">${complete ? 'Repetir última misión' : 'Iniciar misión'} ▶</button>
  </main>${nav('map')}`;
}
function settings() {
  return `<main class="content">
    ${sectionHeader('Ajustes','Configuración','Sistema: OK')}
    <div class="setting-hero"><img class="settings-logo" src="app_logo.png" alt="Logo de Ascenso a Root: astronauta con terminal en el visor"></div>
    <h3>Preferencias</h3>
    <button class="setting-row" data-action="toggle-notices" aria-pressed="${data.notices}"><span class="left"><span class="symbol">◇</span>Avisos en la app</span><span class="switch ${data.notices ? 'on' : ''}"></span></button>
    <button class="setting-row" data-action="toggle-sound" aria-pressed="${data.sound}"><span class="left"><span class="symbol">♫</span>Sonido y efectos</span><span class="switch ${data.sound ? 'on' : ''}"></span></button>
    <div class="setting-row"><span class="left"><span class="symbol">文</span>Idioma: Español</span></div>
    <h3 style="margin-top:27px">Aprendizaje</h3>
    <button class="setting-row danger" data-action="confirm-reset"><span class="left"><span class="symbol">↶</span>Restablecer progreso</span></button>
    <button class="setting-row" data-action="nav" data-screen="credits"><span class="left"><span class="symbol">★</span>Créditos / Conclusión</span><span class="row-arrow" aria-hidden="true">▶</span></button>
    <div class="setting-row"><span class="left"><span class="symbol">⚒</span>Acerca de Ascenso a Root</span></div>
    <p class="about">Versión 1.6.7 · Aplicación educativa sobre Ubuntu. Los comandos se simulan dentro de la aplicación y no modifican el teléfono.</p>
  </main>${nav('settings')}`;
}
function credits() {
  return `<main class="content">
    ${sectionHeader('Conclusión','Lo que aprendimos','Equipo 1')}
    <div class="hud-card report-card"><div class="bar">Conclusión del semestre</div><div class="inner">
      <p>Este semestre comprendimos que un sistema operativo no es solo el programa que enciende la computadora: es el administrador que reparte el procesador, la memoria, el almacenamiento y los dispositivos, y ofrece una capa segura entre el usuario y el hardware.</p>
      <span class="tech-label">Lo que nos dejó cada actividad</span>
      <ul>
        <li><b>AF1:</b> aunque Windows, macOS, Linux, Android o iOS sean distintos, todos comparten la misma responsabilidad: gestionar recursos de forma eficiente desde su núcleo.</li>
        <li><b>AF2:</b> la concurrencia permite ejecutar varias tareas a la vez, pero exige proteger la sección crítica con mecanismos de sincronización para evitar errores.</li>
        <li><b>AF3:</b> la RAM, la memoria virtual y el almacenamiento se complementan, y el sistema de archivos organiza y protege la información.</li>
        <li><b>AF4:</b> la seguridad en sistemas distribuidos no es un producto que se instala una vez, sino un proceso continuo de prevención, detección y respuesta.</li>
      </ul>
      <p>Con <b>Ubuntu</b> llevamos la teoría a la práctica: la terminal nos enseñó a movernos entre directorios, organizar archivos y usar sudo con responsabilidad, aplicando el principio de menor privilegio.</p>
      <p>Desarrollar Ascenso a Root nos permitió integrar estos temas en un producto propio y trabajar en equipo. Nos llevamos una idea clara: entender el sistema operativo es entender cómo funciona todo lo que ejecutamos sobre él.</p>
    </div></div>
    <div class="hud-card report-card"><div class="bar">Créditos</div><div class="inner">
      <p><b>Ascenso a Root</b> · Producto Integrador de Aprendizaje de Sistemas Operativos, Facultad de Ingeniería Mecánica y Eléctrica, UANL.</p>
      <span class="tech-label">Maestra</span>
      <p>Dra. Marín Martínez Norma Edith</p>
      <span class="tech-label">Equipo 1 · Grupo 003</span>
      <ul>${teamMembers.map(t => `<li>${safe(t.name)}${t.leader ? ' · <b>Líder</b>' : ''}</li>`).join('')}</ul>
    </div></div>
  </main>${nav('settings')}`;
}
function mission() {
  const m = missions[state.mission], finished = state.step >= m.steps.length;
  return `<main class="content mission-content">
    <div class="mission-header"><span class="eyebrow">Misión ${String(m.id).padStart(2,'0')} / 05</span><button class="back-button" data-action="nav" data-screen="map">← Mapa</button></div>
    <h1>${m.title}</h1>
    <div class="hud-card mission-brief"><span class="eyebrow">Objetivo</span><p>${m.objective}</p><p class="muted">${m.lesson}</p></div>
    <div class="steps" aria-label="Progreso de la misión">${m.steps.map((_,i) => `<span class="step ${i < state.step ? 'done' : ''}"></span>`).join('')}</div>
    ${finished ? '' : `<div class="current-step" role="status"><span class="eyebrow">Paso ${state.step + 1} de ${m.steps.length}</span><strong>${safe(currentInstruction(m))}</strong></div>`}
    <div class="terminal"><div class="terminal-head"><i></i><i></i><i></i><span style="margin-left:8px">explorador@ubuntu:~</span></div>
      <div class="terminal-body" id="terminal-log" aria-live="polite"><div class="terminal-line output">Terminal de práctica: sigue el paso indicado arriba y ejecuta un comando a la vez.</div>
        ${state.lines.map(line => `<div class="terminal-line ${line.kind}">${line.kind === 'command' ? '<span class="prompt">$ </span>' : ''}${safe(line.text)}</div>`).join('')}</div>
      ${finished ? '' : `<form class="terminal-form" id="command-form"><span class="prompt">$</span><input id="command-input" aria-label="Escribe un comando" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe un comando..."><button type="submit">Ejecutar</button></form>`}
    </div>
    ${state.hint && !finished ? `<p class="hint">Pista: ${safe(currentHint(m))}</p>` : ''}
    ${finished ? `<div class="success-panel"><strong>✓ MISIÓN COMPLETADA · +100 XP</strong><p>${m.ending}</p>${state.routeJustCompleted ? `<p class="route-done">¡Completaste toda la ruta! En un momento se abre la conclusión.</p><button class="primary-btn full" data-action="open-credits">Ver conclusión ▶</button>` : `<button class="primary-btn full" data-action="nav" data-screen="map">Volver al mapa ▶</button>`}</div>` : `<div class="mission-actions"><button class="secondary-btn" data-action="hint">Ver pista</button><button class="secondary-btn" data-action="nav" data-screen="map">Salir al mapa</button></div>`}
  </main>${nav('map')}`;
}
function resetDialog() {
  return `<div class="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="reset-title"><div class="dialog"><h3 id="reset-title">¿Restablecer progreso?</h3><p class="muted">Se borrarán tus misiones completadas y puntos XP de este dispositivo.</p><div class="dialog-actions"><button class="secondary-btn" data-action="cancel-reset">Cancelar</button><button class="primary-btn" data-action="reset">Restablecer</button></div></div></div>`;
}
function render() {
  const previousScroll = renderedScreen === state.screen ? (app.querySelector?.('.content')?.scrollTop ?? 0) : 0;
const screen = state.screen === 'cover' ? cover() : state.screen === 'team' ? team() : state.screen === 'afs' ? afs() : state.screen === 'credits' ? credits() : state.screen === 'home' ? home() : state.screen === 'dashboard' ? dashboard() : state.screen === 'map' ? map() : state.screen === 'settings' ? settings() : mission();  app.innerHTML = `<div class="top-rail" aria-hidden="true"></div>${screen}${state.confirmReset ? resetDialog() : ''}`;
  const content = app.querySelector?.('.content');
  if (content) content.scrollTop = previousScroll;
  renderedScreen = state.screen;
  if (state.screen === 'mission') {
    const log = document.getElementById('terminal-log');
    if (log) log.scrollTop = log.scrollHeight;
  }
}
function openMission(index) {
  if (!Number.isInteger(index) || index < 0 || index >= missions.length || missions[index].id > data.completed.length + 1) return;
  state = { ...state, screen: 'mission', mission: index, step: 0, lines: [], hint: false, acceptedCommands: [], copyName: null, routeJustCompleted: false };
  render();
}
function runCommand(input) {
  const command = input.trim().replace(/\s+/g, ' ');
  if (!command) return;
  const m = missions[state.mission], expected = m.steps[state.step];
  if (!expected) return;
  const result = checkCommand(m, command);
  state.lines.push({ kind: 'command', text: command });
  if (result.ok) {
    state.lines.push({ kind: 'output', text: result.output });
    if (result.copyName) state.copyName = result.copyName;
    state.acceptedCommands.push(command);
    state.step += 1;
    state.hint = false;
    if (state.step < m.steps.length) {
      state.lines.push({ kind: 'output', text: `✓ Paso completado. Sigue con el paso ${state.step + 1}: ${currentInstruction(m)}` });
    }
    if (state.step === m.steps.length && !data.completed.includes(m.id)) {
      data.completed.push(m.id);
      data.completed.sort((a,b) => a-b);
      saveData();
      playTone();
      if (data.completed.length === missions.length) state.routeJustCompleted = true;
    }
  } else if (state.acceptedCommands.includes(command)) {
    state.lines.push({ kind: 'output', text: `Ese comando ya completó un paso anterior. Ahora: ${currentInstruction(m)}` });
  } else if (result.message) {
    state.lines.push({ kind: 'error', text: result.message });
  } else if (m.id === 3 && /^mkdir\s+touch(?:\s|$)/.test(command)) {
    state.lines.push({ kind: 'error', text: 'mkdir touch notas.txt intentaría crear carpetas llamadas «touch» y «notas.txt»; no ejecuta touch. Introduce un comando a la vez: primero mkdir proyectos y después touch notas.txt.' });
  } else if (m.id === 3 && state.step === 0 && command === 'mkdir notas.txt') {
    state.lines.push({ kind: 'error', text: 'mkdir notas.txt crearía una carpeta llamada «notas.txt». En este paso debes crear la carpeta «proyectos» con mkdir proyectos. El archivo se crea después con touch notas.txt.' });
  } else if (m.id === 3 && state.step === 1 && /^mkdir\s+/.test(command)) {
    state.lines.push({ kind: 'error', text: 'La carpeta «proyectos» ya está creada. Ahora necesitas un archivo: escribe touch notas.txt.' });
  } else if (m.id === 3 && state.step === 0 && /^touch\s+/.test(command)) {
    state.lines.push({ kind: 'error', text: 'touch crea archivos, pero primero debes crear la carpeta «proyectos» con mkdir proyectos.' });
  } else if (/^cd\S/.test(command)) {
    state.lines.push({ kind: 'error', text: 'Falta un espacio después de cd. Por ejemplo: cd Documentos.' });
  } else if (m.id === 2 && state.step === 1 && /^cd\s/.test(command)) {
    state.lines.push({ kind: 'error', text: 'La misión pide entrar en Documentos. Escribe cd Documentos, con espacio y D mayúscula.' });
  } else {
    state.lines.push({ kind: 'error', text: `Este comando no completa el paso ${state.step + 1}. ${currentInstruction(m)}${data.notices ? ' Puedes tocar «Ver pista».' : ''}` });
  }
  render();
  const field = document.getElementById('command-input');
  if (field) field.focus();
  if (state.routeJustCompleted && typeof setTimeout === 'function') {
    setTimeout(() => { if (state.screen === 'mission' && state.routeJustCompleted) openCredits(); }, 2500);
  }
}
function openCredits() {
  state.routeJustCompleted = false;
  state.screen = 'credits';
  render();
}
app.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === 'start') { state.screen = 'dashboard'; playTone(); render(); }
  else if (action === 'cover-continue') { state.screen = 'home'; playTone(); render(); }
  else if (action === 'nav') { state.routeJustCompleted = false; state.screen = button.dataset.screen; playTone(); render(); }
  else if (action === 'open-credits') { playTone(); openCredits(); }
  else if (action === 'open-mission') { openMission(Number(button.dataset.index)); playTone(); }
  else if (action === 'hint') { state.hint = true; render(); }
  else if (action === 'toggle-sound') { data.sound = !data.sound; saveData(); playTone(); render(); }
  else if (action === 'toggle-notices') { data.notices = !data.notices; saveData(); render(); }
  else if (action === 'confirm-reset') { state.confirmReset = true; render(); }
  else if (action === 'cancel-reset') { state.confirmReset = false; render(); }
  else if (action === 'reset') { data.completed = []; saveData(); state.confirmReset = false; render(); }
});
app.addEventListener('submit', event => {
  if (event.target.id !== 'command-form') return;
  event.preventDefault();
  runCommand(document.getElementById('command-input').value);
});
window.goBackFromAndroid = function () {
  if (state.confirmReset) state.confirmReset = false;
  else if (state.screen === 'mission') state.screen = 'map';
  else if (state.screen === 'credits') state.screen = 'settings';
  else if (state.screen === 'home' || state.screen === 'cover') return;
  else state.screen = 'home';
  render();
};
render();
