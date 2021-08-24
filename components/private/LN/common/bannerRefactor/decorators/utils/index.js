/* eslint-disable import/prefer-default-export */

/**
 * Tomar en cuenta sections y tags
 * {"targeting":{"tags": ["ca_turismo|ca_comun|ca_viajes|te_ohlala_viaja"], "tags_nuevos":["ca_turismo","ca_comun","ca_viajes","te_ohlala_viaja"] }
 */

// TODO: borrar esta funcion porque ya se paso a bannerHelper

export const getTargetingFormat = sections => {
    return tags => {
        const targeting = {
            tags: [
                sections
                    .map(section => 'ca_'.concat(section.name).toLowerCase())
                    .concat(
                        tags.map(tag => 'te_'.concat(tag.text).toLowerCase())
                    )
                    .join('|')
            ],
            tags_nuevos: sections
                .map(section => 'ca_'.concat(section.name).toLowerCase())
                .concat(tags.map(tag => 'te_'.concat(tag.text).toLowerCase()))
        };

        return `${JSON.stringify(targeting)}`;
    };
};
