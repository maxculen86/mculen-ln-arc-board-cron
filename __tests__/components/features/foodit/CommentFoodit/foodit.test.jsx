import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentFoodit from '../../../../../components/features/foodit/CommentFoodit/foodit';
import useTermica from '../../../../../components/private/common/hooks/useTermica';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    contextPath: '/pf',
    deployment: arg => arg
}));

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});
global.IntersectionObserver = jest.fn((callback, options) => {
    return {
        observe: jest.fn(() => {
            callback([{ isIntersecting: false }]);
        }),
        disconnect: jest.fn(),
        unobserve: jest.fn()
    };
});

describe('Components - features - CommentFoodit', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });

    it('should render CommentFoodit component', () => {
        useTermica.mockImplementation(() => true);

        const props = {
            outputType: 'foodit',
            customFields: {
                hideCaja: false
            },
            globalContent: {
                comments: {
                    display_comments: true
                },
                _id: 'ABCDEFG',
                type: 'story'
            }
        };

        const { container } = render(<CommentFoodit {...props} />);
        expect(container.querySelector('vf-tray')).not.toBeInTheDocument();
        expect(container.querySelector('vf-conversations')).toBeInTheDocument();
    });

    it('should hide CommentFoodit component', () => {
        useTermica.mockImplementation(() => true);

        const props = {
            outputType: 'foodit',
            customFields: {
                hideCaja: true
            },
            globalContent: {
                comments: {
                    display_comments: true
                },
                _id: 'ABCDEFG',
                type: 'story'
            }
        };

        const { container } = render(<CommentFoodit {...props} />);
        expect(container.querySelector('vf-tray')).not.toBeInTheDocument();
        expect(
            container.querySelector('vf-conversations')
        ).not.toBeInTheDocument();
    });
});
