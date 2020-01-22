import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Cuerpo from '../../private/LN/nota/cuerpo';
import {
    getSlotsOptions,
    slotsConfig
} from '../../private/LN/common/banner/config';

const cuerpo = props => {
    buildBodyCustomFields();
    return <Cuerpo {...props} />;
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
            min: 1,
            max: 6
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
                            defaultValue: '',
                            description: attribute.info,
                            group: `Banner ${i + 1}`
                        })
                    });
                    break;
                case 'number':
                    Object.assign(result, {
                        [`${attribute.name}${i + 1}`]: PropTypes.number.tag({
                            label: attribute.name,
                            defaultValue: '',
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

    return PropTypes.shape(Object.assign(result));
}

cuerpo.propTypes = {
    customFields: buildBodyCustomFields()
};

export default Consumer(cuerpo);
