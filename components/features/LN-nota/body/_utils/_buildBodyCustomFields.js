import PropTypes from 'fusion:prop-types';

import {
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET
} from '../../../../private/LN/common/utils/bannerHelper';

const attributes = [
    {
        name: 'desktop',
        type: 'list',
        alias: 'dsk',
        bannerSlots: BANNERS_DESKTOP
    },
    {
        name: 'mobile',
        type: 'list',
        alias: 'mob',
        bannerSlots: BANNERS_MOBILE
    },
    {
        name: 'tablet',
        type: 'list',
        alias: 'tab',
        bannerSlots: BANNERS_TABLET
    },
    {
        name: 'position',
        type: 'number',
        info: 'Despues de que parrafo quiere ubicar el banner?',
        min: 0,
        max: 20
    },
    { name: 'sticky', type: 'bool', info: 'Banner sticky?' },
    {
        name: 'background',
        type: 'bool',
        info: 'Should it have a background layer?'
    }
];
const buildBodyCustomFields = () => {
    const result = {};

    [...Array(15)].forEach((item, i) => {
        attributes.forEach(attribute => {
            // eslint-disable-next-line default-case
            switch (attribute.type) {
                case 'list':
                    Object.assign(result, {
                        [`${attribute.name}${i + 1}`]: PropTypes.oneOf(
                            attribute.bannerSlots
                        ).tag({
                            label: attribute.name,
                            defaultValue: '',
                            group: `Banner ${i + 1}`
                        })
                    });
                    break;
                case 'bool':
                    Object.assign(result, {
                        [`${attribute.name}${i + 1}`]: PropTypes.bool.tag({
                            label: attribute.name,
                            defaultValue: false,
                            group: `Banner ${i + 1}`
                        })
                    });
                    break;
                case 'number':
                    Object.assign(result, {
                        [`${attribute.name}${i + 1}`]: PropTypes.number.tag({
                            label: attribute.name,
                            defaultValue: 0,
                            max: attribute.max,
                            min: attribute.min,
                            group: `Banner ${i + 1}`
                        })
                    });
                    break;
            }
        });
    });

    return Object.assign(result);
};

export default buildBodyCustomFields;
