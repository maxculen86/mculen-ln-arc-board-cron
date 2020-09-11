import React from 'react';
import { mount } from 'enzyme';
import GooglePublisherTagAcumulado from '../../../../../components/private/common/scriptManager/googlePublisherTagAcumulado';

describe('GooglePublisherTagAcumulado', () => {
    const content = {
        globalContent: {
            Payload: {
                items: [
                    {
                        name: 'deportes',
                        organization: 'sandbox.lanacionar',
                        path: '/',
                        slug: 'deportes',
                        usage_counter: 0
                    }
                ],
                count: 1
            },
            slug: 'alberto-fernandez',
            name: 'recetas'
        }
    };
    it('Builds the json object as expected', () => {
        const component = mount(<GooglePublisherTagAcumulado {...content} />);
        // to be continued ...
        expect(true).toBeTruthy();
    });
});
