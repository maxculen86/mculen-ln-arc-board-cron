const path = require('path');

const URL_BASE = '/pf';
const DIRNAME_SOURCE = 'src/statics';
const DIRNAME_PUBLIC = 'resources/dist';
const DIRNAME_PRIVATE = 'resources/dist';

const DIRNAME_JS = 'js';
const DIRNAME_CSS = 'css';
const DIRNAME_FONTS = 'fonts';
const DIRNAME_IMAGES = 'images';

const ROOT = path.resolve(__dirname, '..');
const getRelativePath = (...pathSegments) =>
    path.relative(
        path.resolve(ROOT, DIRNAME_PUBLIC),
        path.resolve(ROOT, ...pathSegments)
    );
const getRelativeURL = (urlpath, urlBase = URL_BASE) =>
    `${urlBase}${path.resolve(DIRNAME_PUBLIC, urlpath).replace(ROOT, '')}`;

const paths = {};

paths.sourcePath = {
    base: path.resolve(ROOT, DIRNAME_SOURCE)
};
paths.outputPath = {
    base: path.resolve(ROOT, DIRNAME_PUBLIC)
};
paths.urlPath = {
    base: `${URL_BASE}${paths.outputPath.base.replace(ROOT, '')}`
};

// Privados
paths.outputPath.css = getRelativePath(DIRNAME_PRIVATE, DIRNAME_CSS);
paths.outputPath.javascript = getRelativePath(DIRNAME_PRIVATE, DIRNAME_JS);

// Publicos
paths.outputPath.fonts = getRelativePath(DIRNAME_PUBLIC, DIRNAME_FONTS);
paths.outputPath.images = getRelativePath(DIRNAME_PUBLIC, DIRNAME_IMAGES);

paths.urlPath.fonts = getRelativeURL(paths.outputPath.fonts);
paths.urlPath.images = getRelativeURL(paths.outputPath.images);
paths.urlPath.css = getRelativeURL(paths.outputPath.css);
paths.urlPath.javascript = getRelativeURL(paths.outputPath.javascript);

module.exports = paths;

// TODO: Hacer compatible con Windows. Los paths no contemplan SEP.
