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
function play(run, commands) {
  for (const command of commands) run(`runCommand(${JSON.stringify(command)})`);
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
  assert.equal(run('state.screen'), 'map', 'el Mundo 2 todavía no tiene niveles');
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
