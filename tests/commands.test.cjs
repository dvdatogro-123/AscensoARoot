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

// Nivel de prueba con la misma forma que tendrán los niveles reales.
const sampleLevel = {
  id: 1, title: 'Nivel de prueba', commands: 'whoami', icon: '›', objective: 'Objetivo', lesson: 'Lección',
  steps: [
    { command: 'whoami', instruction: 'Identifícate.', hint: 'Escribe whoami.', output: 'explorador' },
    { command: 'uname -r', instruction: 'Consulta el kernel.', hint: 'Escribe uname -r.', output: '6.8.0-generic' }
  ],
  ending: 'Fin'
};

test('sin niveles, todas las pantallas se muestran sin errores', () => {
  const { app, run } = appContext();
  for (const screen of ['cover', 'home', 'dashboard', 'afs', 'map', 'team', 'settings', 'credits']) {
    run(`state.screen = '${screen}'; render()`);
    assert.ok(app.innerHTML.length > 0, screen);
  }
  assert.equal(run('pct()'), 0);
  run("state.screen = 'map'; render()");
  assert.match(app.innerHTML, /En construcción/);
  run("state.screen = 'dashboard'; render()");
  assert.match(app.innerHTML, /Nuevas misiones en camino/);
});

test('el motor completa un nivel paso a paso y guarda el progreso', () => {
  const { run } = appContext();
  run(`missions.push(${JSON.stringify(sampleLevel)}); openMission(0)`);
  run("runCommand('ls')");
  assert.equal(run('state.step'), 0);
  run("runCommand('whoami')");
  assert.equal(run('state.step'), 1);
  run("runCommand('uname   -r')");
  assert.equal(run('state.step'), 2);
  assert.equal(run('data.completed.includes(1)'), true);
  assert.equal(run('pct()'), 100);
});
