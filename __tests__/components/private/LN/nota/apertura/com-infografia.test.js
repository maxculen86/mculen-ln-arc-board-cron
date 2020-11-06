import React from 'react';
import { mount, shallow, render } from 'enzyme';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Consumer from 'fusion:consumer';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

import ComInfografia from '../../../../../../components/private/LN/nota/apertura/com-infografia';
import HtmlAMP from '../../../../../../components/private/LN/nota/cuerpo/htmlAMP';

describe('PRIVATE - LN - Nota - Apertura - ComInfografia', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { _id: '7' }
    }));

    let props = {
        globalContent: {
            _id: 'ZODSVVPC2VEB7NA3XD6AOYYHLQ',
            subtype: '2',
            type: 'story',
            promo_items: {
                basic: {
                    _id: '6POSMWEMKZCZBHINVUG3F4O3BY',
                    content:
                        '<iframe class="pym" id="LNcreativa" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/18/mundial/mundial2018-historicos/"></iframe>',
                    type: 'raw_html'
                }
            }
        },
        outputType: 'amp'
    };

    it('Render OK cuando es Infografia en AMP', () => {
        const component = mount(<ComInfografia {...props} />);

        expect(component).toBeDefined();
        expect(component.find('amp-iframe')).toHaveLength(1);
    });

    it('displays amp-iframe', () => {
        const data = {
            content:
                '<iframe class="pym" id="LNcreativa" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/18/mundial/mundial2018-historicos/"></iframe>',
            _id: '6POSMWEMKZCZBHINVUG3F4O3BY'
        };

        const wrapper = mount(<HtmlAMP data={data} />);
        expect(wrapper.find('amp-iframe')).toHaveLength(1);
    });
});
