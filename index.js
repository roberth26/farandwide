import { relative, join } from 'path';
import { readFile } from 'fs/promises';
import express from 'express';
import useragent from 'express-useragent';
import hbs from 'handlebars';
import glob from 'glob';

hbs.registerHelper('match', function (path, exactOrOptions, maybeOptions) {
    const exact = exactOrOptions === undefined;
    const options =
        exactOrOptions === undefined ? maybeOptions : exactOrOptions;
    const currentPath = options.data.root.path;
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

const STATIC_PATH = '/static';

app.use(STATIC_PATH, express.static('static'));

// routes
pages.forEach(([path, template]) => {
    app.get(path, (req, res) => {
        res.send(
            template({
                path: req.path,
                static: STATIC_PATH,
                useragent: req.useragent,
                isMobile: req.useragent.isMobile,
            })
        );
    });
});

// redirects
app.get('/team/', function (req, res) {
    res.redirect('/team/rosanne');
});

const [, fourOFour] = pages.find(([path]) => path === '/404');

// 404
app.use(function (req, res) {
    res.status(404);
    res.send(fourOFour?.({ path: req.path }) || '404: Page Not Found');
});

app.listen(process.env.PORT);
