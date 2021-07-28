import get from '../get';

const getDataToLinkImage = (data = {}, section = '') => {
    const sectionData =
        {
            nota: () => {
                return get(data, 'promo_items.basic.resized_urls', []).map(
                    elem => ({
                        resizedUrl: get(elem, 'resizedUrl', ''),
                        media: get(elem, 'option.media', '')
                    })
                );
            },
            acumulado: () => {
                return [];
            },
            home: () => {
                return [];
            }
        } || [];

    return (sectionData[section] && sectionData[section]()) || [];
};

export default getDataToLinkImage;
