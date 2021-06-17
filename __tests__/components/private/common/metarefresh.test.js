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
        nota_desktop: 30
    })
}));

import Metarefresh from '../../../../components/private/common/metarefresh';

describe('Metarefresh', () => {
    const { reload } = window.location;
    const Component = Metarefresh.WrappedComponent;

    beforeAll(() => {
        Object.defineProperty(window.location, 'reload', {
            configurable: true
        });
        window.location.reload = jest.fn();
        jest.useFakeTimers();
    });

    afterAll(() => {
        window.location.reload = reload;
        jest.clearAllTimers();
    });

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

    it('Does not reload when subscriptor is present', () => {
        const component = mount(<Component {...props} />);
        expect(window.location.reload).toHaveBeenCalledTimes(0);
    });

    it('Does not reload when videos are present', () => {
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
        expect(window.location.reload).not.toBeCalled();
    });

    it('Does not reload when spotify audio is present', () => {
        props = {
            ...props,
            globalContent: {
                type: 'story',
                content_elements: [
                    {
                        subtype: 'spotify',
                        type: 'raw_html'
                    }
                ]
            },
            loginData: {
                subscription: false
            }
        };

        const component = mount(<Component {...props} />);
        expect(window.location.reload).not.toBeCalled();
    });

    it('Does not reload when any element of the content elements is type oembed_response', () => {
        props = {
            ...props,
            globalContent: {
                type: 'story',
                content_elements: [
                    {
                        subtype: 'instagram',
                        type: 'oembed_response'
                    }
                ]
            },
            loginData: {
                subscription: false
            }
        };

        const component = mount(<Component {...props} />);
        expect(window.location.reload).not.toBeCalled();
    });

    it('Does not reload on accelerated mobile pages', () => {
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
        expect(window.location.reload).not.toBeCalled();
    });

    it('Reload when required conditions are met', () => {
        props = {
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
        jest.advanceTimersByTime(1000);
        expect(window.location.reload).not.toBeCalled();
        jest.advanceTimersByTime(30000);
        expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
});
