const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const assets = path.join(__dirname, '..', 'app', 'src', 'main', 'assets');

function appContext() {
  const saved = new Map();
  const app = { innerHTML: '', addEventListener() {} };
  const context = vm.createContext({
    document: {
      getElementById(id) {
        if (id === 'app') return app;
        if (id === 'terminal-log') return { scrollTop: 0, scrollHeight: 0 };
        if (id === 'command-input') return { focus() {} };
        return null;
      }
    },
    localStorage: {
      getItem(key) { return saved.get(key) ?? null; },
      setItem(key, value) { saved.set(key, value); }
    },
    window: {}
  });
  // Mismo orden que index.html: primero el contenido de los niveles y luego la app.
  for (const file of ['niveles.js', 'app.js']) vm.runInContext(fs.readFileSync(path.join(assets, file), 'utf8'), context);
  return { app, run: expression => vm.runInContext(expression, context) };
}
// {dato} en un comando se rellena con state.flags en el momento de escribirlo, como haría el jugador al leer la terminal.
function play(run, commands) {
  for (const command of commands) {
    const typed = command.replace(/\{(\w+)\}/g, (_, key) => run(`state.flags.${key}`));
    run(`runCommand(${JSON.stringify(typed)})`);
  }
}

// Comandos que completan cada nivel del Mundo 1, tal como se diseñaron.
const world1 = [
  ['whoami', 'cat /etc/os-release', 'uname -r'],
  ['lscpu', 'free -h', 'lsblk'],
  ['systemctl --failed', 'systemctl status propulsores', 'systemctl start combustible', 'systemctl start propulsores'],
  ['uptime', 'nproc', 'ls /sistemas/navegacion', 'cat /sistemas/navegacion/tiempo_real.txt', 'systemctl start navegacion-tiempo-real'],
  ['systemctl reboot', 'systemctl --failed', 'systemctl status escudo-termico', 'systemctl start sensor-termico', 'systemctl start escudo-termico', 'systemctl start despegue']
];

test('hay 4 mundos de 5 niveles y todas las pantallas se muestran', () => {
  const { app, run } = appContext();
  assert.equal(run('missions.length'), 20);
  assert.equal(run('worlds.map(w => missions.filter(m => m.world === w.id).length).join()'), '5,5,5,5');
  for (const screen of ['cover', 'home', 'callsign', 'dashboard', 'afs', 'map', 'team', 'settings', 'credits']) {
    run(`state.screen = '${screen}'; render()`);
    assert.ok(app.innerHTML.length > 0, screen);
  }
});

test('el Mundo 1 se completa con los comandos de cada nivel y abre la barrera del Mundo 2', () => {
  const { app, run } = appContext();
  world1.forEach((commands, index) => {
    run(`openMission(${index})`);
    assert.equal(run('state.screen'), 'mission', `nivel ${index + 1}`);
    play(run, commands);
    assert.equal(run(`data.completed.includes(${index + 1})`), true, `nivel ${index + 1}`);
  });
  assert.equal(run('totalXp()'), 600);
  run("state.screen = 'map'; render()");
  assert.equal((app.innerHTML.match(/class="world-gate open"/g) || []).length, 1);
  run('openMission(5)');
  assert.equal(run('state.screen'), 'mission', 'el Mundo 2 ya se puede jugar');
});

// Comandos que completan cada nivel del Mundo 2.
const world2 = [
  ['ps -e', 'kill {pid}', 'ps -e'],
  ['top', 'renice 10 -p 812', 'top'],
  ['reparar-casco &', 'ajustar-rumbo', 'jobs'],
  ['cat /nave/combustible.log', 'systemctl start semaforo-combustible', 'cat /nave/combustible.log'],
  ['ps -e', 'cat /nave/robots.txt', 'kill {pidB}', 'systemctl start semaforo-herramientas', 'systemctl start {killed}', 'systemctl start motor-principal']
];

test('el Mundo 2 se completa y abre la barrera del Mundo 3', () => {
  const { app, run } = appContext();
  run('data.completed = [1, 2, 3, 4, 5]; data.xp = {}');
  world2.forEach((commands, index) => {
    run(`openMission(${index + 5})`);
    assert.equal(run('state.screen'), 'mission', `nivel ${index + 6}`);
    play(run, commands);
    assert.equal(run(`data.completed.includes(${index + 6})`), true, `nivel ${index + 6}`);
  });
  assert.equal(run('state.flags.thrust'), 100);
  run("state.screen = 'map'; render()");
  assert.equal((app.innerHTML.match(/class="world-gate open"/g) || []).length, 2);
});

test('el PID de señal_fantasma cambia en cada partida y kill explica los errores', () => {
  const { app, run } = appContext();
  run('data.completed = [1, 2, 3, 4, 5]; openMission(5)');
  const pid = run('state.flags.pid');
  assert.ok(pid >= 2000 && pid < 8000);
  play(run, ['ps -e']);
  assert.match(run('state.lines.at(-1).text'), new RegExp(`${pid} \\?.*señal_fantasma`));
  assert.match(app.innerHTML, new RegExp(`PID ${pid}`));
  play(run, ['kill 1']);
  assert.match(run('state.lines.at(-1).text'), /systemd/);
  play(run, ['kill señal_fantasma']);
  assert.match(run('state.lines.at(-1).text'), /número PID/);
  play(run, ['kill 99999']);
  assert.match(run('state.lines.at(-1).text'), /No existe ese proceso/);
  assert.equal(run('state.step'), 1);
  play(run, ['kill {pid}', 'kill {pid}']);
  assert.match(run('state.lines.at(-1).text'), /No existe ese proceso/, 'un proceso terminado ya no existe');
  assert.equal(run('state.step'), 2);
});

test('soporte_vital no se puede detener y renice negativo se rechaza', () => {
  const { run } = appContext();
  run('data.completed = [1, 2, 3, 4, 5, 6]; openMission(6)');
  play(run, ['top', 'kill 812']);
  assert.match(run('state.lines.at(-1).text'), /oxígeno/);
  play(run, ['renice -10 -p 812']);
  assert.match(run('state.lines.at(-1).text'), /más prioridad/);
  assert.equal(run('state.step'), 1);
  run('data.completed.push(7); openMission(7)');
  play(run, ['reparar-casco']);
  assert.match(run('state.lines.at(-1).text'), /Agregue &/);
  assert.equal(run('state.step'), 0);
});

test('el jefe del Mundo 2 acepta detener cualquiera de los dos robots', () => {
  const { app, run } = appContext();
  run('data.completed = [1, 2, 3, 4, 5, 6, 7, 8, 9]; openMission(9)');
  play(run, ['systemctl start motor-principal', 'ps -e', 'kill {pidA}']);
  assert.match(run('state.lines.at(-1).text'), /averigüe por qué/);
  play(run, ['cat /nave/robots.txt', 'kill {pidA}']);
  assert.equal(run('state.flags.killed'), 'robot-a');
  assert.match(run("state.lines.filter(l => l.kind === 'ubuntu').at(-1).text"), /robot-b la tomó/);
  play(run, ['systemctl start robot-a']);
  assert.match(run('state.lines.at(-1).text'), /Sin semáforo/);
  play(run, ['systemctl start semaforo-herramientas', 'systemctl start robot-a', 'systemctl start motor-principal']);
  assert.equal(run('data.completed.includes(10)'), true);
  assert.match(app.innerHTML, /\+200 XP/);
});

// Comandos que completan cada nivel del Mundo 3.
const world3 = [
  ['pwd', 'cd /estacion', 'ls', 'cd acceso', 'cat codigo.txt'],
  ['free -h', 'top', 'kill {pid}', 'free -h'],
  ['df -h', 'ls -lh /estacion/registros', 'rm /estacion/registros/registro_2019.log', 'df -h'],
  ['cd /estacion/acceso', './abrir-compuerta', 'ls -l', 'chmod +x abrir-compuerta', './abrir-compuerta'],
  ['free -h', 'top', 'kill {pid}', 'df -h', 'ls -lh /estacion/registros', 'rm /estacion/registros/respaldo_2020.log', 'cd /estacion/energia', './reiniciar-nucleo', 'chmod +x reiniciar-nucleo', './reiniciar-nucleo']
];

test('el Mundo 3 se completa y abre la barrera del Mundo 4', () => {
  const { app, run } = appContext();
  run('data.completed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; data.xp = {}');
  world3.forEach((commands, index) => {
    run(`openMission(${index + 10})`);
    assert.equal(run('state.screen'), 'mission', `nivel ${index + 11}`);
    play(run, commands);
    assert.equal(run(`data.completed.includes(${index + 11})`), true, `nivel ${index + 11}`);
  });
  assert.equal(run('state.flags.core'), 100);
  run("state.screen = 'map'; render()");
  assert.equal((app.innerHTML.match(/class="world-gate open"/g) || []).length, 3);
});

test('cd cambia la carpeta de la terminal y las rutas mal escritas se explican', () => {
  const { app, run } = appContext();
  run('data.completed = Array.from({ length: 10 }, (_, i) => i + 1); openMission(10)');
  play(run, ['pwd', 'cd estacion']);
  assert.match(run('state.lines.at(-1).text'), /empieza con \//);
  play(run, ['cd /estacion/']);
  assert.match(app.innerHTML, /@nave:\/estacion</);
  play(run, ['ls', 'cd ..']);
  assert.match(run('state.lines.at(-1).text'), /sube una carpeta/);
  assert.equal(run('state.step'), 3);
  play(run, ['sudo cd acceso']);
  assert.match(run('state.lines.at(-1).text'), /Root/);
});

test('rm no borra el registro actual y Permiso denegado avanza el paso', () => {
  const { run } = appContext();
  run('data.completed = Array.from({ length: 12 }, (_, i) => i + 1); openMission(12)');
  play(run, ['df -h', 'ls /estacion/registros']);
  assert.match(run('state.lines.at(-1).text'), /-lh/);
  play(run, ['ls -lh /estacion/registros', 'rm /estacion/registros/registro_2026.log']);
  assert.match(run('state.lines.at(-1).text'), /Negativo/);
  assert.equal(run('state.step'), 2);
  run('data.completed.push(13); openMission(13)');
  play(run, ['cd /estacion/acceso', 'abrir-compuerta']);
  assert.match(run('state.lines.at(-1).text'), /\.\/ antes/);
  play(run, ['./abrir-compuerta']);
  assert.equal(run("state.lines.at(-1).kind"), 'error');
  assert.match(run('state.lines.at(-1).text'), /Permiso denegado/);
  assert.equal(run('state.step'), 2);
  play(run, ['ls -l', 'chmod +x abrir-compuerta', 'ls -l']);
  assert.match(run('state.lines.at(-1).text'), /-rwxr-xr-x/, 'ls -l muestra la x después de chmod');
  assert.equal(run('state.step'), 4);
});

test('en el jefe del Mundo 3, el reinicio explica qué falla lo bloquea', () => {
  const { app, run } = appContext();
  run('data.completed = Array.from({ length: 14 }, (_, i) => i + 1); openMission(14)');
  play(run, ['./reiniciar-nucleo']);
  assert.match(run('state.lines.at(-1).text'), /memoria insuficiente/);
  play(run, ['free -h', 'top', 'kill {pid}', './reiniciar-nucleo']);
  assert.match(run('state.lines.at(-1).text'), /espacio en disco/);
  play(run, ['df -h', 'ls -lh /estacion/registros', 'rm /estacion/registros/respaldo_2020.log', 'cd /estacion/energia', './reiniciar-nucleo', 'chmod +x reiniciar-nucleo', './reiniciar-nucleo']);
  assert.equal(run('data.completed.includes(15)'), true);
  assert.match(app.innerHTML, /\+200 XP/);
});

test('el nombre de usuario se ajusta al formato de Linux y aparece en whoami', () => {
  const { app, run } = appContext();
  run("registerName('  David Torres ')");
  assert.equal(run('data.name'), 'david');
  assert.match(run('state.nameNote'), /ajustado al formato de usuario de Linux: david/);
  assert.equal(run("toUsername('Ángel')"), 'angel');
  assert.equal(run("toUsername('')"), 'explorador');
  run('openMission(0)');
  play(run, ['whoami']);
  assert.equal(run('state.lines[1].text'), 'david');
  assert.match(app.innerHTML, /david@nave/);
});

test('acepta variantes válidas y explica los errores comunes', () => {
  const { run } = appContext();
  run('openMission(0)');
  play(run, ['who am i']);
  assert.match(run('state.lines.at(-1).text'), /se escribe junto/);
  play(run, ['whoami', 'cat   /etc/os-release', 'uname']);
  assert.equal(run('state.step'), 3, 'uname sin -r también cuenta');
  assert.match(run("state.lines.find(l => l.kind === 'ubuntu').text"), /Con -r vería su versión/);

  run('data.completed = [1, 2]; openMission(2)');
  play(run, ['systemctl --failed', 'systemctl start propulsores']);
  assert.match(run('state.lines.at(-1).text'), /dependencia combustible/);
  assert.equal(run('state.step'), 1);
  play(run, ['systemctl status propulsores.service']);
  assert.equal(run('state.step'), 2, '.service al final también se acepta');
});

test('el nivel 4 rechaza los modos incorrectos y marca los archivos leídos', () => {
  const { app, run } = appContext();
  run('data.completed = [1, 2, 3]; openMission(3)');
  play(run, ['uptime', 'nproc', 'ls /sistemas/navegacion/', 'cat /sistemas/navegacion/por_lotes.txt', 'cat /sistemas/navegacion/tiempo_real.txt', 'systemctl start navegacion-por-lotes']);
  assert.match(run('state.lines.at(-1).text'), /Modo rechazado/);
  assert.equal(run('state.step'), 4);
  assert.equal(run('state.flags.readLotes && state.flags.readReal && state.flags.rejectLotes'), true);
  assert.match(app.innerHTML, /Rechazado/);
  play(run, ['systemctl start navegacion-tiempo-real']);
  assert.equal(run('data.completed.includes(4)'), true);
});

test('el jefe muestra el arranque, descuenta 50 XP por pista y despega', () => {
  const { app, run } = appContext();
  run('data.completed = [1, 2, 3, 4]; openMission(4)');
  play(run, ['systemctl reboot']);
  assert.equal(run('state.flags.boot'), 4);
  assert.equal(run('state.flags.bootFail'), true);
  assert.equal(run('state.step'), 1);
  play(run, ['systemctl start despegue']);
  assert.match(run('state.lines.at(-1).text'), /Despegue abortado/);
  run('state.hint = true; state.hintsUsed = 1');
  play(run, ['systemctl --failed', 'systemctl status escudo-termico', 'systemctl start escudo-termico']);
  assert.match(run('state.lines.at(-1).text'), /requiere sensor-termico/);
  play(run, ['systemctl start sensor-termico', 'systemctl start escudo-termico', 'systemctl start despegue']);
  assert.equal(run('state.flags.launch'), true);
  assert.equal(run('data.xp[5]'), 150);
  assert.match(app.innerHTML, /\+150 XP/);
});

test('un comando de un paso anterior se vuelve a ejecutar, también después de clear', () => {
  const { run } = appContext();
  run('data.completed = [1, 2, 3, 4]; openMission(4)');
  play(run, ['systemctl reboot', 'systemctl --failed', 'systemctl status escudo-termico', 'clear', 'systemctl status escudo-termico']);
  assert.equal(run('state.step'), 3);
  assert.match(run('state.lines.at(-1).text'), /Requiere: sensor-termico/);
  play(run, ['systemctl --failed']);
  assert.match(run('state.lines.at(-1).text'), /escudo-termico.service/);
  play(run, ['systemctl reboot']);
  assert.match(run('state.lines.at(-1).text'), /ya se completó/);
  assert.equal(run('state.step'), 3, 'repetir comandos no avanza ni retrocede');
});

test('la bitácora solo muestra los comandos ya aprendidos', () => {
  const { app, run } = appContext();
  run('openMission(0); state.showLog = true; render()');
  assert.match(app.innerHTML, /Todavía no hay comandos registrados/);
  play(run, ['whoami']);
  run('state.showLog = true; render()');
  assert.match(app.innerHTML, /<code>whoami<\/code><span class="log-new">Nuevo/);
  assert.doesNotMatch(app.innerHTML, /<code>lscpu<\/code>/);
});
