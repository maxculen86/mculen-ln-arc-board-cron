import dynamicallyLoadScript from '../../../../private/LN/common/utils/dynamicallyLoadScript';
import getViewport from '../../../../private/LN/common/utils/screenHelper';

export const embedIntersectionObserver = scripts => {
    const { device } = getViewport();

    const callback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scripts.forEach(src => {
                    dynamicallyLoadScript(src, 'head');
                });
                interSectionObserver.unobserve(entry.target);
            }
        });
    };

    const interSectionObserver = new IntersectionObserver(callback, {
        rootMargin:
            device === 'mobile' ? '0px 0px 200px 0px' : '0px 0px 100px 0px'
    });

    const target = document.querySelector('.cuerpo__nota');

    if (target && scripts.length > 0) interSectionObserver.observe(target);
};

export const takeEmbedScriptToDiffer = contentElements => {
    const scripts = {
        twitter: 'https://platform.twitter.com/widgets.js',
        tiktok: 'https://www.tiktok.com/embed.js'
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

export const transformEmbedScript = element => {
    const socialMedia = {
        twitter: el => {
            const transformedElement = { ...el };
            transformedElement.raw_oembed.html = el.raw_oembed.html.replace(
                '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
                ''
            );
            return transformedElement;
        },
        instagram: el => {
            const transformedElement = { ...el };
            transformedElement.raw_oembed.html = el.raw_oembed.html.replace(
                '<script async src="//platform.instagram.com/en_US/embeds.js"></script>',
                ''
            );
            return transformedElement;
        },
        tiktok: el => {
            const transformedElement = { ...el };
            transformedElement.raw_oembed.html = el.raw_oembed.html.replace(
                '<script async src="https://www.tiktok.com/embed.js"></script>',
                ''
            );
            return transformedElement;
        }
    };

    return socialMedia[element.subtype]
        ? socialMedia[element.subtype](element)
        : element;
};
