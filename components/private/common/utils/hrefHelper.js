import Environment from 'fusion:environment';

const { IS_DEV, HOMEPAGE } =
    !Environment || !Environment.NODE_ENV
        ? {
              IS_DEV: window.document.location.host === 'localhost',
              HOMEPAGE: 'homepage'
          }
        : Environment;

const isOriginURL =
    IS_DEV === true || String(IS_DEV).toLocaleLowerCase() === 'true';

const RE_REMOVE_SLASH = /(^[/]+|[/]+$)/gi;

function createCorrectHref(href, arcSite, contextPath = '') {
    const contextPathBase = isOriginURL ? contextPath : '/';
    const pathBase =
        isOriginURL && (!href || href === '/')
            ? HOMEPAGE || 'homepage'
            : String(href);

    const url = [contextPathBase, pathBase]
        .filter(Boolean)
        .map(str => str.replace(RE_REMOVE_SLASH, ''))
        .join('/')
        .replace(RE_REMOVE_SLASH, '');

    return `/${url}${isOriginURL ? `?_website=${arcSite}` : ''}`;
}
export default { createCorrectHref };
