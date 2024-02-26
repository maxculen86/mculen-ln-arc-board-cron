class EventsHelper {
    constructor() {
        this.createDynamicLabel = (text = '') => {
            return text
                .toLowerCase()
                .replace(/ /g, '_')
                .replace(/á/g, 'a')
                .replace(/é/g, 'e')
                .replace(/í/g, 'i')
                .replace(/ó/g, 'o')
                .replace(/ú/g, 'u');
        };

        this.addEventToDataLayer = ({
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

        this.addEventListeners = (element, payload, callback) => {
            const CLICK = 'click';
            const AUX_CLICK = 'auxclick';
            const defaultCallback = () => {
                this.addEventToDataLayer(payload);
            };

            if (element) {
                element.addEventListener(CLICK, callback || defaultCallback);
                element.addEventListener(
                    AUX_CLICK,
                    callback || defaultCallback
                );
            }
        };

        this.getAnchorsFromGroup = roof => {
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

        this.getRoofTitle = container => {
            const logo = container.querySelector('.image');
            const title = container.querySelector('.--roof-title');

            return (logo && logo.alt) || (title && title.innerText);
        };
    }

    setEventsWeather() {
        const linkWeather = window.document.querySelector(
            '.link.ln-link.--weather'
        );

        const payload = {
            action: 'header_clima',
            label: 'clima'
        };

        this.addEventListeners(linkWeather, payload);
    }

    setEventsTopics() {
        const topics = window.document.querySelectorAll('.tag-list a');

        topics.forEach(topicElement => {
            const payload = {
                action: 'header_temas_hoy',
                label: this.createDynamicLabel(topicElement.title)
            };
            this.addEventListeners(topicElement, payload);
        });
    }

    setEventSubscribe() {
        const btnSuscribite = window.document.querySelector('#btnsuscribite');

        const payload = {
            action: 'header_logo',
            label: 'suscribite'
        };

        this.addEventListeners(btnSuscribite, payload);
    }

    setEventsDollar() {
        const dollars = window.document.querySelectorAll('.dollar a');

        dollars.forEach(dollar => {
            const payload = {
                action: 'header_dolar',
                label: this.createDynamicLabel(dollar.title)
            };
            this.addEventListeners(dollar, payload);
        });
    }

    setEventsFooter() {
        const linksFooter = window.document
            .querySelector('.ln-footer-home')
            .querySelectorAll('.text-start');

        linksFooter.forEach(link => {
            const payload = {
                action: 'footer',
                label: this.createDynamicLabel(link.text)
            };

            this.addEventListeners(link, payload);
        });
    }

    setEventsNavigationLinks() {
        const navigationLinks = document.querySelectorAll(
            '[roof-group="right"] > .link.ln-link.flex'
        );

        navigationLinks.forEach(link => {
            const roofTitle = this.getRoofTitle(link.parentNode.parentNode);

            const payload = {
                action: this.createDynamicLabel(`caja_${roofTitle}`),
                label: this.createDynamicLabel(`tag_${link.innerText}`)
            };

            this.addEventListeners(link, payload);
        });
    }

    setEventsRoof() {
        const roofs =
            document.querySelectorAll('[roof-container="roof-container"]') ||
            [];

        roofs.forEach(roof => {
            const {
                anchorLeft,
                actionLeft,
                anchorRight,
                actionRight
            } = this.getAnchorsFromGroup(roof);

            const roofTitle = this.getRoofTitle(roof);

            const addEventRoof = (elem, type, title) => {
                const elemChildren = elem.target.children;

                const description =
                    elem.target.innerText ||
                    elem.target.alt ||
                    (elemChildren[0] &&
                        (elemChildren[0].alt || elemChildren[0].innerHTML));

                const payload = {
                    action: this.createDynamicLabel(
                        `caja_${title || description}`
                    ),
                    label: this.createDynamicLabel(`${type}_${description}`)
                };

                this.addEventToDataLayer(payload);
            };

            if (anchorLeft) {
                this.addEventListeners(anchorLeft, null, elem =>
                    addEventRoof(elem, actionLeft)
                );
            }

            if (anchorRight) {
                this.addEventListeners(anchorRight, null, elem =>
                    addEventRoof(elem, actionRight, roofTitle)
                );
            }
        });
    }

    setEventsAccess() {
        const accesses = window.document.querySelectorAll('.access a');

        accesses.forEach(access => {
            const payload = {
                action: 'header_accesos',
                label: this.createDynamicLabel(access.text)
            };

            this.addEventListeners(access, payload);
        });
    }

    setEventSignIn() {
        const btnSignIn = window.document.querySelector(
            'button[title="Iniciar sesión"]'
        );

        const payload = {
            action: 'header_logo',
            label: 'iniciar_sesion'
        };

        this.addEventListeners(btnSignIn, payload);
    }

    setEventsSections() {
        const sections = window.document.querySelectorAll('.dd-link');

        sections.forEach(section => {
            const payload = {
                action: 'menu_secciones',
                label: this.createDynamicLabel(section.innerHTML)
            };

            this.addEventListeners(section, payload);
        });
    }

    setEventsGames() {
        const games = window.document.querySelectorAll('.ln-card-games > a');
        const ACTION = 'jugar';
        const JUEGOS_LN10 = 'juegos_ln10';
        games.forEach(game => {
            if (!game) return;
            const titleFormatted = this.createDynamicLabel(game.title);
            const payload = {
                action: ACTION,
                label: `${ACTION}_${titleFormatted}`,
                category: JUEGOS_LN10
            };

            this.addEventListeners(game, payload);
        });
    }
}

window.LN = {
    eventshelper: new EventsHelper()
};
