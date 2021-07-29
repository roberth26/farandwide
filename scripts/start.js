import { fork } from 'child_process';
import { watch } from 'fs';
import open from 'open';

process.env['PORT'] = 3000;

let childProcess;

function run() {
    childProcess?.kill();
    childProcess = fork('index.js');
}

watch('pages', { encoding: 'utf-8' }, run);
watch('partials', { encoding: 'utf-8' }, run);
watch('static', {}, run);

// init
run();

open(`http://localhost:${process.env.PORT}`);
