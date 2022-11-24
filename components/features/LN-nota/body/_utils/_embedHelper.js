import dynamicallyLoadScript from '../../../../private/LN/common/utils/dynamicallyLoadScript';
import getViewport from '../../../../private/LN/common/utils/screenHelper';

export const embedIntersectionObserver = () => {
    const { device } = getViewport();

    const callback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                dynamicallyLoadScript(
                    'https://platform.twitter.com/widgets.js',
                    'head'
                );
                interSectionObserver.unobserve(entry.target);
            }
        });
    };

    const interSectionObserver = new IntersectionObserver(callback, {
        rootMargin:
            device === 'mobile' ? '0px 0px 200px 0px' : '0px 0px 100px 0px'
    });

    const target = document.querySelector('.cuerpo__nota');
    const hasTwitter = document.querySelector('.--twitter');

    if (target && hasTwitter) interSectionObserver.observe(target);
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
        }
    };

    return socialMedia[element.subtype]
        ? socialMedia[element.subtype](element)
        : element;
};
