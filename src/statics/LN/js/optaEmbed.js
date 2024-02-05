window.onload = function() {
    let tag = document.createElement('link');
    tag.rel = 'stylesheet';
    tag.href =
        'https://secure.widget.cloud.opta.net/v3/css/v3.all.opta-widgets.css';
    document.head.appendChild(tag);
};

var currentScript = document.currentScript;

// Acceder a los atributos data-*
var subscriptionId = currentScript.dataset.subscriptionid;
var language = currentScript.dataset.language;
var timezone = currentScript.dataset.timezone;

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

var script = document.createElement('script');
script.src = 'https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js';
script.async = true;
document.head.appendChild(script);
