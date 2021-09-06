import getProperties from 'fusion:properties';
import get from '../get';
import getImage from './getImage';
import { getChildsFromSections } from '../../../LN/common/utils/homeHelper';
import sectionsValidation from '../../../../layouts/config/LN-Home.config';

const getDataToLinkImage = (
    data = {},
    section = '',
    renderables = [],
    arcSite = ''
) => {
    const sectionData =
        {
            nota: () => {
                return getPromoItems(data);
            },
            acumulado: () => {
                return [];
            },
            home: () => {
                ///////////// BOMBA //////////////
                const bomba =
                    (renderables.length &&
                        getChildsFromSections(
                            renderables,
                            get(sectionsValidation, 'Bomba.position', 2) + 1
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

                const getMediaBomba = () => {
                    const {
                        isHideImage,
                        imageID,
                        noteID
                    } = getcustomFieldsData(bomba[0]);

                    const imageConfig = get(
                        getProperties(arcSite),
                        `cajaTemaConfig.bomba1.articles[0].imageConfig`,
                        'bomba'
                    );

                    return (
                        getPromoItems(
                            getSource(imageID, noteID, imageConfig, isHideImage)
                        ) || []
                    );
                };

                //////////////// APERTURA1 ////////////////////
                const getMediaApertura = () => {
                    const apertura =
                        (renderables.length &&
                            getChildsFromSections(
                                renderables,
                                get(
                                    sectionsValidation,
                                    'Apertura_1.position',
                                    3
                                ) + 1
                            ).filter(
                                element =>
                                    get(
                                        element,
                                        'props.customFields.hideCaja',
                                        false
                                    ) !== true &&
                                    get(element, 'type', null) ===
                                        'Ln_Caja_Manual'
                            )[0]) ||
                        [];

                    const article = get(apertura, 'children', [])[0];

                    const {
                        isHideImage,
                        imageID,
                        noteID
                    } = getcustomFieldsData(article);

                    const diagramacion = get(
                        apertura,
                        'props.customFields.layout',
                        ''
                    );

                    const imageConfig = get(
                        getProperties(arcSite),
                        `cajaTemaConfig.${diagramacion}.articles[0].imageConfig`,
                        ''
                    );

                    return (
                        getPromoItems(
                            getSource(imageID, noteID, imageConfig, isHideImage)
                        ) || []
                    );
                };

                const resizedUrls = bomba.length
                    ? getMediaBomba()
                    : getMediaApertura();

                return (Array.isArray(resizedUrls) && resizedUrls) || [];
            }
        } || [];

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
        return get(items, 'promo_items.basic.resized_urls', []).map(elem => ({
            resizedUrl: get(elem, 'resizedUrl', ''),
            media: get(elem, 'option.media_preload', '')
        }));
    };

    const sourceType = ['relatedImageSource', 'articleSourceNota'];

    return (sectionData[section] && sectionData[section]()) || [];
};

export default getDataToLinkImage;
