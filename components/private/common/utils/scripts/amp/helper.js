import scriptVideoValidator from '../../../scriptManager/scriptVideoValidator';
import ampCarouselValidation from './ampCarouselValidation';

export const customElements = {
    'amp-sidebar': {
        customElement: 'amp-sidebar',
        src: 'https://cdn.ampproject.org/v0/amp-sidebar-0.1.js'
    },
    'amp-carousel': {
        customElement: 'amp-carousel',
        src: 'https://cdn.ampproject.org/v0/amp-carousel-0.1.js',
        validateInclusion: globalContent => ampCarouselValidation(globalContent)
    },
    'amp-iframe': {
        customElement: 'amp-iframe',
        src: 'https://cdn.ampproject.org/v0/amp-iframe-0.1.js'
    },
    'amp-accordion': {
        customElement: 'amp-accordion',
        src: 'https://cdn.ampproject.org/v0/amp-accordion-0.1.js'
    },
    'amp-analytics': {
        customElement: 'amp-analytics',
        src: 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js'
    },
    'amp-sticky-ad': {
        customElement: 'amp-sticky-ad',
        src: 'https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js'
    },
    'amp-ad': {
        customElement: 'amp-ad',
        src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js'
    },
    'amp-social-share': {
        customElement: 'amp-social-share',
        src: 'https://cdn.ampproject.org/v0/amp-social-share-0.1.js'
    },
    'amp-ima-video': {
        customElement: 'amp-ima-video',
        src: 'https://cdn.ampproject.org/v0/amp-ima-video-0.1.js',
        validateInclusion: globalContent => scriptVideoValidator(globalContent)
    }
};

export const embedElements = {
    'amp-youtube': {
        customElement: 'amp-youtube',
        src: 'https://cdn.ampproject.org/v0/amp-youtube-0.1.js'
    },
    'amp-twitter': {
        customElement: 'amp-twitter',
        src: 'https://cdn.ampproject.org/v0/amp-twitter-0.1.js'
    },
    'amp-instagram': {
        customElement: 'amp-instagram',
        src: 'https://cdn.ampproject.org/v0/amp-instagram-0.1.js'
    },
    'amp-facebook': {
        customElement: 'amp-facebook',
        src: 'https://cdn.ampproject.org/v0/amp-facebook-0.1.js'
    },
    'amp-vimeo': {
        customElement: 'amp-vimeo',
        src: 'https://cdn.ampproject.org/v0/amp-vimeo-0.1.js'
    },
    'amp-dailymotion': {
        customElement: 'amp-dailymotion',
        src: 'https://cdn.ampproject.org/v0/amp-dailymotion-0.1.js'
    },
    'amp-vine': {
        customElement: 'amp-vine',
        src: 'https://cdn.ampproject.org/v0/amp-vine-0.1.js'
    }
    // 'amp-tiktok': {
    //     customElement: 'amp-tiktok',
    //     src: 'https://cdn.ampproject.org/v0/amp-tiktok-0.1.js'
    // }
};

export const elementForNote = [
    'amp-accordion',
    'amp-sidebar',
    'amp-ad',
    'amp-sticky-ad',
    'amp-carousel',
    'amp-iframe',
    'amp-analytics',
    'amp-social-share',
    'amp-ima-video'
];

export const embedsForNote = [
    'amp-youtube',
    'amp-twitter',
    'amp-instagram',
    'amp-facebook',
    'amp-vimeo',
    'amp-dailymotion',
    'amp-vine'
    // 'amp-tiktok'
];
const customElementForNote = elementForNote.map(elem => customElements[elem]);

export const styleConfig = {
    OTT: {},
    'la-nacion-ar': {
        'LN-nota-foto-al-100': 'resources/dist/css/ln/amp/amp-foto100.css',
        'LN-nota-infografia': 'resources/dist/css/ln/amp/amp-infografia.css',
        'LN-nota-noticia': 'resources/dist/css/ln/amp/amp-noticia.css',
        'LN-nota-receta': 'resources/dist/css/ln/amp/amp-receta.css',
        'LN-nota-storytelling':
            'resources/dist/css/ln/amp/amp-storytelling.css',
        'LN-acumulado': 'resources/dist/css/ln/amp/amp-acumulado.css',
        'LN-nota-video': 'resources/dist/css/ln/amp/amp-video.css',
        Error: 'resources/dist/css/ln/amp/amp-error.css'
    }
};

export const config = {
    OTT: {},
    'la-nacion-ar': {
        'LN-nota-noticia': customElementForNote,
        'LN-nota-receta': customElementForNote,
        'LN-nota-infografia': customElementForNote,
        'LN-nota-storytelling': customElementForNote,
        'LN-nota-foto-al-100': customElementForNote,
        'LN-nota-video': customElementForNote
    }
};

export const evaluateCheckInclusion = (configElement, contentFeatures) => {
    return configElement.checkInclusion
        ? contentFeatures.find(e => e === configElement.checkInclusion)
        : true;
};

export const evaluateFunctionInclusion = (configElement, globalContent) => {
    return configElement.validateInclusion
        ? configElement.validateInclusion(globalContent)
        : true;
};
