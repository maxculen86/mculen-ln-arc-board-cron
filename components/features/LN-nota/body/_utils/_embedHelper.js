import dynamicallyLoadScript from '../../../../private/LN/common/utils/dynamicallyLoadScript';
import getViewport from '../../../../private/LN/common/utils/screenHelper';

/* global FB */

const FACEBOOK_APP_ID_FALLBACK = '246891475813003';
const FACEBOOK_META_SELECTOR = 'meta[property="fb:app_id"]';
const FACEBOOK_SDK_URL = 'connect.facebook.net/en_US/sdk.js';

const getFacebookAppId = () => {
    const metaAppId = document.querySelector(FACEBOOK_META_SELECTOR);
    return metaAppId
        ? metaAppId.getAttribute('content')
        : FACEBOOK_APP_ID_FALLBACK;
};

const initializeFacebookSDK = appId => {
    FB.init({
        appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v18.0'
    });

    setTimeout(() => {
        if (FB.XFBML && FB.XFBML.parse) {
            FB.XFBML.parse();
        }
    }, 100);
};

export const embedIntersectionObserver = (
    scripts,
    elementId = 'cuerpo__nota'
) => {
    const { device } = getViewport();

    const loadScriptWithInitialization = async src => {
        try {
            await dynamicallyLoadScript(src, 'head');

            if (src.includes(FACEBOOK_SDK_URL) && typeof FB !== 'undefined') {
                const appId = getFacebookAppId();
                initializeFacebookSDK(appId);
            }
        } catch (error) {
            console.error(`Error cargando script ${src}:`, error);
        }
    };

    const interSectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scripts.forEach(loadScriptWithInitialization);
                    interSectionObserver.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin:
                device === 'mobile' ? '0px 0px 200px 0px' : '0px 0px 100px 0px'
        }
    );

    const target = document.getElementById(elementId);

    if (target && scripts.length > 0) {
        interSectionObserver.observe(target);
    }
};

export const takeEmbedScriptToDiffer = contentElements => {
    const scripts = {
        twitter: 'https://platform.twitter.com/widgets.js',
        tiktok: 'https://www.tiktok.com/embed.js',
        instagram: 'https://www.instagram.com/embed.js',
        'facebook-post': 'https://connect.facebook.net/en_US/sdk.js',
        'facebook-video': 'https://connect.facebook.net/en_US/sdk.js'
    };
    const scriptsToDefer = [];

    contentElements
        .filter(element => element.type === 'oembed_response')
        .forEach(embed => {
            if (
                Object.keys(scripts).includes(embed.subtype) &&
                !scriptsToDefer.includes(scripts[embed.subtype])
            ) {
                scriptsToDefer.push(scripts[embed.subtype]);
            }
        });
    return scriptsToDefer;
};

export const removeScript = string => {
    const scriptStart = string.indexOf('<script');
    const scriptEnd = string.indexOf('</script>') + '</script>'.length;

    if (scriptStart !== -1 && scriptEnd !== -1) {
        const part1 = string.substring(0, scriptStart);
        const part2 = string.substring(scriptEnd);
        return part1 + part2;
    }

    return string;
};

export const transformEmbedScript = element => {
    const socialMedia = {
        'facebook-post': el => {
            const transformedElement = { ...el };
            transformedElement.raw_oembed.html = removeScript(
                el.raw_oembed.html
            );
            return transformedElement;
        },
        'facebook-video': el => {
            const transformedElement = { ...el };
            transformedElement.raw_oembed.html = removeScript(
                el.raw_oembed.html
            );
            return transformedElement;
        },
        twitter: el => {
            const transformedElement = { ...el };
            transformedElement.raw_oembed.html = removeScript(
                el.raw_oembed.html
            );
            return transformedElement;
        },
        instagram: el => {
            const transformedElement = { ...el };
            transformedElement.raw_oembed.html = removeScript(
                el.raw_oembed.html
            );
            return transformedElement;
        },
        tiktok: el => {
            const transformedElement = { ...el };
            transformedElement.raw_oembed.html = removeScript(
                el.raw_oembed.html
            );
            return transformedElement;
        }
    };

    return socialMedia[element.subtype]
        ? socialMedia[element.subtype](element)
        : element;
};
