import path from 'path';
import { fileURLToPath } from 'url';
import engine from 'express-engine-jsx';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const resolve = rel => path.resolve(__dirname, rel);

const Layout = engine.require('./Layout', __dirname).default;

console.log(engine(resolve('./home'), { Layout }));
