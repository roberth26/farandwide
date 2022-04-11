import { fork } from 'child_process';
import watch from 'node-watch';
import open from 'open';

process.env['PORT'] = 3000;

let childProcess;

function run() {
  childProcess?.kill();
  childProcess = fork('index.js');
}

watch('pages', { encoding: 'utf-8', recursive: true }, run);
watch('components', { encoding: 'utf-8', recursive: true }, run);
watch('static', { recursive: true }, run);

// init
run();

open(`http://localhost:${process.env.PORT}`);
