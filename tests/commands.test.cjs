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

test('las cinco misiones se completan con los comandos enseñados', () => {
  const { run } = appContext();
  const commands = [
    ['pwd'],
    ['ls', 'cd Documentos'],
    ['mkdir proyectos', 'touch notas.txt'],
    ['cp notas.txt copia.txt', 'mv copia.txt proyectos/'],
    ['sudo apt update']
  ];
  commands.forEach((missionCommands, index) => {
    run(`openMission(${index})`);
    missionCommands.forEach(command => run(`runCommand(${JSON.stringify(command)})`));
    assert.equal(run('state.step === missions[state.mission].steps.length'), true);
  });
  assert.equal(run('pct()'), 100);
  run("state.screen = 'map'; render()");
  assert.match(run('app.innerHTML'), /¡Ruta completada!/);
  assert.match(run('app.innerHTML'), /Repetir última misión/);
});

test('la misión 4 acepta nombres de copia y rutas de destino válidas', () => {
  for (const destination of ['proyectos', 'proyectos/', './proyectos', 'proyectos/respaldo.txt']) {
    const { run } = appContext();
    run('data.completed = [1, 2, 3]; openMission(3)');
    run("runCommand('cp notas.txt copias.txt')");
    assert.equal(run('state.copyName'), 'copias.txt');
    assert.match(run('app.innerHTML'), /Mueve copias.txt a la carpeta proyectos/);
    run(`runCommand(${JSON.stringify(`mv copias.txt ${destination}`)})`);
    assert.equal(run('data.completed.includes(4)'), true, destination);
  }
});

test('la misión 4 explica los errores que aparecieron en la grabación', () => {
  const { run } = appContext();
  run('data.completed = [1, 2, 3]; openMission(3)');
  run("runCommand('mv notas.txt copias.txt')");
  assert.match(run('state.lines.at(-1).text'), /Primero crea una copia con cp/);
  run("runCommand('cp notas.txt copia.txt')");
  run("runCommand('mv copia.txt proyecto/')");
  assert.match(run('state.lines.at(-1).text'), /con s/);
  assert.equal(run('state.step'), 1);
  run("runCommand('mv copia.txt proyectos')");
  assert.equal(run('state.step'), 2);
});

test('no da por bueno mover el original ni una ruta fuera de proyectos', () => {
  const { run } = appContext();
  run('data.completed = [1, 2, 3]; openMission(3)');
  run("runCommand('cp notas.txt copia.txt')");
  for (const command of ['mv notas.txt proyectos', 'mv copia.txt proyecto', 'mv copia.txt proyectos/..']) {
    run(`runCommand(${JSON.stringify(command)})`);
    assert.equal(run('state.step'), 1, command);
  }
});
