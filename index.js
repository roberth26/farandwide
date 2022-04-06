import { relative, join } from 'path';
import { readFile } from 'fs/promises';
import express from 'express';
import useragent from 'express-useragent';
import hbs from 'handlebars';
import glob from 'glob';

const STATIC_PATH = '/static';

hbs.registerHelper('redirect', function (path, options) {
    const { response } = options.data.root;
    response.redirect(path);
    response.end();
});

hbs.registerHelper('match', function (path, exactOrOptions, maybeOptions) {
    const exact = exactOrOptions === undefined;
    const options =
        exactOrOptions === undefined ? maybeOptions : exactOrOptions;
    const currentPath = options.data.root.request.path;
    return exact ? path === currentPath : currentPath.startsWith(path);
});

hbs.registerHelper('join', function (...pathsAndOptions) {
    const [_options, ...paths] = pathsAndOptions.reverse();
    return join(...paths.reverse());
});

// find partials
const partialPaths = await new Promise(resolve => {
    glob('./partials/**/*.html', (_error, partialPaths) => {
        resolve(partialPaths);
    });
});

// load partials
await Promise.all(
    partialPaths.map(async partialPath => {
        const partialName = relative('./partials/', partialPath).replace(
            '.html',
            ''
        );
        const partialContent = await readFile(partialPath, {
            encoding: 'utf-8',
        });
        hbs.registerPartial(partialName, partialContent);
    })
);

// find templates
const templatePaths = await new Promise(resolve => {
    glob('./pages/**/*.html', (_error, templatePaths) => {
        resolve(templatePaths);
    });
});

// load templates
const pages = await Promise.all(
    templatePaths.map(async templatePath => {
        const pagePath = join(
            '/',
            relative('./pages/', templatePath)
                .replace('index.html', '')
                .replace('.html', '')
        );
        const templateContent = await readFile(templatePath, {
            encoding: 'utf-8',
        });
        const template = hbs.compile(templateContent);
        return [pagePath, template];
    })
);

const app = express();

app.use(useragent.express());
app.use(STATIC_PATH, express.static('static'));

// routes
pages.forEach(([path, template]) => {
    app.get(path, (request, response, next) => {
        const page = template({
            request,
            response,
            path: request.path,
            static: STATIC_PATH,
            isMobile: request.useragent.isMobile,
        });
        if (!response.headersSent) {
            response.send(page);
        }
    });
});

const [, fourOFour] = pages.find(([path]) => path === '/404');

// 404
app.use(function (request, response) {
    response.status(404);
    response.send(
        fourOFour?.({
            request,
            response,
            path: request.path,
            static: STATIC_PATH,
        }) || '404: Page Not Found'
    );
});

app.listen(process.env.PORT);
