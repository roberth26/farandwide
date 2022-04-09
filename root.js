import { relative, join, resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';
import engine from 'express-engine-jsx';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const res = rel => resolve(__dirname, rel);

// find components
const componentPaths = await new Promise(resolve => {
  glob('./components/**/*.jsx', (_error, componentPaths) => {
    resolve(componentPaths);
  });
});

// TODO: comment
const components = Object.fromEntries(
  componentPaths.map(componentPath => {
    const componentRelPath = relative('./components/', componentPath).replace(
      '.jsx',
      ''
    );
    const componentName = basename(componentRelPath);
    const component = engine.require(
      `./${componentRelPath}`,
      resolve(__dirname, './components')
    ).default;
    return [componentName, component];
  })
);

// find pages
const pagePaths = await new Promise(resolve => {
  glob('./pages/**/*.jsx', (_error, pagePaths) => {
    resolve(pagePaths);
  });
});

// TODO: comment
const pages = Object.fromEntries(
  pagePaths.map(pagePath => {
    const pageRelPath = relative('./pages/', pagePath).replace('.jsx', '');
    const page = engine.require(
      `./${pageRelPath}`,
      resolve(__dirname, './pages')
    ).default;
    const route = join(
      '/',
      relative('./pages/', pageRelPath)
        .replace('index.jsx', '')
        .replace('.jsx', '')
    );
    return [route, page];
  })
);

console.log(pages);

console.log(engine(res('./home'), { locals: { ...components } }));
