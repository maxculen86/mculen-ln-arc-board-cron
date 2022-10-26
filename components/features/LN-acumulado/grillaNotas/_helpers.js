/* eslint-disable import/prefer-default-export */
import PropTypes from 'fusion:prop-types';
import {
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET
} from '../../../private/LN/common/utils/bannerHelper';

export const buildCustomFieldsForBanners = () => {
    const attributes = [
        {
            name: 'desktop',
            type: 'list',
            alias: 'dsk',
            bannerSlots: BANNERS_DESKTOP
        },
        {
            name: 'tablet',
            type: 'list',
            alias: 'tab',
            bannerSlots: BANNERS_TABLET
        },
        {
            name: 'mobile',
            type: 'list',
            alias: 'mob',
            bannerSlots: BANNERS_MOBILE
        },
        {
            name: 'position',
            type: 'number'
        }
    ];

    return [...Array(10)].reduce(
        (acc, val, i) => ({
            ...acc,
            ...attributes.reduce(
                (accumulator, value) => ({
                    ...accumulator,
                    [`${value.name}${i + 1}`]:
                        value.type === 'list'
                            ? PropTypes.oneOf(value.bannerSlots).tag({
                                  label: value.name,
                                  defaultValue: '',
                                  group: `Banner ${i + 1}`
                              })
                            : PropTypes.number.tag({
                                  label: value.name,
                                  defaultValue: 0,
                                  group: `Banner ${i + 1}`
                              })
                }),
                {}
            )
        }),
        {}
    );
};
