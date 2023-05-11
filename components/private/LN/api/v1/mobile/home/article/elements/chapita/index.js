import get from '../../../../../../../../common/utils/get';

export const getArticleChapitaStyle = article => {
    return get(article, 'additionalProperties.chapitaStyle', null);
};

export function getBadgebyConfig(article) {
    const typeSeccion = get(article, 'informationBox.sectionAliasMobile', null);
    const isSponsored = get(article, 'owner.sponsored', false) || false;
    const type =
        get(article, 'additionalProperties.variant', 'regular') || 'regular';
    const contentCode = get(article, 'content_restrictions.content_code', '');
    const size = get(article, 'additionalProperties.diseno.size', null);
    const labelChapitaText = get(article, 'label.chapita.text', null);
    const additionalPropertiesChapita = get(
        article,
        'additionalProperties.chapita',
        null
    );
    const additionalPropertiesChapitaStyle = get(
        article,
        'additionalProperties.chapitaStyle',
        null
    );
    const isLiveBlog = type === 'liveblog';
    const isAfondo = typeSeccion === 'afondo';

    const fieldsBadge = {};
    fieldsBadge.badgeStyle = null;
    fieldsBadge.badge = null;
    fieldsBadge.chapita = null;
    if (
        isClosedContent(contentCode) &&
        isXLorLSize(size) &&
        !isSubExclusive(typeSeccion)
    ) {
        fieldsBadge.badgeStyle = 'exclusive-ln';
        fieldsBadge.badge = 'Exclusivo suscriptores';
        fieldsBadge.chapita = 'Exclusivo suscriptores';
    } else if (isSponsored) {
        fieldsBadge.badgeStyle = 'default';
        fieldsBadge.badge = 'CONTENT LAB';
        fieldsBadge.chapita = 'CONTENT LAB';
    } else if (isLiveBlog) {
        fieldsBadge.badgeStyle = 'live';
        fieldsBadge.badge = 'VIVO';
        fieldsBadge.chapita = 'VIVO';
    } else if (isMLSize(size) || isAfondo) {
        return fieldsBadge;
    } else if (
        isXLorLSize(size) &&
        isDefaultStyle(additionalPropertiesChapitaStyle)
    ) {
        const chapitaText = getChapitaText(
            labelChapitaText,
            additionalPropertiesChapita
        );

        if (chapitaText && chapitaText !== ' ' && chapitaText !== '.') {
            fieldsBadge.badgeStyle = !additionalPropertiesChapitaStyle
                ? 'default'
                : additionalPropertiesChapitaStyle;
            fieldsBadge.badge = chapitaText.toUpperCase();
            fieldsBadge.chapita = fieldsBadge.badge;
        }
    }

    return fieldsBadge;
}

function isClosedContent(contentCode) {
    return contentCode === 'cerrada';
}

function isXLorLSize(size) {
    return ['XL', 'L'].includes(size);
}

function isMLSize(size) {
    return size === 'M';
}

function isSubExclusive(typeSeccion) {
    return ['afondo', 'sub-exclusive'].includes(typeSeccion);
}

function isDefaultStyle(additionalPropertiesChapitaStyle) {
    return (
        additionalPropertiesChapitaStyle === null ||
        additionalPropertiesChapitaStyle === 'positive' ||
        additionalPropertiesChapitaStyle === 'negative'
    );
}

function getChapitaText(labelChapitaText, additionalPropertiesChapita) {
    if (labelChapitaText) {
        return labelChapitaText;
    }
    if (additionalPropertiesChapita) {
        return additionalPropertiesChapita;
    }
    return null;
}
