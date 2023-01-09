import Scroll from '../../common/utils/scroll';

const CLASS_SCROLL_UP = '--scrollUp';
const CLASS_SCROLL_DOWN = '--scrollDown';
const CLASS_ACTIVE = '--active';
const CLASS_HANDLE_SHARE = '--handle-share';
let lastScrollPosition = 0;

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

export const toggleDesplegable = () => {
    document.body.classList.contains('dropdown')
        ? document.body.classList.remove('dropdown')
        : document.body.classList.add('dropdown');
};
