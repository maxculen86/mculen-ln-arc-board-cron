/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Cuerpo from '../../private/LN/nota/cuerpo';
import {
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET
} from '../../private/LN/common/utils/bannerHelper';

const cuerpo = props => {
    const bannerConfig = groupBannerConfig(props);
    // console.log("🚀 ~ file: cuerpo.jsx ~ line 1444444 ~ bannerConfig", bannerConfig)
    const properties = {
        ...props,
        bannerConfig
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Cuerpo {...properties} />;
};

// TODO: improve this function's algorithm
const groupBannerConfig = props => {
    const optionsSet = Object.keys(props.customFields);

    const numberGroups = optionsSet
        .filter(el => el.startsWith('position'))
        .map(el => el.match(/\d+/g)[0]);

    const config = [];

    numberGroups.forEach(n => {
        const configKeys = optionsSet.filter(
            el => el.match(/\d+/g)[0].length === n.length && el.endsWith(n)
        );
        const configOpt = {};

        configKeys.forEach(ck => {
            configOpt[ck.replace(/\d+/g, '')] = props.customFields[ck];
        });

        config.push(configOpt);
    });

    return config;
};

cuerpo.label = 'LN-nota-Cuerpo';

function buildBodyCustomFields() {
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
            info: 'After which paragraph do you want the banner to show?',
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
}

cuerpo.propTypes = {
    customFields: PropTypes.shape(buildBodyCustomFields())
};

cuerpo.lazy = true;

export default Consumer(cuerpo);
