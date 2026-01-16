import { defaultRuleConditions } from '../../../LN-nota/body/_utils/_bodyRules';
import { DEFAULT_BODY_COMPONENTS } from '../../../LN-nota/body/_utils/_bodyElementRules';
import Text from '../../common/text/default';
import List from '../../common/list/default';

// TODO: A medida que se vayan creando los nuevos componentes DS, agregarlos aca
const DS_DEFAULT_BODY_COMPONENTS = [Text, List];

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
        'list'
    ],
    allowedCustomSubtypes: ['gallery-embed', 'video_jw']
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
        ]
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
        )
    },
    'LN-Nota-Opinion': {
        bodyComponents: buildCustomBodyComponents(
            OPINION_BODY_CONFIG.allowedArcTypes
        ),
        ruleConditions: buildCustomRuleConditions(
            OPINION_BODY_CONFIG.allowedCustomSubtypes
        )
    }
};

function getBodyConfigForLayout(layout) {
    const config = BODY_CONFIGS_BY_LAYOUT[layout] || {};

    return {
        bodyComponents: config.bodyComponents || DEFAULT_BODY_COMPONENTS,
        ruleConditions: config.ruleConditions || defaultRuleConditions
    };
}

export { getBodyConfigForLayout };
