/* Ascenso a Root: ejercicios locales. Nunca ejecuta comandos del teléfono. */
// El mapa va de la Tierra (abajo) a Root (arriba): 4 mundos de 5 niveles, uno por AF.
const worlds = [
  { id: 1, theme: 'tierra', name: 'Salir de la Tierra', af: 'AF1', topic: 'Arquitectura, desempeño y tipos de SO' },
  { id: 2, theme: 'espacio', name: 'Navegar en el espacio', af: 'AF2', topic: 'Concurrencia' },
  { id: 3, theme: 'estacion', name: 'Estación espacial', af: 'AF3', topic: 'Almacenaje, memoria y archivos' },
  { id: 4, theme: 'root', name: 'Llegar a Root', af: 'AF4', topic: 'Redes y seguridad en sistemas distribuidos' }
];
const levelsPerWorld = 5;
// Un nivel se puede jugar cuando tiene pasos. El contenido de cada mundo vive en niveles.js.
function level(world, title, commands = '') {
  return { world, title, commands, tag: '', steps: [], extras: {}, ending: '', boss: false, panel: () => '' };
}
const levelContent = { 1: world1Levels };
const missions = [
  level(1, 'Despertar', 'whoami · cat · uname'),
  level(1, 'Verificación de sistemas', 'lscpu · free · lsblk'),
  level(1, 'Encendido de propulsores', 'systemctl'),
  level(1, 'Prueba de rendimiento', 'uptime · nproc'),
  level(1, 'Secuencia de despegue', 'systemctl'),
  level(2, 'Nivel 1'), level(2, 'Nivel 2'), level(2, 'Nivel 3'), level(2, 'Nivel 4'), level(2, 'Nivel 5'),
  level(3, 'Nivel 1'), level(3, 'Nivel 2'), level(3, 'Nivel 3'), level(3, 'Nivel 4'), level(3, 'Nivel 5'),
  level(4, 'Nivel 1'), level(4, 'Nivel 2'), level(4, 'Nivel 3'), level(4, 'Nivel 4'), level(4, 'Nivel 5')
].map((m, i) => ({ ...m, ...(levelContent[m.world]?.[i % levelsPerWorld] || {}), id: i + 1 }));

const storageKey = 'ascenso-a-root-v1';
const initialData = { completed: [], xp: {}, name: '', sound: true, notices: true };
let data = loadData();
let state = { screen: 'cover', mission: 0, step: 0, lines: [], hint: false, confirmReset: false, flags: {}, history: [], historyIndex: 0, draft: '', hintsUsed: 0, busy: false, run: 0 };
let renderedScreen = null;
const app = document.getElementById('app');

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const completed = Array.isArray(saved.completed) ? saved.completed.filter(n => Number.isInteger(n) && n >= 1 && n <= missions.length) : [];
    const xp = {};
    for (const id of completed) if (Number.isInteger(saved.xp?.[id])) xp[id] = saved.xp[id];
    return {
      completed,
      xp,
      name: typeof saved.name === 'string' ? saved.name : '',
      sound: saved.sound !== false,
      notices: saved.notices !== false
    };
  } catch (_) { return { ...initialData, xp: {} }; }
}
function saveData() { localStorage.setItem(storageKey, JSON.stringify(data)); }
function safe(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function userName() { return data.name || 'explorador'; }
// Los nombres de usuario de Linux van en minúsculas, sin espacios ni acentos.
function toUsername(raw) {
  const word = String(raw).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim().split(/\s+/)[0] || '';
  return word.replace(/[^a-z0-9_-]/g, '').slice(0, 16) || 'explorador';
}
function fill(text) { return String(text).replace(/\{user\}/g, userName()); }
// Acepta variantes que en Linux significan lo mismo: espacios extra, ".service" y "/" al final de una ruta.
function normalizeCommand(input) {
  return input.trim().replace(/\s+/g, ' ').replace(/\.service\b/g, '').replace(/(\S)\/+(?=\s|$)/g, '$1');
}
function asAnswer(value) { return typeof value === 'string' ? { out: value } : value; }
function checkCommand(m, command) {
  const step = m.steps[state.step];
  if (step.answers[command] !== undefined) return { ok: true, ...asAnswer(step.answers[command]) };
  if (m.extras[command] !== undefined) return { ok: false, extra: true, ...asAnswer(m.extras[command]) };
  const error = step.errors?.[command];
  if (error !== undefined) return { ok: false, ...(typeof error === 'string' ? { message: error } : error) };
  // Como en una terminal real, un comando de un paso anterior se puede volver a ejecutar para consultar su salida.
  const earlier = m.steps.slice(0, state.step).reverse().find(s => s.answers[command] !== undefined);
  if (earlier) {
    const previous = asAnswer(earlier.answers[command]);
    return previous.anim ? { ok: false, extra: true, note: 'Ese procedimiento ya se completó.' } : { ok: false, extra: true, out: previous.out, note: previous.note };
  }
  return { ok: false };
}
function levelXp(m) { return m.boss ? Math.max(50, 200 - 50 * state.hintsUsed) : 100; }
function totalXp() { return data.completed.reduce((sum, id) => sum + (data.xp[id] ?? 100), 0); }
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
    <div class="section-kicker"><span class="tech-label">Tu progreso</span><span>¡Hola, ${safe(userName())}!</span></div>
    <div class="hud-card progress-panel"><div class="progress-ring" style="--pct:${pct()}%"><span>${pct()}%</span></div><div class="tech-label">Ruta Ubuntu completada</div></div>
    <h3>Estadísticas generales</h3>
    <div class="stats-grid">
      <div class="hud-card stat"><span class="icon">⬡</span><strong class="stat-number">${data.completed.length}/${missions.length}</strong><span class="stat-label">Misiones</span></div>
      <div class="hud-card stat"><span class="icon">✦</span><strong class="stat-number">${totalXp()} XP</strong><span class="stat-label">Puntos</span></div>
    </div>
    ${continueCard}
  </main>${nav('dashboard')}`;
}
// Escenografía de cada mundo (solo decorativa). El cohete viene de niveles.js.
const stationLights = Array.from({ length: 12 }, (_, k) => `<circle cx="${(170 + Math.cos(k * Math.PI / 6) * 128).toFixed(1)}" cy="${(170 + Math.sin(k * Math.PI / 6) * 128).toFixed(1)}" r="3.5" fill="#ff5c1a"/>`).join('');
const scenery = {
  tierra: `<div class="stars"></div><div class="earth"></div><div class="launch-pad"><i class="tower"></i>${rocket(false)}</div>`,
  espacio: `<div class="stars"></div><div class="nebula"></div><div class="planet"></div><div class="earth-far"></div><div class="rocket-fly">${rocket(true)}</div>`,
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
    <div class="setting-row"><span class="left"><span class="symbol">@</span>Usuario: ${safe(userName())}</span></div>
    <div class="setting-row"><span class="left"><span class="symbol">文</span>Idioma: Español</span></div>
    <h3 style="margin-top:27px">Aprendizaje</h3>
    <button class="setting-row danger" data-action="confirm-reset"><span class="left"><span class="symbol">↶</span>Restablecer progreso</span></button>
    <button class="setting-row" data-action="nav" data-screen="credits"><span class="left"><span class="symbol">★</span>Créditos / Conclusión</span><span class="row-arrow" aria-hidden="true">▶</span></button>
    <div class="setting-row"><span class="left"><span class="symbol">⚒</span>Acerca de Ascenso a Root</span></div>
    <p class="about">Versión 1.9.1 · Aplicación educativa sobre Ubuntu. Los comandos se simulan dentro de la aplicación y no modifican el teléfono.</p>
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
// Pantalla de nivel: panel de la nave, mensaje de Ubuntu y terminal.
const termKeys = [['Tab', 'TAB', 'Autocompletar'], ['up', '↑', 'Comando anterior'], ['down', '↓', 'Comando siguiente'], ['/', '/', 'Barra'], ['-', '-', 'Guion'], ['|', '|', 'Barra vertical'], ['~', '~', 'Virgulilla'], ['clear', 'clear', 'Limpiar terminal']];
const bookIcon = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
function terminalLine(line) {
  const prefix = line.kind === 'command' ? '<span class="prompt">$ </span>' : line.kind === 'ubuntu' ? '<span class="prompt">UBUNTU › </span>' : '';
  return `<div class="terminal-line ${line.kind}">${prefix}${safe(line.text)}</div>`;
}
function mission() {
  const m = missions[state.mission], finished = state.step >= m.steps.length, step = m.steps[state.step];
  const world = worlds[m.world - 1], number = (m.id - 1) % levelsPerWorld + 1;
  const dots = Array.from({ length: levelsPerWorld }, (_, i) => `<i class="${i + 1 < number ? 'done' : i + 1 === number ? 'now' : ''}"></i>`).join('');
  const view = { step: state.step, flags: state.flags, user: userName(), done: finished };
  const next = missions[m.id];
  const canContinue = finished && next && next.world === m.world && isReady(next);
  return `<main class="content level-content">
    <div class="level-top"><span class="eyebrow">Mundo ${m.world} · ${world.name}</span><button class="back-button" data-action="nav" data-screen="map">← Mapa</button></div>
    <h1 class="level-title">${safe(m.title)}</h1>
    <div class="level-meta"><span class="af-chip">${world.af} · ${world.topic.split(',')[0]}</span>${m.boss ? '<span class="boss-tag">Jefe · 200 XP</span>' : ''}<span class="level-dots" role="img" aria-label="Nivel ${number} de ${levelsPerWorld}">${dots}</span></div>
    <section class="ship-panel" aria-label="Panel de la nave"><span class="panel-tag">${m.tag}</span>${m.panel(view)}</section>
    <section class="ubuntu-msg" aria-live="polite"><img class="ubuntu-avatar" src="figuras/ojo-ubuntu.png" alt=""><div><span class="ubuntu-name">Ubuntu${finished ? ' · nivel completado' : ` · paso ${state.step + 1} de ${m.steps.length}`}</span><p>${safe(fill(finished ? m.ending : step.say))}</p></div></section>
    <div class="terminal"><div class="terminal-head"><i></i><i></i><i></i><span>${safe(userName())}@nave:~</span></div>
      <div class="terminal-body" id="terminal-log" aria-live="polite"><div class="terminal-line output">Terminal de la nave. Escriba un comando y pulse Ejecutar.</div>${state.lines.map(terminalLine).join('')}</div>
      ${finished ? '' : `<form class="terminal-form" id="command-form"><span class="prompt">$</span><input id="command-input" aria-label="Escriba un comando" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${state.busy ? 'Procesando…' : 'Escriba un comando'}" value="${safe(state.draft)}" ${state.busy ? 'disabled' : ''}><button type="submit" ${state.busy ? 'disabled' : ''}>Ejecutar</button></form>`}
    </div>
    ${finished ? `<div class="success-panel"><strong>Nivel completado · +${state.earnedXp ?? levelXp(m)} XP</strong>${m.boss && state.hintsUsed ? `<p>Pistas usadas: ${state.hintsUsed}.</p>` : ''}
      ${state.routeJustCompleted ? `<p class="route-done">¡Completó toda la ruta! En un momento se abre la conclusión.</p><button class="primary-btn full" data-action="open-credits">Ver conclusión ▶</button>` : `<div class="success-actions">${canContinue ? `<button class="primary-btn full" data-action="open-mission" data-index="${next.id - 1}">Siguiente nivel ▶</button>` : ''}<button class="secondary-btn full" data-action="nav" data-screen="map">Volver al mapa</button></div>`}</div>`
    : `<div class="term-keys" role="group" aria-label="Atajos de teclado">${termKeys.map(([key, label, name]) => `<button type="button" class="term-key" data-action="key" data-key="${key}" aria-label="${name}">${label}</button>`).join('')}</div>
      ${state.hint ? `<p class="hint">Pista: ${safe(fill(step.hint))}</p>` : ''}
      <div class="level-actions"><button class="secondary-btn" data-action="hint" ${state.hint ? 'disabled' : ''}>${m.boss ? 'Ver pista · −50 XP' : 'Ver pista'}</button><button class="secondary-btn" data-action="show-log">${bookIcon}Bitácora</button></div>`}
  </main>${nav('map')}${state.showLog ? logDialog() : ''}`;
}
// Bitácora: comandos aprendidos en niveles completados y en los pasos ya superados del nivel actual.
function learnedState(g) {
  const current = state.screen === 'mission' && missions[state.mission].id === g.level && state.step > g.step;
  if (current) return 'new';
  return data.completed.includes(g.level) ? 'known' : null;
}
function logDialog() {
  const entries = glossary.map(g => ({ ...g, learned: learnedState(g) })).filter(g => g.learned);
  return `<div class="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="log-title"><div class="dialog log-dialog"><h3 id="log-title">Bitácora de comandos</h3>
    ${entries.length ? `<ul class="log-list">${entries.map(g => `<li><code>${safe(g.cmd)}</code>${g.learned === 'new' ? '<span class="log-new">Nuevo</span>' : ''}<p>${safe(g.text)}</p><small>Ejemplo: <code>${safe(g.example)}</code></small></li>`).join('')}</ul>` : '<p class="muted">Todavía no hay comandos registrados. Complete el primer paso para registrar el primero.</p>'}
    <div class="dialog-actions"><button class="primary-btn" data-action="close-log">Cerrar</button></div></div></div>`;
}
// Registro del nombre de usuario antes de la primera expedición.
function callsign() {
  return `<main class="content callsign-content">
    <img class="callsign-eye" src="figuras/ojo-ubuntu.png" alt="">
    <p class="callsign-say">${state.nameNote ? safe(state.nameNote) : 'Identificación requerida. Escriba su nombre de usuario.'}</p>
    ${state.nameNote ? '<button class="primary-btn full" data-action="callsign-continue">Continuar ▶</button>' : `<form class="callsign-form" id="callsign-form">
      <label for="callsign-input">Nombre de usuario</label>
      <input id="callsign-input" maxlength="24" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="explorador">
      <p class="field-help">Se escribe en minúsculas, sin espacios ni acentos. Si lo deja vacío, será explorador.</p>
      <button class="primary-btn full" type="submit">Confirmar</button>
    </form>`}
  </main>`;
}
function resetDialog() {
  return `<div class="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="reset-title"><div class="dialog"><h3 id="reset-title">¿Restablecer progreso?</h3><p class="muted">Se borrarán tus misiones completadas y puntos XP de este dispositivo.</p><div class="dialog-actions"><button class="secondary-btn" data-action="cancel-reset">Cancelar</button><button class="primary-btn" data-action="reset">Restablecer</button></div></div></div>`;
}
function render() {
  const previousScroll = renderedScreen === state.screen ? (app.querySelector?.('.content')?.scrollTop ?? 0) : 0;
  // Conserva lo que el jugador iba escribiendo cuando la pantalla se vuelve a dibujar.
  const field = renderedScreen === 'mission' ? document.getElementById('command-input') : null;
  if (field && typeof field.value === 'string') state.draft = field.value;
const screen = state.screen === 'cover' ? cover() : state.screen === 'team' ? team() : state.screen === 'afs' ? afs() : state.screen === 'credits' ? credits() : state.screen === 'home' ? home() : state.screen === 'callsign' ? callsign() : state.screen === 'dashboard' ? dashboard() : state.screen === 'map' ? map() : state.screen === 'settings' ? settings() : mission();  app.innerHTML = `<div class="top-rail" aria-hidden="true"></div>${screen}${state.confirmReset ? resetDialog() : ''}`;
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
  state = { ...state, screen: 'mission', mission: index, step: 0, lines: [], hint: false, flags: {}, history: [], historyIndex: 0, draft: '', hintsUsed: 0, earnedXp: null, busy: false, showLog: false, routeJustCompleted: false, run: state.run + 1 };
  renderedScreen = null;
  render();
}
function focusCommand() { document.getElementById('command-input')?.focus?.(); }
function refreshLevel() {
  render();
  focusCommand();
  if (state.routeJustCompleted && typeof setTimeout === 'function') {
    setTimeout(() => { if (state.screen === 'mission' && state.routeJustCompleted) openCredits(); }, 2500);
  }
}
// Animaciones del jefe: avanzan por cuadros. Sin temporizador (pruebas), se aplican de inmediato.
function later(fn, ms) { if (typeof setTimeout === 'function') setTimeout(fn, ms); else fn(); }
function playFrames(frames, delay, done) {
  const run = state.run;
  const next = i => {
    if (state.run !== run) return;
    if (i >= frames.length) return done();
    frames[i]();
    render();
    later(() => next(i + 1), delay);
  };
  next(0);
}
const animations = {
  boot(done) {
    const stages = [['BIOS', 'Reviso el hardware'], ['GRUB', 'Cargo mi kernel'], ['KERNEL', 'Tomo control de los dispositivos']];
    const frames = stages.map(([name, text], i) => () => { state.flags.boot = i + 1; state.lines.push({ kind: 'boot', text: `[ OK ] ${name} · ${text}` }); });
    frames.push(() => { state.flags.boot = 4; state.flags.bootFail = true; state.lines.push({ kind: 'error', text: '[FALLA] SERVICIOS · Inicio los programas de la nave' }, { kind: 'error', text: '1 servicio no pudo iniciar.' }); });
    playFrames(frames, 850, done);
  },
  launch(done) {
    state.lines.push({ kind: 'boot', text: 'Secuencia de despegue iniciada.' });
    const frames = Array.from({ length: 10 }, (_, i) => () => { state.flags.count = 10 - i; });
    frames.push(() => { state.flags.launch = true; state.lines.push({ kind: 'boot', text: 'T-0 · ¡Despegue!' }); });
    playFrames(frames, 420, () => later(done, 2600));
  }
};
function completeLevel(m) {
  state.earnedXp = levelXp(m);
  data.xp[m.id] = Math.max(data.xp[m.id] ?? 0, state.earnedXp);
  if (!data.completed.includes(m.id)) {
    data.completed.push(m.id);
    data.completed.sort((a, b) => a - b);
    if (data.completed.length === missions.length) state.routeJustCompleted = true;
  }
  saveData();
  playTone();
}
function advance(m) {
  state.step += 1;
  state.hint = false;
  if (state.step === m.steps.length) completeLevel(m);
}
function runCommand(input) {
  const raw = input.trim();
  const m = missions[state.mission];
  if (!raw || state.busy || !m.steps[state.step]) return;
  const field = document.getElementById('command-input');
  if (field && typeof field.value === 'string') field.value = '';
  state.draft = '';
  state.history.push(raw);
  state.historyIndex = state.history.length;
  const command = normalizeCommand(raw);
  if (command === 'clear') { state.lines = []; return refreshLevel(); }
  state.lines.push({ kind: 'command', text: raw });
  const result = checkCommand(m, command);
  if (result.set) Object.assign(state.flags, result.set);
  if (result.out) state.lines.push({ kind: 'output', text: fill(result.out) });
  if (result.note) state.lines.push({ kind: 'ubuntu', text: fill(result.note) });
  if (result.ok && result.anim) {
    state.busy = true;
    refreshLevel();
    const run = state.run;
    return animations[result.anim](() => { if (state.run !== run) return; state.busy = false; advance(m); refreshLevel(); });
  }
  if (result.ok) advance(m);
  else if (result.message) state.lines.push({ kind: 'error', text: fill(result.message) });
  else if (!result.extra) state.lines.push({ kind: 'error', text: `Comando no reconocido para este paso.${data.notices ? ' Toque «Ver pista» si lo necesita.' : ''}` });
  refreshLevel();
}
// Atajos sobre el campo de comando, sin volver a dibujar la pantalla.
function pressKey(key) {
  const field = document.getElementById('command-input');
  if (!field || field.disabled) return;
  const m = missions[state.mission];
  if (key === 'clear') { state.lines = []; render(); return focusCommand(); }
  if (key === 'Tab') {
    // Como en bash, completa la palabra que se está escribiendo.
    const typed = field.value.replace(/^\s+/, '');
    const options = [...Object.keys(m.steps[state.step]?.answers || {}), ...Object.keys(m.extras), ...glossary.filter(learnedState).map(g => g.example)];
    const match = typed && options.find(o => o.startsWith(typed) && o !== typed);
    if (match) { const end = match.indexOf(' ', typed.length + (match[typed.length] === ' ' ? 1 : 0)); field.value = end === -1 ? match : match.slice(0, end); }
  } else if (key === 'up' || key === 'down') {
    state.historyIndex = Math.min(state.history.length, Math.max(0, state.historyIndex + (key === 'up' ? -1 : 1)));
    field.value = state.history[state.historyIndex] ?? '';
  } else {
    const start = field.selectionStart ?? field.value.length, end = field.selectionEnd ?? field.value.length;
    field.value = field.value.slice(0, start) + key + field.value.slice(end);
    field.setSelectionRange?.(start + key.length, start + key.length);
  }
  field.focus();
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
  if (action === 'start') { state.screen = data.name ? 'dashboard' : 'callsign'; state.nameNote = null; playTone(); render(); }
  else if (action === 'callsign-continue') { state.screen = 'dashboard'; state.nameNote = null; playTone(); render(); }
  else if (action === 'key') pressKey(button.dataset.key);
  else if (action === 'show-log') { state.showLog = true; render(); }
  else if (action === 'close-log') { state.showLog = false; render(); focusCommand(); }
  else if (action === 'cover-continue') { state.screen = 'home'; playTone(); render(); }
  else if (action === 'nav') { state.routeJustCompleted = false; state.screen = button.dataset.screen; playTone(); render(); }
  else if (action === 'open-credits') { playTone(); openCredits(); }
  else if (action === 'open-mission') { openMission(Number(button.dataset.index)); playTone(); }
  else if (action === 'hint') { state.hint = true; if (missions[state.mission].boss) state.hintsUsed += 1; render(); }
  else if (action === 'toggle-sound') { data.sound = !data.sound; saveData(); playTone(); render(); }
  else if (action === 'toggle-notices') { data.notices = !data.notices; saveData(); render(); }
  else if (action === 'confirm-reset') { state.confirmReset = true; render(); }
  else if (action === 'cancel-reset') { state.confirmReset = false; render(); }
  else if (action === 'reset') { data.completed = []; data.xp = {}; saveData(); state.confirmReset = false; render(); }
});
// Los atajos no deben quitarle el foco al campo, para que el teclado del teléfono no se cierre.
app.addEventListener('pointerdown', event => { if (event.target.closest?.('.term-key')) event.preventDefault(); });
app.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target.id === 'command-form') runCommand(document.getElementById('command-input').value);
  else if (event.target.id === 'callsign-form') registerName(document.getElementById('callsign-input').value);
});
function registerName(raw) {
  const typed = String(raw).trim();
  data.name = toUsername(typed);
  saveData();
  state.nameNote = typed && typed !== data.name
    ? `Nombre ajustado al formato de usuario de Linux: ${data.name}. Bienvenido a bordo.`
    : `Usuario ${data.name} registrado. Bienvenido a bordo.`;
  playTone();
  render();
}
window.goBackFromAndroid = function () {
  if (state.confirmReset) state.confirmReset = false;
  else if (state.showLog) state.showLog = false;
  else if (state.screen === 'callsign') state.screen = 'home';
  else if (state.screen === 'mission') state.screen = 'map';
  else if (state.screen === 'credits') state.screen = 'settings';
  else if (state.screen === 'home' || state.screen === 'cover') return;
  else state.screen = 'home';
  render();
};
render();
