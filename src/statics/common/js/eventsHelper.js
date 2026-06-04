import { addEventToDataLayerV2 } from '../../../../components/private/LN/common/utils/addEventToDataLayer';

// TODO: Ver posibilidad de testear EventsHelper
export class EventsHelper {
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

            addEventToDataLayerV2({
                event: event || E_LINK_CLICK,
                category: category || HOME_LN10,
                action,
                label
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
                action: 'temas_hoy',
                label: this.createDynamicLabel(topicElement.title)
            };
            this.addEventListeners(topicElement, payload);
        });
    }

    setEventsBrands() {
        const brands = window.document.querySelectorAll('.brands-list a');

        brands.forEach(brandElement => {
            const payload = {
                action: 'header_marcas',
                label: this.createDynamicLabel(brandElement.title)
            };
            this.addEventListeners(brandElement, payload);
        });
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
            const { anchorLeft, actionLeft, anchorRight, actionRight } =
                this.getAnchorsFromGroup(roof);

            const roofTitle = this.getRoofTitle(roof);

            const addEventRoof = (elem, type, title) => {
                // El listener se ata al ancla, pero al clickear el logo
                // elem.target es la imagen interna (sin href ni texto). Usamos
                // el ancla (currentTarget) para resolver href y descripcion.
                const anchor =
                    elem.currentTarget ||
                    (elem.target.closest && elem.target.closest('a')) ||
                    elem.target;
                const elemChildren = anchor.children;
                const elemParent = anchor.parentElement;

                const findAltInChildren = children => {
                    for (const child of children) {
                        if (child.alt) return child.alt;
                        if (child.children && child.children.length) {
                            const found = findAltInChildren(child.children);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                const href = anchor.getAttribute('href') || '';
                const sectionFromHref =
                    href.split('/').filter(Boolean).pop() || '';

                const description =
                    anchor.innerText ||
                    anchor.alt ||
                    (elemParent && elemParent.getAttribute('data-icon')) ||
                    findAltInChildren(elemChildren) ||
                    (elemChildren[0] && elemChildren[0].textContent) ||
                    sectionFromHref ||
                    title ||
                    '';

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
                    addEventRoof(elem, actionLeft, roofTitle)
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
        const sections = document.querySelectorAll('.dd-link');

        sections.forEach(section => {
            let nameSectionHTML = Array.from(section.childNodes)
                .filter(
                    node =>
                        node.nodeType === Node.TEXT_NODE ||
                        node.tagName !== 'SPAN'
                )
                .map(node => node.textContent.trim())
                .join(' ');

            if (nameSectionHTML.includes('flex')) {
                const nameSectionNode = section.querySelector(
                    '.flex > div:last-child'
                );
                nameSectionHTML = nameSectionNode
                    ? nameSectionNode.textContent.trim()
                    : '';
            }

            const payload = {
                action: 'menu_secciones',
                label: this.createDynamicLabel(nameSectionHTML)
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

    setEventsVideoPodcast() {
        const podcasts = window.document.querySelectorAll(
            '[data-videopodcast-link="true"]'
        );
        const ACTION = 'escuchar';
        const VIDEOPODCAST = 'podcast_ln10';
        podcasts.forEach(podcast => {
            if (!podcast) return;
            const titleFormatted = this.createDynamicLabel(podcast.title);
            const payload = {
                action: ACTION,
                label: `${ACTION}_${titleFormatted}`,
                category: VIDEOPODCAST
            };

            this.addEventListeners(podcast, payload);
        });
    }

    setEventsFoodit() {
        const buttonFooditGrid = document.getElementById('btn-foodit-grid');
        const ACTION = 'caja_foodit';
        const HOME_LN10 = 'home_ln10';
        const SUSCRIBE_FOODIT = 'cta_suscribite_a_foodit';

        if (buttonFooditGrid) {
            const payload = {
                action: ACTION,
                label: `${SUSCRIBE_FOODIT}`,
                category: HOME_LN10
            };
            this.addEventListeners(buttonFooditGrid, payload);
        }
    }
}

const handler = {
    construct(target, args) {
        const instance = new target(...args);

        // Crear un proxy para interceptar llamadas a métodos
        return new Proxy(instance, {
            get: function (target, property, receiver) {
                const origMethod = target[property];
                if (typeof origMethod === 'function') {
                    return function (...args) {
                        setTimeout(() => origMethod.apply(target, args), 0);
                    };
                }
                return Reflect.get(target, property, receiver);
            }
        });
    }
};

const ProxiedEventsHelper = new Proxy(EventsHelper, handler);

window.LN = {
    eventshelper: new ProxiedEventsHelper()
};
