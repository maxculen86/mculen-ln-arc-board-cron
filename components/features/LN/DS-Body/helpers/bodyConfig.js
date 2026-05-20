import { defaultRuleConditions } from '../../../LN-nota/body/_utils/_bodyRules';
import { DEFAULT_BODY_COMPONENTS } from '../../../LN-nota/body/_utils/_bodyElementRules';
// TODO: Ir importando los componentes de DS-Body/components para dividir responsabilidades. ej: HowTo.
import HowTo from '../components/howTo/default';
import GalleryEmbed from '../components/galleryEmbed/default';
import Table from '../components/table/default';
import Heading from '../components/heading/default';
import Text from '../../common/text/default';
import List from '../../common/list/default';
import RawHtml from '../../common/rawHtml/default';
import Image from '../../common/image/default';
import OEmbed from '../../common/oEmbed/default';
import Divider from '../../common/divider/default';
import VideoPlayer from '../../common/video/default';
import BlockQuote from '../../common/blockquote/default';
import PullQuote from '../../common/pullquote/default';
import Interstitial from '../../common/interstitial/default';

// TODO: A medida que se vayan creando los nuevos componentes DS, agregarlos aca
const DS_DEFAULT_BODY_COMPONENTS = [
    Text,
    List,
    RawHtml,
    Image,
    OEmbed,
    Divider,
    VideoPlayer,
    BlockQuote,
    PullQuote,
    Interstitial,
    HowTo,
    Heading,
    GalleryEmbed,
    Table
];

const BASE_BODY_CONFIG = {
    allowedArcTypes: [
        'text',
        'header',
        'image',
        'video',
        'video_jw',
        'gallery-embed',
        'interstitial_link',
        'oembed_response',
        'raw_html',
        'blockquote',
        'table',
        'divider',
        'list',
        'pullquote'
    ],
    allowedCustomSubtypes: ['gallery-embed', 'video_jw'],
    dynamicBanners: { enabled: true }
};

function buildBodyConfig(extraAllowed = {}) {
    return {
        allowedArcTypes: [
            ...BASE_BODY_CONFIG.allowedArcTypes,
            ...(extraAllowed.allowedArcTypes || [])
        ],
        allowedCustomSubtypes: [
            ...BASE_BODY_CONFIG.allowedCustomSubtypes,
            ...(extraAllowed.allowedCustomSubtypes || [])
        ],
        dynamicBanners:
            extraAllowed.dynamicBanners ?? BASE_BODY_CONFIG.dynamicBanners
    };
}

function matchArcTypeToSubtype({ componentElement, subtypeElement }) {
    return componentElement.arcType === subtypeElement;
}

function buildCustomRuleConditions(allowedSubtypes = []) {
    if (allowedSubtypes.length === 0) return [];

    return [
        {
            check: ({ subtypeElement }) =>
                allowedSubtypes.includes(subtypeElement),
            rule: matchArcTypeToSubtype
        }
    ];
}

function buildCustomBodyComponents(allowedArcTypes = []) {
    if (allowedArcTypes.length === 0) return [];

    return DS_DEFAULT_BODY_COMPONENTS.filter(component =>
        allowedArcTypes.includes(component?.arcType)
    );
}

const STORYTELLING_V2_BODY_CONFIG = buildBodyConfig({
    allowedArcTypes: ['custom-how-to', 'canchallena'],
    allowedCustomSubtypes: ['custom-how-to', 'canchallena']
});

const OPINION_BODY_CONFIG = buildBodyConfig();

const BODY_CONFIGS_BY_LAYOUT = {
    'LN-nota-storytelling-v2': {
        bodyComponents: buildCustomBodyComponents(
            STORYTELLING_V2_BODY_CONFIG.allowedArcTypes
        ),
        ruleConditions: buildCustomRuleConditions(
            STORYTELLING_V2_BODY_CONFIG.allowedCustomSubtypes
        ),
        dynamicBanners: STORYTELLING_V2_BODY_CONFIG.dynamicBanners
    },
    'LN-Nota-Opinion': {
        bodyComponents: buildCustomBodyComponents(
            OPINION_BODY_CONFIG.allowedArcTypes
        ),
        ruleConditions: buildCustomRuleConditions(
            OPINION_BODY_CONFIG.allowedCustomSubtypes
        ),
        dynamicBanners: OPINION_BODY_CONFIG.dynamicBanners
    }
};

function getBodyConfigForLayout(layout) {
    const config = BODY_CONFIGS_BY_LAYOUT[layout] || {};

    return {
        bodyComponents: config.bodyComponents || DEFAULT_BODY_COMPONENTS,
        ruleConditions: config.ruleConditions || defaultRuleConditions,
        dynamicBanners: config.dynamicBanners
    };
}

export { getBodyConfigForLayout };
