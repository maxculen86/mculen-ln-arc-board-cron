import React from 'react';
import getProperties from 'fusion:properties';
import get from '../get';
import getImage from './getImage';
import { getChildsFromSections } from '../../../LN/common/utils/homeHelper';
import sectionsValidation from '../../../../layouts/config/LN-Home.config';
import { FOTOAL100, STORYTELLING } from '../subtypes/subtypeHelper';
import { LinkImagePreload } from '../../../LN/common/utils/mediaHelper';

const getSource = (imageID, noteID, imageConfig, isHideImage) => {
    return imageID
        ? getImage(imageID, sourceType[0], imageConfig, isHideImage)
        : getImage(noteID, sourceType[1], imageConfig, isHideImage);
};

const getcustomFieldsData = fieldsData => {
    return {
        isHideImage: get(fieldsData, 'props.customFields.hideImage', false),
        imageID: get(fieldsData, 'props.customFields.imageId', ''),
        noteID: get(fieldsData, 'props.customFields.noteId', '')
    };
};

const getPromoItems = items => {
    return get(items, 'promo_items.basic.resized_urls', []).map(elem => {
        return {
            resizedUrl: get(elem, 'resizedUrl', ''),
            media: get(elem, 'option.media_preload', ''),
            // TODO: Evaluar no pasar Media
            option: elem.option
        };
    });
};

const sourceType = ['relatedImageSource', 'articleSourceNota'];

const getMediaBomba = (arcSite, bomba) => {
    const { isHideImage, imageID, noteID } = getcustomFieldsData(bomba[0]);

    const imageConfig = get(
        getProperties(arcSite),
        `cajaTemaConfig.bomba1.articles[0].imageConfig`,
        'bomba'
    );

    return (
        getPromoItems(getSource(imageID, noteID, imageConfig, isHideImage)) ||
        []
    );
};

const getMediaApertura = (renderables, arcSite) => {
    const apertura =
        (renderables.length &&
            getChildsFromSections(
                get(sectionsValidation, 'Apertura_1.position', 3) + 1,
                renderables
            ).filter(
                element =>
                    get(element, 'props.customFields.hideCaja', false) !==
                        true && get(element, 'type', null) === 'Ln_Caja_Manual'
            )[0]) ||
        [];

    const article = get(apertura, 'children', [])[0];

    const { isHideImage, imageID, noteID } = getcustomFieldsData(article);

    const diagramacion = get(apertura, 'props.customFields.layout', '');

    const imageConfig = get(
        getProperties(arcSite),
        `cajaTemaConfig.${diagramacion}.articles[0].imageConfig`,
        ''
    );

    return (
        getPromoItems(getSource(imageID, noteID, imageConfig, isHideImage)) ||
        []
    );
};

const mapResp = (links = []) =>
    links.map(elem => {
        return (
            <link
                id="preload-img"
                rel="preload"
                href={elem.resizedUrl}
                as="image"
                media={elem.media}
            />
        );
    });

const getDataToLinkImage = ({
    data = {},
    section = '',
    renderables = [],
    arcSite = ''
}) => {
    if (!data) return [];
    const sectionData =
        {
            nota: () => {
                const { subtype, promo_items: promoItems } = data || {};
                const shouldExclude = !!(
                    (subtype === FOTOAL100 || subtype === STORYTELLING) &&
                    get(promoItems, 'storytelling_mobile.resized_urls.length')
                );
                const resizedUrls = get(
                    data,
                    'promo_items.basic.resized_urls',
                    []
                );

                return (
                    !shouldExclude && (
                        <LinkImagePreload resizedUrls={resizedUrls} />
                    )
                );
            },
            acumulado: () => {
                return [];
            },
            home: () => {
                const bomba =
                    (renderables.length &&
                        getChildsFromSections(
                            get(sectionsValidation, 'Bomba.position', 2) + 1,
                            renderables
                        ).filter(
                            element =>
                                get(
                                    element,
                                    'props.customFields.hideFeature',
                                    false
                                ) !== true &&
                                get(
                                    element,
                                    'props.customFields.hideImage',
                                    false
                                ) !== true &&
                                get(element, 'type', null) === 'LN-common/bomba'
                        )) ||
                    [];

                const resizedUrls = bomba.length
                    ? getMediaBomba(arcSite, bomba)
                    : getMediaApertura(renderables, arcSite);

                return Array.isArray(resizedUrls) && resizedUrls.length > 0 ? (
                    <LinkImagePreload resizedUrls={resizedUrls} />
                ) : (
                    []
                );
            }
        } || [];

    return (sectionData[section] && sectionData[section]()) || [];
};

export default getDataToLinkImage;
