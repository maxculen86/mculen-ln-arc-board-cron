export const OPTA_WIDGET_STYLESHEET_URL =
    'https://secure.widget.cloud.opta.net/v3/css/v3.all.opta-widgets.css';

const OPTA_WIDGET_STYLESHEET_ID = 'opta-widget-stylesheet';

export const injectOptaStylesheet = () => {
    if (
        document.getElementById(OPTA_WIDGET_STYLESHEET_ID) ||
        document.querySelector(`link[href="${OPTA_WIDGET_STYLESHEET_URL}"]`)
    ) {
        return;
    }

    const tag = document.createElement('link');
    tag.id = OPTA_WIDGET_STYLESHEET_ID;
    tag.rel = 'stylesheet';
    tag.href = OPTA_WIDGET_STYLESHEET_URL;
    document.head.appendChild(tag);
};

injectOptaStylesheet();

const { currentScript } = document;

// Acceder a los atributos data-*
const subscriptionId = currentScript.dataset.subscriptionid;
const { language, timezone } = currentScript.dataset;

const scriptContent = `
    var opta_settings = {
        subscription_id: '${subscriptionId}',
        language: '${language}',
        timezone: '${timezone}'
    };
`;

// Crear un nuevo script tag y agregar el contenido de la constante
const scriptTag = document.createElement('script');
scriptTag.textContent = scriptContent;
document.body.appendChild(scriptTag);

const script = document.createElement('script');
script.src = 'https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js';
script.async = true;
document.head.appendChild(script);
