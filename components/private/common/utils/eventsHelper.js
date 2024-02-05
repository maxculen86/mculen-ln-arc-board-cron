//TODO: DELETE FUNCTIONS NOT USED IN SCRIPTS FROM THIS FILE
export const addEventToDataLayer = ({
    label,
    action,
    category,
    event
} = {}) => {
    const HOME_LN10 = 'home_ln10';
    const E_LINK_CLICK = 'e_linkclick';

    window.dataLayer &&
        window.dataLayer.push({
            event: event || E_LINK_CLICK,
            dynamic_category: category || HOME_LN10,
            dynamic_action: action,
            dynamic_label: label
        });
};

export const addEventListeners = (element, payload, callback) => {
    const CLICK = 'click';
    const AUX_CLICK = 'auxclick';
    const defaultCallback = () => addEventToDataLayer(payload);

    if (element) {
        element.addEventListener(CLICK, callback || defaultCallback);
        element.addEventListener(AUX_CLICK, callback || defaultCallback);
    }
};

export const createDynamicLabel = (text = '') => {
    return text
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u');
};

export const setEventsFooter = () => {
    const linksFooter = window.document
        .querySelector('.ln-footer-home')
        .querySelectorAll('.text-start');

    linksFooter.forEach(link => {
        const payload = {
            action: 'footer',
            label: createDynamicLabel(link.text)
        };
        addEventListeners(link, payload);
    });
};

export const setEventSubscribe = () => {
    const btnSuscribite = window.document.querySelector('#btnsuscribite');

    const payload = {
        action: 'header_logo',
        label: 'suscribite'
    };

    addEventListeners(btnSuscribite, payload);
};

export const setEventSignIn = () => {
    const btnSignIn = window.document.querySelector(
        'button[title="Iniciar sesión"]'
    );

    const payload = {
        action: 'header_logo',
        label: 'iniciar_sesion'
    };

    addEventListeners(btnSignIn, payload);
};

export const setEventsSections = () => {
    const sections = window.document.querySelectorAll('.dd-link');

    sections.forEach(section => {
        const payload = {
            action: 'menu_secciones',
            label: createDynamicLabel(section.innerHTML)
        };

        addEventListeners(section, payload);
    });
};

export const setEventSearch = () => {
    const searchIcon = window.document.querySelector('#querylyButton');

    const payload = {
        action: 'header_logo',
        label: 'buscar'
    };

    addEventListeners(searchIcon, payload);
};

export const setEventsWeather = () => {
    const linkWeather = window.document.querySelector(
        '.link.ln-link.--weather'
    );

    const payload = {
        action: 'header_clima',
        label: 'clima'
    };

    addEventListeners(linkWeather, payload);
};

export const setEventsTopics = () => {
    const topics = window.document.querySelectorAll('.tag-list a');

    topics.forEach(topicElement => {
        const payload = {
            action: 'header_temas_hoy',
            label: createDynamicLabel(topicElement.title)
        };

        addEventListeners(topicElement, payload);
    });
};

export const setEventsDollar = () => {
    const dollars = window.document.querySelectorAll('.dollar a');

    dollars.forEach(dollar => {
        const payload = {
            action: 'header_dolar',
            label: createDynamicLabel(dollar.title)
        };

        addEventListeners(dollar, payload);
    });
};

export const setEventsAccess = () => {
    const accesses = window.document.querySelectorAll('.access a');

    accesses.forEach(access => {
        const payload = {
            action: 'header_accesos',
            label: createDynamicLabel(access.text)
        };

        addEventListeners(access, payload);
    });
};

export const getAnchorsFromGroup = roof => {
    const groupRight = roof.querySelector('[roof-group="right"]');
    const groupLeft = roof.querySelector('[roof-group="left"]');
    const anchorRight = groupRight && groupRight.lastChild;
    const isAnchorLeft = groupLeft && groupLeft.tagName === 'A';

    const isButtonLink =
        anchorRight &&
        anchorRight.getAttribute &&
        anchorRight.getAttribute('class').includes('button');

    return {
        anchorLeft: isAnchorLeft && groupLeft,
        actionLeft: 'techo',
        anchorRight: isButtonLink && anchorRight,
        actionRight: 'cta'
    };
};

export const getRoofTitle = container => {
    const logo = container.querySelector('.image');
    const title = container.querySelector('.--roof-title');

    return (logo && logo.alt) || (title && title.innerText);
};

export const setEventsNavigationLinks = () => {
    const navigationLinks = document.querySelectorAll(
        '[roof-group="right"] > .link.ln-link.flex'
    );

    navigationLinks.forEach(link => {
        const roofTitle = getRoofTitle(link.parentNode.parentNode);

        const payload = {
            action: createDynamicLabel(`caja_${roofTitle}`),
            label: createDynamicLabel(`tag_${link.innerText}`)
        };

        addEventListeners(link, payload);
    });
};

export const setEventsRoof = () => {
    const roofs =
        document.querySelectorAll('[roof-container="roof-container"]') || [];

    roofs.forEach(roof => {
        const {
            anchorLeft,
            actionLeft,
            anchorRight,
            actionRight
        } = getAnchorsFromGroup(roof);

        const roofTitle = getRoofTitle(roof);

        const addEventRoof = (elem, type, title) => {
            const elemChildren = elem.target.children;

            const description =
                elem.target.innerText ||
                elem.target.alt ||
                (elemChildren[0] &&
                    (elemChildren[0].alt || elemChildren[0].innerHTML));

            const payload = {
                action: createDynamicLabel(`caja_${title || description}`),
                label: createDynamicLabel(`${type}_${description}`)
            };

            addEventToDataLayer(payload);
        };

        if (anchorLeft) {
            addEventListeners(anchorLeft, null, elem =>
                addEventRoof(elem, actionLeft)
            );
        }

        if (anchorRight) {
            addEventListeners(anchorRight, null, elem =>
                addEventRoof(elem, actionRight, roofTitle)
            );
        }
    });
};
