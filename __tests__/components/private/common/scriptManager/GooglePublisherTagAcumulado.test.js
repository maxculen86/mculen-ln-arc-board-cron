import React from 'react';
import { mount, render } from 'enzyme';
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
            name: 'recetas',
            ancestors: {
                default: ['/', '/deportes', '/deportes/futbol']
            },
            parent: {
                default: '/deportes/futbol'
            }
        }
    };

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
        expect(component.find('script')).toHaveLength(2);
        expect(component.html()).toMatch('ca_recetas');
        expect(component.html()).toMatch('ca_deportes');
        expect(component.html()).toMatch('ca_futbol');
        expect(component.html()).toMatch('te_deportes');
        expect(component.html()).toMatch('au_alberto-fernandez');
    });

    const content2 = {
        globalContent: {
            name: 'futbol',
            parent: {
                default: '/deportes'
            }
        }
    };

    it('Builds the json object without ancestors', () => {
        const component = mount(<GooglePublisherTagAcumulado {...content2} />);
        expect(component.find('script')).toHaveLength(2);
        expect(component.html()).toMatch('ca_deportes');
        expect(component.html()).toMatch('ca_futbol');
    });

    const content3 = {
        globalContent: {}
    };

    it('Builds the json object without ancestors', () => {
        const component = render(<GooglePublisherTagAcumulado {...content3} />);
        expect(component).toBeDefined();
    });
});
