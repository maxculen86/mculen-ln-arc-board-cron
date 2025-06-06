const hideParentNode = (nodeRef, tagToHide = 'LI', isNodeHtml = false) => {
    if (nodeRef?.current) {
        const parent = nodeRef.current.parentElement;
        if (parent && parent.tagName === tagToHide) {
            parent.style.display = 'none';
        }
    } else if (isNodeHtml) {
        const parent = nodeRef;
        parent.style.display = 'none';
    }
};

export default hideParentNode;
