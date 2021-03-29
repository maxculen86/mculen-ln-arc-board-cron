import PropTypes from 'fusion:prop-types';

const CLASS_SCROLL_UP = '--scrollUp';
const CLASS_SCROLL_DOWN = '--scrollDown';

const isVisibleInViewport = element => {
    if (!element) return false;
    const bounds = element.getBoundingClientRect();
    return bounds && Math.abs(bounds.top) < bounds.height && bounds.bottom > 0;
};

const shouldRemoveClasses = (element, height) => {
    if (!element || !height) return false;
    const bounds = element.getBoundingClientRect();

    return (
        bounds &&
        Math.abs(bounds.top) >= bounds.height &&
        Math.abs(bounds.top) <= bounds.height + height
    );
};

export const onScroll = (megatopRef, wrapperRef, device) => {
    const { current: megatop } = megatopRef;
    const { current: wrapper } = wrapperRef;
    const { firstElementChild: header } = wrapper;
    const { classList: wrapperClassList } = wrapper;
    const { classList: headerClassList } = header;
    const { height: headerHeight } = header.getBoundingClientRect();

    if (isVisibleInViewport(megatop)) {
        if (headerClassList) {
            headerClassList.remove(CLASS_SCROLL_UP);
            headerClassList.remove(CLASS_SCROLL_DOWN);
        }
        if (device === 'desktop' && wrapperClassList) {
            wrapperClassList.remove(CLASS_SCROLL_UP);
            wrapperClassList.remove(CLASS_SCROLL_DOWN);
        }
        if (device === 'mobile') {
            const {
                classList: vShareClassList
            } = wrapper.getElementsByClassName('com-share')[0];
            vShareClassList.remove(CLASS_SCROLL_UP);
        }
    } else if (shouldRemoveClasses(megatop, headerHeight)) {
        if (headerClassList) {
            headerClassList.remove(CLASS_SCROLL_DOWN);
        }
        if (wrapperClassList && device === 'desktop') {
            wrapperClassList.remove(CLASS_SCROLL_DOWN);
        }
    }
};

onScroll.propTypes = {
    megatopRef: PropTypes.shape({
        current: PropTypes.node
    }).isRequerid,
    wrapperRef: PropTypes.shape({
        current: PropTypes.node
    }).isRequerid,
    device: PropTypes.string.isRequerid
};

export const onLoad = (megatopRef, callback) => {
    const { current: megatop } = megatopRef;

    return setTimeout(() => {
        if (isVisibleInViewport(megatop)) callback();
    }, 10000);
};

onLoad.propTypes = {
    megatopRef: PropTypes.shape({
        current: PropTypes.node
    }).isRequerid,
    callback: PropTypes.func.isRequerid
};

export const onClick = (windowRef, wrapperRef) => {
    const {
        current: { offsetTop }
    } = wrapperRef;
    const { current } = windowRef;
    current.scrollTo({ top: offsetTop, behavior: 'smooth' });
};

onClick.propTypes = {
    windowRef: PropTypes.shape({
        current: PropTypes.node
    }).isRequerid,
    wrapperRef: PropTypes.shape({
        current: PropTypes.node
    }).isRequerid
};

export const onMutation = (mutations, id, setShowMegatop) => {
    mutations.forEach((element, index) => {
        const {
            type,
            target: { parentElement, firstElementChild }
        } = element;
        const { id: parentElementId } = parentElement || null;
        const { tagName: firstChildTagName } = firstElementChild || null;
        // eliminar el IMG luego de la demo
        if (
            type === 'childList' &&
            parentElementId === id &&
            (firstChildTagName === 'IMG' || firstChildTagName === 'IFRAME')
        ) {
            setShowMegatop(true);
        }
    });
};

onMutation.propTypes = {
    mutations: PropTypes.shape({
        type: PropTypes.string,
        target: PropTypes.shape({
            parentElement: PropTypes.shape({
                id: PropTypes.string
            }),
            firstElementChild: PropTypes.shape({
                tagName: PropTypes.string
            })
        })
    }).isRequerid,
    id: PropTypes.string.isRequerid,
    setShowMegatop: PropTypes.func.isRequerid
};
