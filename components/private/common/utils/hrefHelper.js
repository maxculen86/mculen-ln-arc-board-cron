import Environment from 'fusion:environment';
import addForwardSlash from '../../LN/common/utils/addForwardSlash';

const isTrue = env =>
    env === true || String(env).toLocaleLowerCase() === 'true';

const getEnvFromDomain = w =>
    w && w.document.location.hostname.split('.').shift();

const { IS_DEV, IS_SANDBOX, HOMEPAGE } =
    !Environment || !Environment.NODE_ENV
        ? {
              IS_DEV:
                  getEnvFromDomain(
                      typeof window === 'undefined' ? false : window
                  ) === 'localhost',
              IS_SANDBOX:
                  getEnvFromDomain(
                      typeof window === 'undefined' ? false : window
                  ) === 'sandbox',
              HOMEPAGE: 'homepage'
          }
        : Environment;

const isOriginURL = isTrue(IS_DEV) || isTrue(IS_SANDBOX);

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

    return `/${addForwardSlash(url)}${
        isOriginURL ? `?_website=${arcSite}` : ''
    }`;
}
export default { createCorrectHref };
