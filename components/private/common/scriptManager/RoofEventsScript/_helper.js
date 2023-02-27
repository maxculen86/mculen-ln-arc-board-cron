export const setHandleClick = (element, action, event) => {
    element &&
        element.addEventListener(event, elem => {
            const description = elem.target.innerHTML || elem.target.alt;
            window.dataLayer &&
                window.dataLayer.push({
                    event: 'e_linkclick',
                    dynamic_action: action,
                    dynamic_category: 'home_ln10',
                    dynamic_label: `label_${description}`
                });
        });
};

export const getAnchorsFromGroup = roof => {
    const groupRight = roof.querySelector(`[roof-group="right"]`);
    const groupLeft = roof.querySelector(`[roof-group="left"]`);
    const anchorRight = groupRight && groupRight.lastChild;
    const isAnchorLeft = groupLeft && groupLeft.tagName === 'A';

    const isButtonLink =
        anchorRight && anchorRight.getAttribute('class').includes('button');

    return {
        anchorLeft: isAnchorLeft && groupLeft,
        actionLeft: 'techo',
        anchorRight: isButtonLink && anchorRight,
        actionRight: 'techo_boton'
    };
};

export const setScriptRoof = () => {
    const roofs =
        document.querySelectorAll('[roof-container="roof-container"]') || [];

    roofs.forEach(roof => {
        const eventClick = 'click';
        const eventAuxClick = 'auxclick';
        const {
            anchorLeft,
            actionLeft,
            anchorRight,
            actionRight
        } = getAnchorsFromGroup(roof);

        if (anchorLeft) {
            setHandleClick(anchorLeft, actionLeft, eventClick);
            setHandleClick(anchorLeft, actionLeft, eventAuxClick);
        }

        if (anchorRight) {
            setHandleClick(anchorRight, actionRight, eventClick);
            setHandleClick(anchorRight, actionRight, eventAuxClick);
        }
    });
};
