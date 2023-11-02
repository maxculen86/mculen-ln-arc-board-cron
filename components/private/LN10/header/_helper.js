import Scroll from '../../common/utils/scroll';

const CLASS_SCROLL_UP = '--scrollUp';
const CLASS_SCROLL_DOWN = '--scrollDown';
const CLASS_ACTIVE = '--active';
const CLASS_HANDLE_SHARE = '--handle-share';
let lastScrollPosition = 0;

export const setUserType = (isUserLoggedIn, isUserSubscribed) => {
    if (isUserSubscribed) return 'subscribed';
    if (isUserLoggedIn) return 'logged';
    return 'unlogged';
};

export const onScrollHandler = (
    header,
    height,
    userMenu,
    wrapper,
    layout,
    layoutsName
) => {
    const { isScrollUp, isScrollDown } = Scroll.getScrollDirection(
        lastScrollPosition
    );
    const scrollPos = window.scrollY;
    const { classList } = header;
    if (layout === layoutsName.FotoAl100) {
        const share = document.querySelector('.mod-share-container');
        const { 1: img } = Array.from(document.querySelectorAll('.com-image'));
        img.getBoundingClientRect().y < 0
            ? share.classList.add(CLASS_HANDLE_SHARE)
            : share.classList.remove(CLASS_HANDLE_SHARE);
    }
    if (userMenu) userMenu.classList.remove(CLASS_ACTIVE);
    if (scrollPos) {
        if (scrollPos > height) {
            if (wrapper) {
                wrapper.classList.add(CLASS_SCROLL_DOWN);
            }
        }
        if (isScrollUp) {
            classList.remove(CLASS_ACTIVE);

            if (wrapper) {
                wrapper.classList.remove(CLASS_SCROLL_DOWN);
                wrapper.classList.add(CLASS_SCROLL_UP);
            }
        } else {
            classList.remove(CLASS_ACTIVE);

            if (wrapper) {
                wrapper.classList.remove(CLASS_SCROLL_UP);
                wrapper.classList.add(CLASS_SCROLL_DOWN);
            }
        }
        if (scrollPos < 65) {
            classList.add(CLASS_ACTIVE);
        }
    }

    lastScrollPosition = scrollPos;

    return { isScrollDown, isScrollUp };
};

export const isHeaderNegative = ({
    layout = '',
    section = '',
    layoutsName = {}
}) => {
    const validationBy = [section, layout];

    const validations = [
        layoutsName.FotoAl100,
        layoutsName.StoryTelling,
        layoutsName.Video,
        '/revista-hola',
        '/revista-lugares'
    ];

    return validationBy.some(validation => validations.includes(validation));
};

export const createHeaderObserver = ({
    layout = '',
    section = '',
    layoutsName = [],
    unobserve = false,
    isHome = false
}) => {
    const isNegative = isHeaderNegative({
        layout,
        section,
        layoutsName
    });

    const callback = entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                isNegative && mainHeader.classList.remove('--negative');
                wrapperHome && wrapperHome.classList.add('--top-fixed');
                isHome && buttonText && buttonText.classList.add('none');
                isHome &&
                    stickyButtonText &&
                    stickyButtonText.classList.remove('none');
            } else {
                isNegative && mainHeader.classList.add('--negative');
                wrapperHome && wrapperHome.classList.remove('--top-fixed');
                isHome && buttonText && buttonText.classList.remove('none');
                isHome &&
                    stickyButtonText &&
                    stickyButtonText.classList.add('none');
            }
        });
    };

    const interSectionObserver = new IntersectionObserver(callback);
    const mainHeader = document.querySelector('.ln-main-header');
    const wrapperHome = document.querySelector('.wrapper.homepage');
    const headerSentinel = document.querySelector('.header-sentinel');
    const buttonText = document.querySelector('#button-text');
    const stickyButtonText = document.querySelector('#sticky-button-text');

    if (headerSentinel) interSectionObserver.observe(headerSentinel);
    if (unobserve) interSectionObserver.unobserve(headerSentinel);
};
