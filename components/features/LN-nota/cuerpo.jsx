import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Cuerpo from '../../private/LN/nota/cuerpo';
import {
    getSlotsOptions,
    slotsConfig
} from '../../private/LN/common/banner/config';

const cuerpo = props => {
    return <Cuerpo {...props} />;
};

cuerpo.label = 'LN-nota-Cuerpo';

cuerpo.propTypes = {
    customFields: PropTypes.shape({
        myNumberField: PropTypes.number.tag({
            label: {
                en: 'My Number',
                es: 'Mi Número'
            },
            group: 'examples',
            hidden: false,
            max: 100,
            min: 0,
            step: 5
        }),
        mySelectField: PropTypes.oneOf(['foo', 'bar', 'baz']).tag({
            defaultValue: 'bar',
            description: 'This custom field is useless',
            group: 'examples',
            labels: { foo: 'Foo', bar: 'Bar', baz: 'Baz' }
        }),
        mySelectField2: PropTypes.oneOf(['foo', 'bar', 'baz']).tag({
            defaultValue: 'bar',
            description: 'This custom field is useless',
            group: 'examples3',
            labels: { foo: 'Foo', bar: 'Bar', baz: 'Baz' }
        }),
        desktop1: PropTypes.oneOf(getSlotsOptions()).tag({
            defaultValue: '',
            description: 'Cualquier cosa',
            group: 'Banner 1'
        }),
        mobile1: PropTypes.oneOf(getSlotsOptions()).tag({
            defaultValue: '',
            description: 'Cualquier cosa',
            group: 'Banner 1'
        }),
        tablet1: PropTypes.oneOf(getSlotsOptions()).tag({
            defaultValue: '',
            description: 'Cualquier cosa',
            group: 'Banner 1'
        }),
        desktop2: PropTypes.oneOf(getSlotsOptions()).tag({
            defaultValue: '',
            description: 'Cualquier cosa',
            group: 'Banner 2'
        }),
        mobile2: PropTypes.oneOf(getSlotsOptions()).tag({
            defaultValue: '',
            description: 'Cualquier cosa',
            group: 'Banner 2'
        }),
        tablet3: PropTypes.oneOf(getSlotsOptions()).tag({
            defaultValue: '',
            description: 'Cualquier cosa',
            group: 'Banner 2'
        })
    })
};

export default Consumer(cuerpo);
