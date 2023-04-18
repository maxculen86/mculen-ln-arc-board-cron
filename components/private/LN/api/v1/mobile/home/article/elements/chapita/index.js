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
    const typeSeccion = get(article, 'informationBox.sectionAliasMobile', null);
    const isSponsored = get(article, 'owner.sponsored', false) || false;

    let fieldsBadge = {};
    fieldsBadge.badgeStyle = null;
    fieldsBadge.badge = null;
    fieldsBadge.chapita = null;

    if (['afondo', 'sub-exclusive'].includes(typeSeccion)) {
        return fieldsBadge;
    }
    // If the typeCard is size M  and not is sponsored
    if (
        get(article, 'additionalProperties.diseno.size', null) === 'M' &&
        !isSponsored
    ) {
        return fieldsBadge;
    }

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
