import React from 'react';
import Consumer from 'fusion:consumer';
import { mount } from 'enzyme';
import Metarefresh from '../../../../components/private/common/metarefresh';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/common/hocs/withScreenUtils',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock('fusion:content', () => ({
    useContent: () => ({
        nota_desktop: 30
    })
}));

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: jest
            .fn(() => ({
                state: {
                    loginData: {
                        subscription: false,
                        loading: false
                    },
                    logueado: false
                }
            }))
            .mockImplementationOnce(() => ({
                state: {
                    loginData: {
                        subscription: true,
                        loading: false
                    },
                    logueado: true
                }
            }))
            .mockImplementationOnce(() => ({
                state: {
                    loginData: {
                        subscription: true,
                        loading: false
                    },
                    logueado: true
                }
            }))
    };
});

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

    describe('when subscritor is present', () => {
        it('Does not reload when subscriptor is present', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                globalContent: {
                    type: 'story',
                    content_elements: []
                },
                screenUtils: {
                    device: 'desktop'
                }
            };
            mount(<Component {...props} />);
            jest.advanceTimersByTime(40000);
            expect(window.location.reload).not.toBeCalled();
        });
    });

    describe('when subscritor is not present', () => {
        it('Does not reload when videos are present', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                globalContent: {
                    type: 'story',
                    content_elements: [
                        {
                            type: 'video'
                        }
                    ]
                },
                screenUtils: {
                    device: 'desktop'
                }
            };

            mount(<Component {...props} />);
            jest.advanceTimersByTime(40000);
            expect(window.location.reload).not.toBeCalled();
        });

        it('Does not reload when spotify audio is present', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                globalContent: {
                    type: 'story',
                    content_elements: [
                        {
                            subtype: 'spotify',
                            type: 'raw_html'
                        }
                    ]
                },
                screenUtils: {
                    device: 'desktop'
                }
            };

            mount(<Component {...props} />);
            jest.advanceTimersByTime(40000);
            expect(window.location.reload).not.toBeCalled();
        });

        it('Does not reload when any element of the content elements is type oembed_response', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                globalContent: {
                    type: 'story',
                    content_elements: [
                        {
                            subtype: 'instagram',
                            type: 'oembed_response'
                        }
                    ]
                },
                screenUtils: {
                    device: 'desktop'
                }
            };

            mount(<Component {...props} />);
            jest.advanceTimersByTime(40000);
            expect(window.location.reload).not.toBeCalled();
        });

        it('Does not reload on accelerated mobile pages', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                globalContent: {
                    type: 'story',
                    content_elements: []
                },
                outputType: 'amp',
                screenUtils: {
                    device: 'desktop'
                }
            };

            mount(<Component {...props} />);
            jest.advanceTimersByTime(40000);
            expect(window.location.reload).not.toBeCalled();
        });

        it('Reload when required conditions are met', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                globalContent: {
                    type: 'story',
                    content_elements: [{ type: 'text' }],
                    promo_items: {
                        basic: {}
                    }
                },
                screenUtils: {
                    device: 'desktop'
                }
            };

            mount(<Component {...props} />);
            jest.advanceTimersByTime(1000);
            expect(window.location.reload).not.toBeCalled();
            jest.advanceTimersByTime(30000);
            expect(window.location.reload).toHaveBeenCalledTimes(1);
        });
    });
});
