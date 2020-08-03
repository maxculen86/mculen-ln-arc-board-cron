import React from 'react';
import { mount } from 'enzyme';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Context from 'fusion:context';

jest.mock(
    '../../../../components/private/LN/common/hocs/withLoginData',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock(
    '../../../../components/private/common/hocs/withScreenUtils',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock('fusion:content', () => ({
    useContent: () => ({
        Metarefresh: {
            nota_desktop: 30
        }
    })
}));

import Metarefresh from '../../../../components/private/common/metarefresh';

describe('Metarefresh', () => {
    const Component = Metarefresh.WrappedComponent;

    let props = {
        arcSite: 'la-nacion-ar',
        globalContent: {
            type: 'story',
            content_elements: []
        },
        loginData: {
            subscription: true
        },
        screenUtils: {
            device: 'desktop'
        }
    };

    it('Does not render when subscriptor is present', () => {
        const component = mount(<Component {...props} />);
        expect(component.find('script')).toHaveLength(0);
    });

    it('Does not render when videos are present', () => {
        props = {
            ...props,
            globalContent: {
                type: 'story',
                content_elements: [
                    {
                        type: 'video'
                    }
                ]
            },
            loginData: {
                subscription: false
            }
        };

        const component = mount(<Component {...props} />);
        expect(component.find('script')).toHaveLength(0);
    });

    it('Does not render when spotify audio is present', () => {
        props = {
            ...props,
            globalContent: {
                type: 'story',
                content_elements: [
                    {
                        subtype: 'spotify'
                    }
                ]
            },
            loginData: {
                subscription: false
            }
        };

        const component = mount(<Component {...props} />);
        expect(component.find('script')).toHaveLength(0);
    });

    it('Does not render on accelerated mobile pages', () => {
        props = {
            ...props,
            outputType: 'amp',
            globalContent: {
                type: 'story',
                content_elements: []
            },
            loginData: {
                subscription: false
            }
        };

        const component = mount(<Component {...props} />);
        expect(component.find('script')).toHaveLength(0);
    });

    it('Renders when required conditions are met', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            globalContent: {
                type: 'story',
                content_elements: [{ type: 'text' }],
                promo_items: {
                    basic: {}
                }
            },
            loginData: {
                suscription: false
            },
            screenUtils: {
                device: 'desktop'
            }
        };
        const component = mount(<Component {...props} />);
        expect(component.find('script')).toHaveLength(1);
        const {
            dangerouslySetInnerHTML: { __html: html }
        } = component.find('script').props();
        expect(html).toContain(3000);
    });
});
