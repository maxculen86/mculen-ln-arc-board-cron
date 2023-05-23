import get from '../../../../../../../../common/utils/get';

export const getBadgebyConfig = article => {
    const isDefaultStyle = chapitaStyle => {
        return (
            chapitaStyle === null ||
            chapitaStyle === 'positive' ||
            chapitaStyle === 'negative'
        );
    };
    const getChapitaText = (labelChapitaText, propertiesChapita) => {
        if (labelChapitaText) {
            return labelChapitaText;
        }
        if (propertiesChapita) {
            return propertiesChapita;
        }
        return null;
    };
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
    let additionalPropertiesChapitaStyle = get(
        article,
        'additionalProperties.chapitaStyle',
        null
    );

    const isDefault = isDefaultStyle(additionalPropertiesChapitaStyle);
    if (isDefault) additionalPropertiesChapitaStyle = 'default';

    const isLiveBlog = type === 'liveblog';
    const isAfondo = typeSeccion === 'afondo';

    const fieldsBadge = {};
    fieldsBadge.badgeStyle = null;
    fieldsBadge.badge = null;
    fieldsBadge.chapita = null;
    if (
        isClosedContent(contentCode) &&
        isXLorLSize(size) &&
        !isSubExclusive(typeSeccion) &&
        !isAfondo
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
    } else if (isXLorLSize(size) && isDefault) {
        const chapitaText = getChapitaText(
            labelChapitaText,
            additionalPropertiesChapita
        );

        if (chapitaText && chapitaText !== ' ' && chapitaText !== '.') {
            fieldsBadge.badgeStyle = additionalPropertiesChapitaStyle;
            fieldsBadge.badge = chapitaText.toUpperCase();
            fieldsBadge.chapita = fieldsBadge.badge;
        }
    }

    return fieldsBadge;
};

//TODO: pasar a un file common utils
export const isClosedContent = contentCode => {
    return contentCode === 'cerrada';
};
//TODO: pasar a un file common utils
export const isXLorLSize = size => {
    return ['XL', 'L'].includes(size);
};
//TODO: pasar a un file common utils
export const isMLSize = size => {
    return size === 'M';
};
//TODO: pasar a un file common utils
export const isSubExclusive = typeSeccion => {
    return ['sub-exclusive'].includes(typeSeccion);
};
