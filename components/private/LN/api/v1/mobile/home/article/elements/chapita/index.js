import get from '../../../../../../../../common/utils/get';

export const listBadgetsByConfigs = [
    {
        fieldsBadge: {
            badgeStyle: 'exclusive-ln',
            badge: 'Exclusivo suscriptor',
            chapita: 'Exclusivo suscriptor'
        },
        Equal: [
            {
                key: 'informationBox.sectionAliasMobile',
                value: 'sub-exclusive'
            },
            {
                key: 'additionalProperties.chapitaStyle',
                value: 'exclusive-ln'
            },
            {
                key: 'label.chapita.text',
                value: 'EXCLUSIVO SUSCRIPTOR'
            },
            {
                key: 'content_restrictions.content_code',
                value: 'cerrada'
            },
            {
                key: 'additionalProperties.chapita',
                value: 'EXCLUSIVO SUSCRIPTOR'
            }
        ]
    }
];

export const getArticleChapitaStyle = article => {
    return get(article, 'additionalProperties.chapitaStyle', null);
};

export const getArticleChapita = article => {
    const originalTag = get(article, 'label.chapita.text', null);
    const tag = get(article, 'additionalProperties.chapita', null);

    const result = originalTag || tag || null;
    return result ? result.toUpperCase() : result;
};

export const getBadgebyConfig = article => {
    let fieldsBadge = {};
    listBadgetsByConfigs &&
        listBadgetsByConfigs.some(configBadge => {
            return (
                configBadge &&
                configBadge.Equal &&
                configBadge.Equal.some(configEqual => {
                    if (
                        (
                            get(article, configEqual.key, '') || ''
                        ).toLowerCase() === configEqual.value.toLowerCase()
                    ) {
                        fieldsBadge = configBadge.fieldsBadge;
                        return true;
                    }
                    return false;
                })
            );
        });

    if (!fieldsBadge.badgeStyle) {
        fieldsBadge.badgeStyle = getArticleChapitaStyle(article);
    }
    if (!fieldsBadge.badge) {
        fieldsBadge.badge = getArticleChapita(article);
    }

    fieldsBadge.chapita = fieldsBadge.badge;

    return fieldsBadge;
};
