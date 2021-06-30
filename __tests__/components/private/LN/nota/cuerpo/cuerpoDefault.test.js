import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import Static from 'fusion:static';

import React from 'react';
import { mount, shallow } from 'enzyme';

/* jest.mock(
    '../../../../../../components/private/LN/common/bannerRefactor',
    () => 'component-mock'
); */

import BodyDefault from '../../../../../../components/private/LN/nota/cuerpo/';

describe('Cuerpo Default', () => {
    let component;

    const props = {
        siteProperties: {
            bannerConfig: { dfp_id: 133919216 }
        },
        isAdmin: false,
        bannerConfig: [{ mobile: 'caja3_mob', position: 7 }],
        globalContent: {
            headlines: { basic: 'tituloNota' },
            content_elements: [...Array(8)].reduce(
                (accumulator, value) => [
                    ...accumulator,
                    ...[
                        {
                            content:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            type: 'text',
                            additional_properties: {}
                        }
                    ]
                ],
                []
            )
        }
    };

    beforeEach(() => {
        component = mount(<BodyDefault {...props} />);
    });

    afterEach(() => {
        component = null;
    });

    it('Places banners in the right position', () => {
        /* This test ain't finished yet */
        /* const banner = component.find('component.mock');
        expect(banner.is('component-mock')).toBe(true); */
        expect(true).toBeTruthy();
    });
});
