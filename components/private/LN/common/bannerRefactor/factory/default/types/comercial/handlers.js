export const onLoad = (ref, callback) => {
    const { current } = ref;
    return setTimeout(() => {
        current && callback();
    }, 10000);
};

export const onMutation = (mutations, id, setShowElement) => {
    mutations.forEach((element, index) => {
        const {
            type,
            target: { parentElement, firstElementChild }
        } = element;
        const { id: parentElementId } = parentElement || null;
        const { tagName: firstChildTagName } = firstElementChild || null;
        if (
            type === 'childList' &&
            parentElementId === id &&
            firstChildTagName === 'IFRAME'
        ) {
            setShowElement(true);
        }
    });
};
