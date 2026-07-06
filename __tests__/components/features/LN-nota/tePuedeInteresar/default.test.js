import React from 'react';
import { render, screen } from '@testing-library/react';
import TePuedeInteresar from '../../../../../components/features/LN-nota/tePuedeInteresar/default';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import liftigniterResponse from '../../../../../__mocks__/data/tePuedeInteresar/liftigniterResponse.json';

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: arr => crypto.randomBytes(arr.length)
    }
});

jest.mock(
    'fusion:context',
    () => {
        const context = {
            useAppContext: jest.fn(() => ({
                globalContent: {},
                requestUri: ''
            }))
        };

        return {
            __esModule: true,
            default: context,
            get useAppContext() {
                return context.useAppContext;
            }
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:content',
    () => ({
        __esModule: true,
        useContent: jest.fn()
    }),
    { virtual: true }
);

jest.mock(
    'fusion:prop-types',
    () => {
        const propTypes = require('prop-types');
        const withTag = validator =>
            Object.assign(validator, {
                tag: jest.fn(() => validator)
            });

        return {
            __esModule: true,
            default: {
                ...propTypes,
                number: withTag(propTypes.number),
                shape: (...args) => withTag(propTypes.shape(...args))
            }
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:static',
    () => {
        const React = require('react');

        return function Static({ children, ...props }) {
            return React.createElement('static', props, children);
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:environment',
    () => ({
        __esModule: true,
        RESIZER_URL_PUBLIC: 'https://sandbox.lanacion.com.ar',
        SITE_LANACION: 'https://sandbox.lanacion.com.ar'
    }),
    { virtual: true }
);

jest.mock('fusion:properties', () => () => ({}), { virtual: true });

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn(() => true)
);

Context.useAppContext = jest.fn(() => ({
    globalContent: {},
    requestUri: ''
}));

const props = {
    customFields: {},
    outputType: 'default',
    siteProperties: {}
};

const getImageUrls = container =>
    Array.from(container.querySelectorAll('img, source'))
        .flatMap(element => [
            element.getAttribute('src'),
            element.getAttribute('srcset')
        ])
        .filter(Boolean)
        .join(' ');

const observe = jest.fn();
const unobserve = jest.fn();
const takeRecords = jest.fn(() => {});

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    takeRecords
}));

describe('Tests when the section may interest you is visible.', () => {
    Object.defineProperty(window, 'performance', {
        value: {
            getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigate' }]),
            measure: jest.fn()
        }
    });

    global.window.$p = jest.fn();

    let component;

    beforeEach(() => {
        const setIsReady = jest.fn().mockImplementation(x => x);
        React.useState = jest.fn().mockReturnValue([true, setIsReady]);
        useContent.mockImplementation(() => liftigniterResponse);
        component = render(<TePuedeInteresar {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        component = null;
    });

    it('Match Snapshot with the section visible', () => {
        const { container } = component;
        expect(container).toMatchSnapshot();
    });

    it('Should render all articles', () => {
        expect(component).toBeDefined();
        expect(screen.getAllByRole('article')).toHaveLength(2);
    });

    it('Should keep productive image URLs when rendering resizer image attributes', () => {
        const imageUrls = getImageUrls(component.container);

        expect(imageUrls).toContain('https://www.lanacion.com.ar/resizer');
        expect(imageUrls).not.toContain(
            'https://sandbox.lanacion.com.ar/resizer'
        );
    });

    it('Should keep productive v2 image URLs after the image renderer normalizes resizer URLs', () => {
        const articlesWithV2Images = liftigniterResponse.map(article => ({
            ...article,
            promo_items: {
                ...article.promo_items,
                basic: {
                    ...article.promo_items.basic,
                    url: 'https://sandbox.lanacion.com.ar/resizer/v2/productive-image.jpg?auth=123&width=768&quality=70&smart=false',
                    resized_urls: article.promo_items.basic.resized_urls.map(
                        resizedUrl => ({
                            ...resizedUrl,
                            resizedUrl:
                                'https://sandbox.lanacion.com.ar/resizer/v2/productive-image.jpg?auth=123&width=360&height=240&quality=70&smart=true'
                        })
                    )
                }
            }
        }));

        component.unmount();
        useContent.mockImplementation(() => articlesWithV2Images);
        component = render(<TePuedeInteresar {...props} />);

        const imageUrls = getImageUrls(component.container);

        expect(imageUrls).toContain(
            'https://www.lanacion.com.ar/resizer/v2/productive-image.jpg'
        );
        expect(imageUrls).not.toContain(
            'https://sandbox.lanacion.com.ar/resizer/v2/productive-image.jpg'
        );
    });

    it('It should contain the header "You may be interested" ', () => {
        expect(screen.getByText('Te puede interesar')).toBeDefined();
    });

    it('should call the tracking function of liftigniter. ', () => {
        expect(window.$p).toHaveBeenCalled();
    });
});

describe('Tests when the section may interest you is not visible.', () => {
    useContent.mockImplementation(() => undefined);
    const { container } = render(<TePuedeInteresar {...props} />);

    it('should return a empty div', () => {
        expect(container).toMatchInlineSnapshot(`<div />`);
    });
});
