import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Cuerpo from '../../private/LN/nota/cuerpo';
import { getSlotsOptions } from '../../private/LN/common/banner/config';

const cuerpo = props => {
    const bannerConfig = groupBannerConfig(props);
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
        .map(el => el.substring(el.length - 1, el.length));

    const config = [];

    numberGroups.forEach(n => {
        const configKeys = optionsSet.filter(el => el.endsWith(n));
        const configOpt = {};

        configKeys.forEach(ck => {
            configOpt[ck.substring(0, ck.length - 1)] = props.customFields[ck];
        });

        config.push(configOpt);
    });

    return config;
};

cuerpo.label = 'LN-nota-Cuerpo';

function buildBodyCustomFields() {
    const attributes = [
        { name: 'desktop', type: 'list', info: 'Placement on desktop' },
        { name: 'mobile', type: 'list', info: 'Placement on mobile' },
        { name: 'tablet', type: 'list', info: 'Placement on tablet' },
        {
            name: 'position',
            type: 'number',
            info: 'After which paragraph do you want the banner to show?',
            min: 0,
            max: 15
        },
        { name: 'sticky', type: 'bool', info: 'Banner sticky?' },
        {
            name: 'background',
            type: 'bool',
            info: 'Should it have a background layer?'
        }
    ];
    const result = {};
    [...Array(6)].map((item, i) => {
        return attributes.map(attribute => {
            // eslint-disable-next-line default-case
            switch (attribute.type) {
                case 'list':
                    Object.assign(result, {
                        [`${attribute.name}${i + 1}`]: PropTypes.oneOf(
                            getSlotsOptions()
                        ).tag({
                            label: attribute.name,
                            defaultValue: '',
                            description: attribute.info,
                            group: `Banner ${i + 1}`
                        })
                    });
                    break;
                case 'bool':
                    Object.assign(result, {
                        [`${attribute.name}${i + 1}`]: PropTypes.bool.tag({
                            label: attribute.name,
                            defaultValue: false,
                            description: attribute.info,
                            group: `Banner ${i + 1}`
                        })
                    });
                    break;
                case 'number':
                    Object.assign(result, {
                        [`${attribute.name}${i + 1}`]: PropTypes.number.tag({
                            label: attribute.name,
                            defaultValue: 0,
                            description: attribute.info,
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
    customFields: PropTypes.shape(buildBodyCustomFields()).isRequired
};

export default Consumer(cuerpo);
