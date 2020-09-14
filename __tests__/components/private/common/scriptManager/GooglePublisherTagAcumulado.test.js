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

    const expected = 'ca_recetas te_deportes au_alberto-fernandez';

    it('Returns null when on stories', () => {
        const component = mount(
            <GooglePublisherTagAcumulado
                {...{
                    ...content,
                    ...{
                        globalContent: {
                            ...content.globalContent,
                            type: 'story'
                        }
                    }
                }}
            />
        );
        expect(component.html()).toBeNull();
    });

    it('Builds the json object as expected', () => {
        const component = mount(<GooglePublisherTagAcumulado {...content} />);
        expect(component.find('script')).toHaveLength(1);
        expect(component.html()).toMatch(expected);
    });
});
