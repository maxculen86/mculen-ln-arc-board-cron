import get from '../../../../../../../../common/utils/get';

const isDefaultStyle = chapitaStyle => {
    return (
        chapitaStyle === null ||
        chapitaStyle === 'positive' ||
        chapitaStyle === 'negative'
    );
};
const getChapitaText = (labelChapitaText, propertiesChapita) => {
    if (propertiesChapita) {
        return propertiesChapita;
    }
    if (labelChapitaText) {
        return labelChapitaText;
    }

    return null;
};

const getAdditionalPropertiesChapitaStyle = article => {
    return get(article, 'additionalProperties.chapitaStyle', null);
};

const getIsXLorLSizeinDefault = (
    labelChapitaText,
    additionalPropertiesChapita,
    fieldsBadge
) => {
    const newsFieldsBadge = { ...fieldsBadge };

    const chapitaText = getChapitaText(
        labelChapitaText,
        additionalPropertiesChapita
    );

    if (chapitaText && chapitaText !== ' ' && chapitaText !== '.') {
        newsFieldsBadge.badgeStyle = 'default';
        newsFieldsBadge.badge = chapitaText.toUpperCase();
        newsFieldsBadge.chapita = newsFieldsBadge.badge;
    }
    return newsFieldsBadge;
};

export const getBadgebyConfig = article => {
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
    const additionalPropertiesChapitaStyle = getAdditionalPropertiesChapitaStyle(
        article
    );

    const isDefault = isDefaultStyle(additionalPropertiesChapitaStyle);

    const isLiveBlog = type === 'liveblog';
    const isAfondo = typeSeccion === 'afondo';

    let fieldsBadge = {
        badgeStyle: null,
        badge: null,
        chapita: null
    };

    if (
        isClosedContent(contentCode) &&
        isXLorLSize(size) &&
        !isSubExclusive(typeSeccion) &&
        !isAfondo
    ) {
        fieldsBadge.badgeStyle = 'exclusive-ln';
        fieldsBadge.badge = 'Suscriptores';
        fieldsBadge.chapita = 'Suscriptores';
    } else if (isSponsored) {
        fieldsBadge.badgeStyle = 'default';
        fieldsBadge.badge = 'CONTENT LAB';
        fieldsBadge.chapita = 'CONTENT LAB';
    } else if (isLiveBlog) {
        fieldsBadge.badgeStyle = 'live';
        fieldsBadge.badge = 'VIVO';
        fieldsBadge.chapita = 'VIVO';
    } else if (isMLSize(size) || isAfondo || isSubExclusive(typeSeccion)) {
        return fieldsBadge;
    } else if (isXLorLSize(size) && isDefault) {
        fieldsBadge = getIsXLorLSizeinDefault(
            labelChapitaText,
            additionalPropertiesChapita,
            fieldsBadge
        );
    }

    return fieldsBadge;
};

export const isClosedContent = contentCode => {
    return contentCode === 'cerrada';
};

export const isXLorLSize = size => {
    return ['XL', 'L'].includes(size);
};

export const isMLSize = size => {
    return size === 'M';
};

export const isSubExclusive = typeSeccion => {
    return ['sub-exclusive'].includes(typeSeccion);
};
