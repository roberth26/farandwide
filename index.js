import { relative, join, resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import useragent from 'express-useragent';
import glob from 'glob';
import engine from 'express-engine-jsx';

const STATIC_PATH = '/static';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const res = rel => resolve(__dirname, rel);

// find components
const componentPaths = await new Promise(resolve => {
  glob('./components/**/*.jsx', (_error, componentPaths) => {
    resolve(componentPaths);
  });
});

const components = Object.fromEntries(
  componentPaths.map(componentPath => {
    const componentRelPath = relative('./components/', componentPath).replace(
      '.jsx',
      ''
    );
    const componentName = basename(componentRelPath);
    const component = engine.require(
      `./${componentRelPath}`,
      res('./components')
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

const pages = Object.fromEntries(
  pagePaths.map(pagePath => {
    const pageRelPath = relative('./pages/', pagePath);
    // cache
    engine.require(`./${pageRelPath.replace('.jsx', '')}`, res('./pages'))
      .default;
    const pageAbsPath = res(pagePath);
    const route = join(
      '/',
      relative('./pages/', pageRelPath)
        .replace('index.jsx', '')
        .replace('.jsx', '')
    );
    return [route, pageAbsPath];
  })
);

const app = express();

app.use(useragent.express());
app.use(STATIC_PATH, express.static('static'));

const match = currentPath => (path, options) => {
  return options?.exact ? path === currentPath : currentPath.startsWith(path);
};

const redirect = (request, response) => path => {
  response.redirect(resolve(request.path, path));
};

const staticAsset = path => {
  return join(STATIC_PATH, path);
};

// routes
Object.entries(pages).forEach(([route, page]) => {
  app.get(route, (request, response) => {
    const html = engine(page, {
      locals: {
        request,
        response,
        join,
        staticAsset,
        match: match(route),
        path: request.path,
        staticPath: STATIC_PATH,
        isMobile: request.useragent.isMobile,
        redirect: redirect(request, response),
        ...components,
      },
    });
    if (!response.headersSent) {
      response.send(html);
    }
  });
});

const fourOFour = pages['/404'];

// 404
app.use(function (request, response) {
  response.status(404);
  response.send(
    fourOFour == null
      ? '404: Page Not Found'
      : engine(fourOFour, {
          locals: {
            request,
            response,
            join,
            staticAsset,
            match: match(request.path),
            path: request.path,
            staticPath: STATIC_PATH,
            isMobile: request.useragent.isMobile,
            redirect: redirect(request, response),
            ...components,
          },
        })
  );
});

app.listen(process.env.PORT);
