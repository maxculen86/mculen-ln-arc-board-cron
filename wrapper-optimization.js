// wrapper-optimization.js - Dependencias grandes para optimización (versión optimizada)
module.exports = {
    // === DEPENDENCIAS GRANDES ESPECÍFICAS (que realmente usamos) ===

    // Lodash - 5MB (la más grande, muy utilizada)
    lodash: require('lodash'),

    // Node-fetch - 584KB (utilidades de red)
    'node-fetch': require('node-fetch'),

    // HTML React Parser - 524KB (parsing HTML)
    'html-react-parser': require('html-react-parser'),

    // === PAQUETES @LN MÁS GRANDES Y UTILIZADOS ===

    // User client libs - 2.1MB (el @ln más grande)
    '@ln/user.client.libs': require('@ln/user.client.libs'),

    // Librerías de funcionalidad específicas
    '@ln/lib-newsletter': require('@ln/lib-newsletter'),
    '@ln/lib-personalizacion': require('@ln/lib-personalizacion'),

    // UI Components más utilizados y grandes - Common - Contenidos - Foodit
    '@ln/common-ui-accordion': require('@ln/common-ui-accordion'),
    '@ln/common-ui-adaptableimage': require('@ln/common-ui-adaptableimage'),
    '@ln/common-ui-dialog': require('@ln/common-ui-dialog'),
    '@ln/common-ui-drawer': require('@ln/common-ui-drawer'),
    '@ln/common-ui-dropdown': require('@ln/common-ui-dropdown'),
    '@ln/common-ui-icon': require('@ln/common-ui-icon'),
    '@ln/common-ui-media': require('@ln/common-ui-media'),
    '@ln/common-ui-mediascroller': require('@ln/common-ui-mediascroller'),
    '@ln/common-ui-skeleton': require('@ln/common-ui-skeleton'),
    '@ln/common-ui-text': require('@ln/common-ui-text'),
    '@ln/common-ui-tooltip': require('@ln/common-ui-tooltip'),
    '@ln/cva': require('@ln/cva'),

    '@ln/contenidos-ui-bngrid': require('@ln/contenidos-ui-bngrid'),
    '@ln/contenidos-ui-badge': require('@ln/contenidos-ui-badge'),
    '@ln/contenidos-ui-button': require('@ln/contenidos-ui-button'),
    '@ln/contenidos-ui-card': require('@ln/contenidos-ui-card'),
    '@ln/contenidos-ui-dropdown': require('@ln/contenidos-ui-dropdown'),
    '@ln/contenidos-ui-live': require('@ln/contenidos-ui-live'),
    '@ln/contenidos-ui-link': require('@ln/contenidos-ui-link'),
    '@ln/contenidos-ui-roof': require('@ln/contenidos-ui-roof'),
    '@ln/contenidos-ui-text': require('@ln/contenidos-ui-text'),
    '@ln/contenidos-ui-timeline': require('@ln/contenidos-ui-timeline'),

    '@ln/foodit-ui-button': require('@ln/foodit-ui-button'),
    '@ln/foodit-ui-card': require('@ln/foodit-ui-card'),
    '@ln/foodit-ui-itemcard': require('@ln/foodit-ui-itemcard'),
    '@ln/foodit-ui-link': require('@ln/foodit-ui-link'),

    // SASS y estilos (solo si se usan en JS)
    '@ln/contenidos-ui-sass': require('@ln/contenidos-ui-sass'),

    // Hooks y utilidades frecuentes
    '@ln/hooks': require('@ln/hooks'),
    '@ln/ds-core-hooks': require('@ln/ds-core-hooks'),
    '@ln/ds-common-mediascroller': require('@ln/ds-common-mediascroller'),
    '@ln/ds-cva': require('@ln/cva'),

    // === UTILIDADES MENORES ===
    'request-promise-native': require('request-promise-native'),
    slugify: require('slugify'),
    'pym.js': require('pym.js'),
    thumbor: require('thumbor'),
    classnames: require('classnames')

    // NOTA: Eliminamos core-js y react-dom porque son externals
    // y causaban bundle bloat innecesario
};
