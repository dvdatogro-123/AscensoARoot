/* Ascenso a Root: ejercicios locales. Nunca ejecuta comandos del teléfono. */
// El mapa va de la Tierra (abajo) a Root (arriba): 4 mundos de 5 niveles, uno por AF.
const worlds = [
  { id: 1, theme: 'tierra', name: 'Salir de la Tierra', af: 'AF1', topic: 'Arquitectura, desempeño y tipos de SO' },
  { id: 2, theme: 'espacio', name: 'Navegar en el espacio', af: 'AF2', topic: 'Concurrencia' },
  { id: 3, theme: 'estacion', name: 'Estación espacial', af: 'AF3', topic: 'Almacenaje, memoria y archivos' },
  { id: 4, theme: 'root', name: 'Llegar a Root', af: 'AF4', topic: 'Redes y seguridad en sistemas distribuidos' }
];
const levelsPerWorld = 5;
// Un nivel se puede jugar cuando tiene pasos: steps: [{ command, instruction, hint, output }].
function level(world, title, commands = '') {
  return { world, title, commands, icon: '›', objective: '', lesson: '', steps: [], ending: '' };
}
const missions = [
  level(1, 'Despertar', 'whoami · cat · uname'),
  level(1, 'Verificación de sistemas', 'lscpu · free · lsblk'),
  level(1, 'Encendido de propulsores', 'systemctl'),
  level(1, 'Prueba de rendimiento', 'uptime · nproc'),
  level(1, 'Secuencia de despegue', 'systemctl'),
  level(2, 'Nivel 1'), level(2, 'Nivel 2'), level(2, 'Nivel 3'), level(2, 'Nivel 4'), level(2, 'Nivel 5'),
  level(3, 'Nivel 1'), level(3, 'Nivel 2'), level(3, 'Nivel 3'), level(3, 'Nivel 4'), level(3, 'Nivel 5'),
  level(4, 'Nivel 1'), level(4, 'Nivel 2'), level(4, 'Nivel 3'), level(4, 'Nivel 4'), level(4, 'Nivel 5')
].map((m, i) => ({ ...m, id: i + 1 }));

const storageKey = 'ascenso-a-root-v1';
const initialData = { completed: [], sound: true, notices: true };
let data = loadData();
let state = { screen: 'cover', mission: 0, step: 0, lines: [], hint: false, confirmReset: false, acceptedCommands: [] };
let renderedScreen = null;
const app = document.getElementById('app');

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return {
      completed: Array.isArray(saved.completed) ? saved.completed.filter(n => Number.isInteger(n) && n >= 1 && n <= missions.length) : [],
      sound: saved.sound !== false,
      notices: saved.notices !== false
    };
  } catch (_) { return { ...initialData }; }
}
function saveData() { localStorage.setItem(storageKey, JSON.stringify(data)); }
function safe(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function checkCommand(m, command) {
  const expected = m.steps[state.step];
  if (command === expected.command) return { ok: true, output: expected.output };
  return { ok: false };
}
function pct() { return missions.length ? Math.round((data.completed.length / missions.length) * 100) : 0; }
function isReady(m) { return m.steps.length > 0; }
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
      <div class="home-points"><span><b>✓</b> Aprende desde cero</span><span><b>✓</b> Desafíos interactivos</span></div>
    </div>
  </main>`;
}
function dashboard() {
  const next = missions[nextMissionIndex()];
  const continueCard = next && isReady(next) ? `<div class="hud-card continue-card glow"><div class="bar">${data.completed.length === missions.length ? 'Ruta completada' : 'Continuar ruta'}</div><div class="inner">
      <strong>${String(next.id).padStart(2,'0')}: ${next.title}</strong><small>COMANDO: ${safe(next.commands)}</small>
      <button class="primary-btn full" data-action="open-mission" data-index="${nextMissionIndex()}">${data.completed.length === missions.length ? 'Repetir misión' : '¡Comenzar ahora!'} ▶</button>
    </div></div>` : `<div class="hud-card continue-card"><div class="bar">Nuevas misiones en camino</div><div class="inner"><small>Estamos preparando los nuevos niveles de la expedición.</small></div></div>`;
  return `<main class="content">
    <div class="hud-card pia-intro"><div class="bar">Introducción · PIA Sistemas Operativos</div><div class="inner">
      <p>Un sistema operativo es el software que administra los recursos de una computadora (procesador, memoria, archivos y dispositivos) y funciona como intermediario entre el usuario y el hardware. Para nuestro Producto Integrador de Aprendizaje elegimos <b>Ubuntu</b>, una distribución de Linux libre y ampliamente utilizada, como eje para repasar el semestre.</p>
      <span class="tech-label">Objetivo</span>
      <p><b>Ascenso a Root</b> es una app móvil educativa que integra los temas vistos en clase: arquitectura y tipos de sistemas operativos, concurrencia, administración de memoria y archivos, y redes y seguridad en sistemas distribuidos.</p>
      <span class="tech-label">Contenido de la app</span>
      <ul>
        <li><b>Misiones:</b> desafíos con una terminal simulada para practicar comandos de Ubuntu sin ejecutar nada real en el teléfono.</li>
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
    ${continueCard}
  </main>${nav('dashboard')}`;
}
// Escenografía de cada mundo (solo decorativa).
function rocketSvg(flame) {
  return `<svg viewBox="0 0 90 240"><polygon points="22,128 2,182 22,182" fill="#2a2525"/><polygon points="68,128 88,182 68,182" fill="#2a2525"/><rect x="8" y="166" width="10" height="14" rx="2" fill="#ff5c1a"/><rect x="72" y="166" width="10" height="14" rx="2" fill="#ff5c1a"/>
    <rect x="22" y="36" width="46" height="150" rx="23" fill="#3d3838"/><rect x="48" y="46" width="16" height="132" rx="8" fill="#262222"/><rect x="28" y="50" width="5" height="124" rx="2.5" fill="#5a5353"/>
    <rect x="22" y="140" width="46" height="7" fill="#ff5c1a"/><rect x="22" y="152" width="46" height="3" fill="#ff5c1a"/><circle cx="45" cy="89" r="11" fill="#0d0a0a" stroke="#ff5c1a" stroke-width="3"/><circle cx="42" cy="86" r="3" fill="#ff8d38"/>
    <polygon points="22,58 45,12 68,58" fill="#ff5c1a"/><rect x="31" y="184" width="28" height="12" rx="3" fill="#1a1616" stroke="#4a4444"/>
    ${flame ? '<ellipse cx="45" cy="214" rx="13" ry="22" fill="#ff5c1a"/><ellipse cx="45" cy="208" rx="7" ry="13" fill="#ffb347"/>' : ''}</svg>`;
}
const stationLights = Array.from({ length: 12 }, (_, k) => `<circle cx="${(170 + Math.cos(k * Math.PI / 6) * 128).toFixed(1)}" cy="${(170 + Math.sin(k * Math.PI / 6) * 128).toFixed(1)}" r="3.5" fill="#ff5c1a"/>`).join('');
const scenery = {
  tierra: `<div class="stars"></div><div class="earth"></div><div class="launch-pad"><i class="tower"></i>${rocketSvg(false)}</div>`,
  espacio: `<div class="stars"></div><div class="nebula"></div><div class="planet"></div><div class="earth-far"></div><div class="rocket-fly">${rocketSvg(true)}</div>`,
  estacion: `<div class="stars"></div><svg class="station" viewBox="0 0 340 340"><circle cx="170" cy="170" r="128" fill="none" stroke="#3a424c" stroke-width="18"/><rect x="160" y="40" width="20" height="260" fill="#2c333b"/><rect x="40" y="160" width="260" height="20" fill="#2c333b"/><rect x="-100" y="152" width="122" height="36" fill="#1b2633" stroke="#3a4a5c"/><rect x="318" y="152" width="122" height="36" fill="#1b2633" stroke="#3a4a5c"/><circle cx="170" cy="170" r="40" fill="#2c333b" stroke="#4a535e" stroke-width="5"/><circle cx="170" cy="170" r="16" fill="#ff5c1a" opacity=".45"/>${stationLights}</svg>`,
  root: `<div class="stars"></div><div class="root-planet"></div><div class="shield"></div>`
};
// Camino de un mundo, del nivel 1 (abajo) al 5 (arriba), en el viewBox 342 × 520.
const levelRoute = ['M72 468 C72 414 270 418 270 364', 'M270 364 C270 310 72 314 72 260', 'M72 260 C72 206 270 210 270 156', 'M270 156 C270 100 171 110 171 52'];
const levelPlaces = ['left', 'right', 'left', 'right', 'center'];
function worldDone(w) { return missions.every(m => m.world !== w.id || data.completed.includes(m.id)); }
function levelState(m) {
  if (data.completed.includes(m.id)) return 'complete';
  if (m.id > data.completed.length + 1) return 'locked';
  return isReady(m) ? 'current' : 'soon';
}
function levelNode(m, i) {
  const status = levelState(m), playable = status === 'complete' || status === 'current';
  const symbol = status === 'complete' ? '✓' : status === 'current' ? '▶' : '🔒';
  const detail = status === 'soon' ? 'Próximamente' : safe(m.commands);
  return `<div class="level-row ${levelPlaces[i]}"><button class="level-node ${status}" data-action="open-mission" data-index="${m.id - 1}" ${playable ? '' : 'disabled'} aria-label="Nivel ${i + 1}, ${safe(m.title)}${playable ? '' : ' (bloqueado)'}"><span>${symbol}</span></button>
    <div class="level-label"><strong>${String(i + 1).padStart(2,'0')} · ${safe(m.title)}</strong>${i === levelsPerWorld - 1 ? '<b class="boss-chip">Jefe</b>' : ''}${detail ? `<small>${detail}</small>` : ''}</div></div>`;
}
function worldSection(w, current) {
  const levels = missions.filter(m => m.world === w.id);
  const route = levelRoute.map((d, i) => `<path class="${data.completed.includes(levels[i].id) ? 'reached' : ''}" d="${d}" />`).join('');
  return `<section class="world world-${w.theme}${w.id === current ? ' current' : ''}" aria-label="Mundo ${w.id}: ${w.name}">
    <div class="world-scenery" aria-hidden="true">${scenery[w.theme]}</div>
    <header class="world-title"><span class="eyebrow">Mundo ${w.id} · ${w.af}</span><h2>${w.name}</h2><small>${w.topic}</small></header>
    <div class="world-levels"><svg class="world-route" viewBox="0 0 342 520" preserveAspectRatio="none" aria-hidden="true">${route}</svg>${levels.map(levelNode).reverse().join('')}</div>
  </section>`;
}
// Barrera arriba de cada mundo: se abre al completar sus 5 niveles. Sobre Root va el destino final.
function worldGate(w) {
  const next = worlds[w.id];
  if (!next) return `<div class="world-gate final"><span class="gate-lock" aria-hidden="true">#</span><div><strong>Destino final · Root</strong><small>Supera el último nivel para ser root</small></div></div>`;
  const open = worldDone(w);
  return `<div class="world-gate ${open ? 'open' : 'locked'}"><span class="gate-lock" aria-hidden="true">${open ? '🔓' : '🔒'}</span><div><strong>Mundo ${next.id} · ${next.name}</strong><small>${open ? 'Desbloqueado · Adelante, explorador' : 'Bloqueado · Completa los 5 niveles'}</small></div></div>`;
}
function map() {
  const current = missions[nextMissionIndex()].world;
  return `<main class="content map-content">
    <div class="world-map">${[...worlds].reverse().map(w => worldGate(w) + worldSection(w, current)).join('')}</div>
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
    <p class="about">Versión 1.7.0 · Aplicación educativa sobre Ubuntu. Los comandos se simulan dentro de la aplicación y no modifican el teléfono.</p>
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
    <div class="mission-header"><span class="eyebrow">Mundo ${m.world} · Nivel ${(m.id - 1) % levelsPerWorld + 1}</span><button class="back-button" data-action="nav" data-screen="map">← Mapa</button></div>
    <h1>${m.title}</h1>
    <div class="hud-card mission-brief"><span class="eyebrow">Objetivo</span><p>${m.objective}</p><p class="muted">${m.lesson}</p></div>
    <div class="steps" aria-label="Progreso de la misión">${m.steps.map((_,i) => `<span class="step ${i < state.step ? 'done' : ''}"></span>`).join('')}</div>
    ${finished ? '' : `<div class="current-step" role="status"><span class="eyebrow">Paso ${state.step + 1} de ${m.steps.length}</span><strong>${safe(m.steps[state.step].instruction)}</strong></div>`}
    <div class="terminal"><div class="terminal-head"><i></i><i></i><i></i><span style="margin-left:8px">explorador@ubuntu:~</span></div>
      <div class="terminal-body" id="terminal-log" aria-live="polite"><div class="terminal-line output">Terminal de práctica: sigue el paso indicado arriba y ejecuta un comando a la vez.</div>
        ${state.lines.map(line => `<div class="terminal-line ${line.kind}">${line.kind === 'command' ? '<span class="prompt">$ </span>' : ''}${safe(line.text)}</div>`).join('')}</div>
      ${finished ? '' : `<form class="terminal-form" id="command-form"><span class="prompt">$</span><input id="command-input" aria-label="Escribe un comando" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe un comando..."><button type="submit">Ejecutar</button></form>`}
    </div>
    ${state.hint && !finished ? `<p class="hint">Pista: ${safe(m.steps[state.step].hint)}</p>` : ''}
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
  // Al entrar al mapa, se coloca en el mundo donde va el jugador.
  if (state.screen === 'map' && renderedScreen !== 'map') app.querySelector?.('.world.current')?.scrollIntoView?.({ block: 'center' });
  renderedScreen = state.screen;
  if (state.screen === 'mission') {
    const log = document.getElementById('terminal-log');
    if (log) log.scrollTop = log.scrollHeight;
  }
}
function openMission(index) {
  if (!Number.isInteger(index) || index < 0 || index >= missions.length || missions[index].id > data.completed.length + 1 || !isReady(missions[index])) return;
  state = { ...state, screen: 'mission', mission: index, step: 0, lines: [], hint: false, acceptedCommands: [], routeJustCompleted: false };
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
    state.acceptedCommands.push(command);
    state.step += 1;
    state.hint = false;
    if (state.step < m.steps.length) {
      state.lines.push({ kind: 'output', text: `✓ Paso completado. Sigue con el paso ${state.step + 1}: ${m.steps[state.step].instruction}` });
    }
    if (state.step === m.steps.length && !data.completed.includes(m.id)) {
      data.completed.push(m.id);
      data.completed.sort((a,b) => a-b);
      saveData();
      playTone();
      if (data.completed.length === missions.length) state.routeJustCompleted = true;
    }
  } else if (state.acceptedCommands.includes(command)) {
    state.lines.push({ kind: 'output', text: `Ese comando ya completó un paso anterior. Ahora: ${m.steps[state.step].instruction}` });
  } else if (result.message) {
    state.lines.push({ kind: 'error', text: result.message });
  } else {
    state.lines.push({ kind: 'error', text: `Este comando no completa el paso ${state.step + 1}. ${m.steps[state.step].instruction}${data.notices ? ' Puedes tocar «Ver pista».' : ''}` });
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
