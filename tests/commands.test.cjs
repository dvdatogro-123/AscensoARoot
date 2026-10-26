const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

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
  const source = fs.readFileSync(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'app.js'), 'utf8');
  vm.runInContext(source, context);
  return { app, run: expression => vm.runInContext(expression, context) };
}

// Pasos de prueba con la misma forma que tendrán los niveles reales.
const sampleSteps = [
  { command: 'whoami', instruction: 'Identifícate.', hint: 'Escribe whoami.', output: 'explorador' },
  { command: 'uname -r', instruction: 'Consulta el kernel.', hint: 'Escribe uname -r.', output: '6.8.0-generic' }
];

test('hay 4 mundos de 5 niveles y todas las pantallas se muestran', () => {
  const { app, run } = appContext();
  assert.equal(run('missions.length'), 20);
  assert.equal(run('worlds.map(w => missions.filter(m => m.world === w.id).length).join()'), '5,5,5,5');
  for (const screen of ['cover', 'home', 'dashboard', 'afs', 'map', 'team', 'settings', 'credits']) {
    run(`state.screen = '${screen}'; render()`);
    assert.ok(app.innerHTML.length > 0, screen);
  }
  run("state.screen = 'dashboard'; render()");
  assert.match(app.innerHTML, /Nuevas misiones en camino/);
});

test('el mapa muestra los 4 mundos con su barrera y los niveles sin pasos como próximamente', () => {
  const { app, run } = appContext();
  run("state.screen = 'map'; render()");
  for (const theme of ['tierra', 'espacio', 'estacion', 'root']) assert.match(app.innerHTML, new RegExp(`world-${theme}`));
  assert.equal((app.innerHTML.match(/class="world-gate locked"/g) || []).length, 3);
  assert.match(app.innerHTML, /Destino final · Root/);
  assert.match(app.innerHTML, /Próximamente/);
  run('openMission(0)');
  assert.equal(run('state.screen'), 'map');
});

test('la barrera de un mundo se abre al completar sus 5 niveles', () => {
  const { app, run } = appContext();
  run("data.completed = [1, 2, 3, 4, 5]; state.screen = 'map'; render()");
  assert.equal((app.innerHTML.match(/class="world-gate open"/g) || []).length, 1);
  assert.match(app.innerHTML, /world world-espacio current/);
});

test('el motor completa un nivel paso a paso y guarda el progreso', () => {
  const { run } = appContext();
  run(`missions[0].steps = ${JSON.stringify(sampleSteps)}; openMission(0)`);
  assert.equal(run('state.screen'), 'mission');
  run("runCommand('ls')");
  assert.equal(run('state.step'), 0);
  run("runCommand('whoami')");
  assert.equal(run('state.step'), 1);
  run("runCommand('uname   -r')");
  assert.equal(run('state.step'), 2);
  assert.equal(run('data.completed.includes(1)'), true);
  assert.equal(run('pct()'), 5);
  run('openMission(1)');
  assert.equal(run('state.screen'), 'mission', 'el nivel 2 no tiene pasos, así que no se abre');
});
